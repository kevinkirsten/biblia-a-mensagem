import { AllBibleBooks } from "@/data/bible-books";
import { BibleBook } from "@/lib/types";
import Link from "next/link";
import { findBookByNormalizedTitle } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import clsx from "clsx";

export async function generateMetadata({
  params,
}: {
  params: { book: string };
}) {
  const book = findBookByNormalizedTitle(params.book);

  return {
    title: book?.title,
    description: `Leia o livro de ${book?.title} na Bíblia A Mensagem online. Navegue pelos capítulos para encontrar orientação, sabedoria e inspiração na palavra de Deus.`,
  };
}

export async function generateStaticParams() {
  return AllBibleBooks.map((book: BibleBook) => ({
    book: book.normalizedTitle,
  }));
}

export default function Page({ params }: { params: { book: string } }) {
  const book = findBookByNormalizedTitle(params.book);

  if (!book) return null;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold leading-none tracking-tight sm:text-2xl">
        {book.title}
      </h1>
      <br />

      <ul className={clsx("flex w-full flex-wrap justify-center gap-2")}>
        {[...Array(book?.chaptersCount)].map((_, idx) => (
          <li
            key={`${book?.title}-${idx}`}
            className={clsx(
              "group relative w-24 rounded-lg border bg-white px-4 py-2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:ring-primary dark:hover:bg-gray-700"
            )}
          >
            <div className="mt-1">
              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                <Link
                  href={`${book?.normalizedTitle}/${idx + 1}`}
                  className="focus:outline-none"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  {idx + 1}
                </Link>
              </h3>
            </div>
            <span
              className="pointer-events-none absolute right-1 top-2"
              aria-hidden="true"
            >
              <ArrowUpRightIcon className="h-7 w-7 text-gray-300 group-hover:text-gray-400 dark:text-gray-500 dark:group-hover:text-gray-300" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const dynamicParams = false;
