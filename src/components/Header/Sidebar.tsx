import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import AnimatePing from "@/components/animate-ping";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useCookies } from "react-cookie";

export default function Sidebar({
  sidebarOpen,
  closeSidebar,
}: {
  sidebarOpen: boolean;
  closeSidebar: () => void;
}) {
  const { navigation } = useNavigationContext();

  const [cookies, setCookie] = useCookies([
    "visited_about_page",
    "visited_contribute_page",
  ]);

  const showPingInAboutPage = (title: string) =>
    title === "Contribuir" && !cookies.visited_contribute_page;
  const showPingInContributePage = (title: string) =>
    title === "Sobre" && !cookies.visited_about_page;

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={closeSidebar}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/90" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="flex w-full max-w-xs flex-1">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto border-l bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <nav className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex flex-shrink-0 items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary"
                    >
                      <img
                        className="h-8 w-auto"
                        src="/images/bible.svg"
                        alt="Bíblia A Mensagem"
                      />
                      <h2 className="items-center text-center text-sm font-semibold text-gray-900 dark:text-white md:flex md:text-base">
                        Bíblia A Mensagem
                      </h2>
                    </Link>
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 text-gray-700"
                      onClick={closeSidebar}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className={clsx(
                              "-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-white dark:hover:bg-gray-800 dark:focus-visible:outline-primary",
                              { "bg-gray-100 dark:bg-gray-800": item.current }
                            )}
                            onClick={closeSidebar}
                          >
                            <item.icon className="h-5 w-5" />
                            {item.title}
                            {showPingInAboutPage(item.title) && <AnimatePing />}
                            {showPingInContributePage(item.title) && (
                              <AnimatePing />
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className="py-6">
                        <div className="-mx-3 my-auto block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800">
                          <ThemeToggle description />
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
