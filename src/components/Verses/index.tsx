"use client";

import { ArrowUpToLine, Copy, Check } from "lucide-react";
import { BibleBook, Verse } from "@/lib/types";
import { copyTextToClipboard } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useState } from "react";

export default function Verses({
  book,
  chapter,
  verses,
}: {
  book: BibleBook;
  chapter: number;
  verses: Verse[];
}) {
  const [copiedVerse, setCopiedVerse] = useState("");
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

  function handleCopyTextToClipboard(
    verseContent: string,
    bookTitle: string,
    chapterNumber: number,
    verseNumber: string,
  ) {
    copyTextToClipboard(
      `${verseContent} ${bookTitle} ${chapterNumber}:${verseNumber} (MSG)`,
    );
    setCopiedVerse(verseNumber);

    setTimeout(() => {
      setCopiedVerse("");
    }, 3000);
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

              {copiedVerse === verse.number ? (
                <Check className="float-right my-1 inline-block h-5 w-5 cursor-pointer text-emerald-600" />
              ) : (
                <Copy
                  onClick={() =>
                    handleCopyTextToClipboard(
                      verse.content,
                      book.title,
                      chapter,
                      verse.number,
                    )
                  }
                  className="float-right my-1 inline-block h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400"
                />
              )}
            </p>
          </section>
        ))}
      </article>
      <nav
        className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-start sm:items-center justify-between rounded-b-lg border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 sm:px-6"
        aria-label="Pagination"
      >
        <div className="sm:block">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Capítulo <span className="font-medium">{chapter}</span> de{" "}
            <span className="font-medium">{book?.chaptersCount}</span>
          </p>
        </div>
        <div className="flex w-full flex-1 justify-between gap-2 sm:justify-end">
          <Button
            variant="outline"
            title="Voltar para o topo"
            onClick={scrollToTop}
          >
            <ArrowUpToLine className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" disabled={!previousBookExists}>
              <Link href={previousBookUrl}>Anterior</Link>
            </Button>
            <Button variant="outline" disabled={!nextBookExists}>
              <Link href={nextBookUrl}>Próximo</Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
