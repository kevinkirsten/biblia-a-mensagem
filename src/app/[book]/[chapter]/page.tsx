import path from "path";
import * as fs from "fs";
import Link from "next/link";
import Verses from "@/components/Verses";
import { BibleBook, Verse } from "@/lib/types";
import { findBookByNormalizedTitle } from "@/lib/utils";
import { AllBibleBooks, BibleBooks } from "@/data/bible-books";

export async function generateMetadata({ params }: { params: VerseParams }) {
  const book = findBookByNormalizedTitle(params.book);
  const bookShortTitle = `${book?.title} ${params.chapter}`;
  return {
    title: `${bookShortTitle} - A Mensagem (MSG)`,
    description: `Leia ${bookShortTitle} na tradução A Mensagem (MSG) na Bíblia A Mensagem Online. Descubra ensinamentos e inspirações neste capítulo específico.`,
    keywords: `${bookShortTitle}, ${bookShortTitle} a mensagem, ${bookShortTitle} msg, ${bookShortTitle} tradução a mensagem, ${bookShortTitle} MSG, ${bookShortTitle} bíblia a mensagem, ${bookShortTitle} bíblia msg, ${bookShortTitle} bíblia tradução a mensagem`,
  };
}

async function getVerses(bookName: string, chapter: number) {
  const isOldTestament = BibleBooks.oldTestament.some(
    (book: BibleBook) => book.normalizedTitle === bookName
  );
  const isNewTestament = BibleBooks.newTestament.some(
    (book: BibleBook) => book.normalizedTitle === bookName
  );

  if (!isOldTestament && !isNewTestament) {
    return null;
  }

  const testament = isOldTestament ? "old-testament" : "new-testament";

  const filePath = path.join(
    process.cwd(),
    `src/data/${testament}/${bookName}/${chapter}.json`
  );

  const bookData: Verse[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return bookData;
}

export interface VerseParams {
  book: string;
  chapter: string;
}

export function generateStaticParams() {
  const allParams: VerseParams[] = [];

  for (const book of AllBibleBooks) {
    for (let i = 1; i <= book.chaptersCount; i++) {
      allParams.push({
        book: book.normalizedTitle,
        chapter: i.toString(),
      });
    }
  }

  return allParams;
}

export default async function Page({ params }: { params: VerseParams }) {
  const book = findBookByNormalizedTitle(params.book);

  if (!book) return null;

  const verses = await getVerses(book.normalizedTitle, Number(params.chapter));

  if (!verses) return null;

  return (
    <div>
      <h1 className="flex items-center justify-center gap-4 text-center text-xl font-bold tracking-tight dark:text-white sm:text-2xl">
        <span>
          <Link href={`/${book.normalizedTitle}`}>{book.title}</Link>
        </span>

        <div className="h-max w-px bg-gray-500">&nbsp;</div>
        <span className="sm:text-md text-center text-base font-medium tracking-tight dark:text-white">
          Capítulo {params.chapter}
        </span>
      </h1>
      <br />
      <Verses book={book} chapter={Number(params.chapter)} verses={verses} />
    </div>
  );
}

export const dynamicParams = false;
