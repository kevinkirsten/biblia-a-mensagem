"use client";

import { BibleBook, Verse } from "@/lib/types";
import { copyTextToClipboard } from "@/lib/utils";
import { useEffect, useState } from "react";
import BottomVerseNavigation from "@/components/Verses/BottomVerseNavigation";
import VerseContent from "@/components/Verses/VerseContent";

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
  const previousBookExists = chapter > 1;
  const nextBookExists = chapter < book.chaptersCount;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copiedVerse) {
      timeout = setTimeout(() => setCopiedVerse(""), 3000);
    }
    return () => clearTimeout(timeout);
  }, [copiedVerse]);

  async function handleCopyTextToClipboard(verse: Verse) {
    const verseContent = `${verse.content} ${book.title} ${chapter}:${verse.number} (MSG)`;
    await copyTextToClipboard(verseContent);
    setCopiedVerse(verse.number);
  }

  return (
    <>
      <article className="flex flex-col gap-4 divide-white rounded-t-lg bg-white px-4 py-7 dark:bg-gray-900 sm:px-7">
        {verses.map((verse) => (
          <VerseContent
            key={verse.number}
            verse={verse}
            onCopy={() => handleCopyTextToClipboard(verse)}
            isCopied={copiedVerse === verse.number}
          />
        ))}
      </article>
      <BottomVerseNavigation
        book={book}
        chapter={chapter}
        nextBookExists={nextBookExists}
        previousBookExists={previousBookExists}
      />
    </>
  );
}
