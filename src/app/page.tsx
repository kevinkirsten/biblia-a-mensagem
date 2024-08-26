import { formatChapterAmountText } from "@/lib/utils";
import clsx from "clsx";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { BibleBook } from "@/lib/types";
import { BibleBooks } from "@/data/bible-books";

export const metadata = {
  description:
    "Leia e navegue pela Bíblia A Mensagem online. Explore ensinamentos e mensagens divinas que orientam e inspiram.",
};

function BibleBooksList({ books }: { books: BibleBook[] }) {
  return (
    <ul className="w-full">
      {books.map((book, bookIdx) => (
        <li
          key={book.title}
          className={clsx(
            "group relative border-x border-t bg-white px-4 py-2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:ring-primary dark:hover:bg-gray-700",
            { "rounded-t-lg": bookIdx === 0 },
            {
              "rounded-b-lg border-b": bookIdx === books.length - 1,
            }
          )}
        >
          <div className="mt-1">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              <Link href={`/${book.normalizedTitle}`}>
                <span className="absolute inset-0" aria-hidden="true" />
                {book.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:group-hover:text-gray-400">
              {formatChapterAmountText(book.chaptersCount)}
            </p>
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
  );
}

export default function Inicio() {
  return (
    <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-center text-xl font-bold sm:text-2xl">
          Antigo Testamento
        </h3>
        <BibleBooksList books={BibleBooks.oldTestament} />
      </div>
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-center text-xl font-bold sm:text-2xl">
          Novo Testamento
        </h3>
        <BibleBooksList books={BibleBooks.newTestament} />
      </div>
    </div>
  );
}
