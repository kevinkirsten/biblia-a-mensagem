"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import Sidebar from "@/components/Header/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatePing from "@/components/animate-ping";
import SearchPalette from "@/components/SearchPalette";
import { useNavigationContext } from "@/contexts/NavigationContext";

export default function Header() {
  const [searchPaletteOpen, setSearchPaletteOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { navigation } = useNavigationContext();
  const [cookies, _setCookie] = useCookies([
    "visited_about_page",
    "visited_contribute_page",
  ]);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const openSearchPalette = () => setSearchPaletteOpen(true);

  const showPingInAboutPage = (title: string) =>
    title === "Contribuir" && !cookies.visited_contribute_page;
  const showPingInContributePage = (title: string) =>
    title === "Sobre" && !cookies.visited_about_page;
  const showPingInHambugerMenu =
    !cookies.visited_contribute_page || !cookies.visited_about_page;

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full border-b bg-white transition-all dark:border-gray-800 dark:bg-gray-900",
        { "shadow-md": scrolled }
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:gap-x-12 lg:px-8"
        aria-label="Global"
      >
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary"
        >
          <img
            className="h-8 w-auto"
            src="/images/bible.svg"
            alt="Bíblia A Mensagem"
          />
          <h2 className="items-center text-center font-semibold text-gray-900 dark:text-white md:flex md:text-base">
            Bíblia A Mensagem
          </h2>
        </Link>
        <div className="flex gap-4 lg:hidden">
          <button
            type="button"
            className="group/search -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary"
            onClick={openSearchPalette}
          >
            <span className="sr-only">Abrir paleta de busca</span>
            <Search
              className="h-6 w-6 text-gray-500 group-hover/search:text-gray-900 dark:group-hover/search:text-gray-300"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="group/menu -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary"
            onClick={openSidebar}
          >
            <span className="sr-only">Abrir menu principal</span>
            <Menu
              className="h-6 w-6 text-gray-500 group-hover/menu:text-gray-900 dark:group-hover/menu:text-gray-300"
              aria-hidden="true"
            />
            {showPingInHambugerMenu && <AnimatePing />}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-10">
          <button
            onClick={openSearchPalette}
            className="relative flex items-center gap-1 rounded-md p-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-white dark:hover:bg-gray-700 dark:focus-visible:outline-primary"
          >
            <Search className="h-5 w-5" />
          </button>
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="relative flex items-center gap-1 rounded-md p-2 text-sm leading-6 text-gray-900 transition-all hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-white dark:hover:bg-gray-700 dark:focus-visible:outline-primary"
            >
              <item.icon className="h-5 w-5" />
              <span className="relative font-medium">{item.title}</span>
              {showPingInAboutPage(item.title) && <AnimatePing />}
              {showPingInContributePage(item.title) && <AnimatePing />}
              {item.current && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-x-0 bottom-0 h-px rounded-md bg-gradient-to-r from-white via-gray-900 to-white dark:from-gray-900 dark:via-white dark:to-gray-900"
                ></motion.div>
              )}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
      <Sidebar closeSidebar={closeSidebar} sidebarOpen={sidebarOpen} />
      <SearchPalette open={searchPaletteOpen} setOpen={setSearchPaletteOpen} />
    </header>
  );
}
