import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { BibleBook, Verse } from "@/lib/types";
import { ReportForm } from "@/components/ReportDialog/report-form";

export function ReportDialog({
  book,
  chapter,
  verses,
}: {
  book: BibleBook;
  chapter: number;
  verses: Verse[];
}) {
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-fit">
          <TriangleAlert className="mr-2 h-5 w-5" />
          Informar Problema
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-auto scroll-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informar Problema</DialogTitle>
          <DialogDescription>
            Sua contribuição é essencial para melhorar a experiência de leitura.
            Use o formulário abaixo para reportar erros ou sugerir melhorias.
          </DialogDescription>
        </DialogHeader>
        <ReportForm
          book={book}
          chapter={chapter}
          verses={verses}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
