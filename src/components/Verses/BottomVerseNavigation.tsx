import { BibleBook, Verse } from "@/lib/types";
import { ArrowUpToLine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReportDialog } from "@/components/ReportDialog";

export default function BottomVerseNavigation({
  book,
  verses,
  chapter,
  previousBookExists,
  nextBookExists,
}: {
  book: BibleBook;
  verses: Verse[];
  chapter: number;
  previousBookExists: boolean;
  nextBookExists: boolean;
}) {
  const previousBookUrl = previousBookExists
    ? `/${book.normalizedTitle}/${chapter - 1}`
    : "#";
  const nextBookUrl = nextBookExists
    ? `/${book.normalizedTitle}/${chapter + 1}`
    : "#";

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <nav
      className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0"
      aria-label="Pagination"
    >
      <div className="sm:block">
        <p className="text-sm text-gray-700 dark:text-gray-400">
          Capítulo <span className="font-medium">{chapter}</span> de{" "}
          <span className="font-medium">{book?.chaptersCount}</span>
        </p>
      </div>
      <div className="flex w-full flex-1 flex-col justify-between gap-2 sm:flex-row sm:justify-end">
        <div className="flex w-full flex-1 sm:justify-end">
          <ReportDialog book={book} chapter={chapter} verses={verses} />
        </div>
        <div className="flex justify-between gap-2">
          <div>
            <Button
              variant="outline"
              title="Voltar para o topo"
              onClick={scrollToTop}
            >
              <ArrowUpToLine className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={!previousBookExists}>
              <Link href={previousBookUrl}>Anterior</Link>
            </Button>
            <Button variant="outline" disabled={!nextBookExists}>
              <Link href={nextBookUrl}>Próximo</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
