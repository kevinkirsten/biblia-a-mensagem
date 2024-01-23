import {BibleBook} from "@/lib/types";
import {Button} from "@/components/Button";
import {ArrowUpToLine} from "lucide-react";
import Link from "next/link";

export default function BottomVerseNavigation({book, chapter, previousBookExists, nextBookExists}: {
  book: BibleBook;
  chapter: number;
  previousBookExists: boolean;
  nextBookExists: boolean
}) {
  const previousBookUrl = previousBookExists ? `/${book.normalizedTitle}/${chapter - 1}` : "#";
  const nextBookUrl = nextBookExists ? `/${book.normalizedTitle}/${chapter + 1}` : "#";

  function scrollToTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  return (
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
          <ArrowUpToLine className="h-5 w-5"/>
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
  );
};