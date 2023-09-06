"use client";

import { ArrowUpToLine, Copy } from "lucide-react";
import { BibleBook, Verse } from "@/lib/types";
import { copyTextToClipboard } from "@/lib/utils";
import Link from "next/link";
import clsx from "clsx";

export default function Verses({
  book,
  chapter,
  verses,
}: {
  book: BibleBook;
  chapter: number;
  verses: Verse[];
}) {
  const previousBookExists = Number(chapter) > 1;
  const nextBookExists = Number(chapter) < book.chaptersCount;

  const previousBookUrl = previousBookExists
    ? `/${book.normalizedTitle}/${Number(chapter) - 1}`
    : "#";

  const nextBookUrl = nextBookExists
    ? `/${book.normalizedTitle}/${Number(chapter) + 1}`
    : "#";

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <article className="flex flex-col gap-4 divide-white rounded-t-lg bg-white px-4 py-7 dark:bg-gray-900 sm:px-7">
        {verses?.map((verse) => (
          <section key={`${verse.number}`}>
            {verse.title !== "" && (
              <h4
                className="mb-4 scroll-my-20 text-center text-base font-semibold uppercase"
                id={verse.title}
              >
                {verse.title}
              </h4>
            )}
            <p
              className="justify-inter-word scroll-my-20 text-justify text-sm dark:text-gray-200 sm:text-base"
              id={verse.number}
            >
              <sup className="mr-2 text-sm font-bold dark:text-gray-400">
                {verse.number}
              </sup>
              {verse.content}
              <Copy
                onClick={() =>
                  copyTextToClipboard(
                    `${verse.content} ${book.title} ${chapter}:${verse.number} (MSG)`
                  )
                }
                className="float-right my-1 inline-block h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400"
              />
            </p>
          </section>
        ))}
      </article>
      <nav
        className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Capítulo <span className="font-medium">{chapter}</span> de{" "}
            <span className="font-medium">{book?.chaptersCount}</span>
          </p>
        </div>
        <div className="flex flex-1 justify-between gap-2 sm:justify-end">
          <span title="Voltar para o topo" onClick={scrollToTop}>
            <ArrowUpToLine className="h-9 w-9 cursor-pointer rounded-md bg-gray-100 p-2 text-gray-900 ring-1 ring-gray-200 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-500 dark:focus-visible:outline-indigo-500" />
          </span>
          <Link
            href={previousBookUrl}
            scroll={previousBookExists}
            className={clsx(
              "relative inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-gray-200 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-500 dark:focus-visible:outline-indigo-500",
              { "cursor-not-allowed": !previousBookExists }
            )}
          >
            Anterior
          </Link>
          <Link
            href={nextBookUrl}
            scroll={nextBookExists}
            className={clsx(
              "relative inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-gray-200 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-500 dark:focus-visible:outline-indigo-500",
              { "cursor-not-allowed": !nextBookExists }
            )}
          >
            Próximo2
          </Link>
        </div>
      </nav>
    </>
  );
}
