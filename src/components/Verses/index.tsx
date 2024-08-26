"use client";

import { BibleBook, Verse } from "@/lib/types";
import { sendGAEvent } from "@next/third-parties/google";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { copyTextToClipboard } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import VerseContent from "@/components/Verses/VerseContent";
import BottomVerseNavigation from "@/components/Verses/BottomVerseNavigation";

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
    sendGAEvent({
      action: "copy",
      category: "verse",
      label: `${book.title} ${chapter}:${verse.number}`,
    });
    toast({
      title: "Versículo copiado",
      description: `O versículo ${book.title} ${chapter}:${verse.number} foi copiado para a área de transferência.`,
    });
  }

  return (
    <Card className="mx-auto flex w-full max-w-4xl flex-col gap-4 divide-white px-7 py-7">
      {verses.map((verse) => (
        <VerseContent
          key={verse.number}
          verse={verse}
          onCopy={() => handleCopyTextToClipboard(verse)}
          isCopied={copiedVerse === verse.number}
        />
      ))}
      <Separator />
      <BottomVerseNavigation
        book={book}
        verses={verses}
        chapter={chapter}
        nextBookExists={nextBookExists}
        previousBookExists={previousBookExists}
      />
    </Card>
  );
}
