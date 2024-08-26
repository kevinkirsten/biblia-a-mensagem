import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createSubmitFormData } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { BibleBook, ReportFormSchema, Verse } from "@/lib/types";
import { submitReportDialogData } from "@/actions/report-dialog.action";

const MAX_CHARACTERS = 300;

export function ReportForm({
  book,
  chapter,
  verses,
  closeDialog,
}: {
  book: BibleBook;
  chapter: number;
  verses: Verse[];
  closeDialog: () => void;
}) {
  const [charCount, setCharCount] = useState(0);
  const [fileHover, setFileHover] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const currentUrl = window.location.href;

  const form = useForm<z.infer<typeof ReportFormSchema>>({
    resolver: zodResolver(ReportFormSchema),
    defaultValues: {
      book: book.title,
      chapter: chapter.toString(),
      verse: "",
      email: "",
      description: "",
      category: undefined,
      screenshot: undefined,
      url: currentUrl,
    },
  });

  async function onSubmit(data: z.infer<typeof ReportFormSchema>) {
    setIsUploading(true);
    try {
      const formData = createSubmitFormData(data);
      await submitReportDialogData(formData);

      toast({
        title: "Enviado com Sucesso",
        variant: "success",
        description:
          "Agradecemos sua contribuição para aprimorar nossa plataforma!",
      });

      closeDialog();
    } catch (error) {
      toast({
        title: "Falha no Envio",
        variant: "destructive",
        description:
          "Não conseguimos processar sua solicitação agora. Por favor, tente enviar novamente em alguns instantes.",
      });
    } finally {
      setIsUploading(false);
    }
  }

  const handleDragEnter = (event: any) => {
    if (
      event.dataTransfer.items &&
      event.dataTransfer.items[0].kind === "file"
    ) {
      setFileHover(true);
    }
  };

  const handleDragLeave = () => {
    setFileHover(false);
  };

  const handleDrop = () => {
    setFileHover(false);
  };

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length < 0) return;

    const file = files[0];
    if (!file) return;

    setIsCompressingImage(true);

    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 2000,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const displayUrl = URL.createObjectURL(compressedFile);
      setImagePreview(displayUrl);
      form.setValue("screenshot", compressedFile, { shouldValidate: true });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao comprimir a imagem. Por favor, tente novamente.",
      });
    } finally {
      setIsCompressingImage(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
        id="report-form"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo de erro" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Text Error">Erro no Texto</SelectItem>
                  <SelectItem value="Technical Issue">
                    Problema Técnico
                  </SelectItem>
                  <SelectItem value="Improvement Suggestion">
                    Sugestão de Melhoria
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Selecione o tipo de erro que você está reportando.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-1 space-y-3">
          <div className="flex space-x-2">
            <p className="text-sm font-medium leading-none">
              Livro: <Badge variant="secondary">{book.title}</Badge>
            </p>
            <p className="text-sm font-medium leading-none">
              Capítulo: <Badge variant="secondary">{chapter}</Badge>
            </p>
          </div>
          <FormField
            control={form.control}
            name="verse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Versículo (opcional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um versículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {verses.map((verse) => (
                      <SelectItem key={verse.number} value={verse.number}>
                        {verse.number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Se você deseja reportar um erro em um versículo específico.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormDescription>
                Se você deseja ser contatado sobre o erro que reportou.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o erro encontrado"
                  className="min-h-40 resize-none"
                  maxLength={MAX_CHARACTERS}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setCharCount(e.target.value.length);
                  }}
                />
              </FormControl>
              <div className="text-right text-sm text-muted-foreground">
                {charCount}/{MAX_CHARACTERS}
              </div>
              <FormDescription>
                Descreva o erro encontrado com o máximo de detalhes possível.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="screenshot"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel>Captura de Tela (opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...rest}
                    onChange={handleFileChange}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={clsx("border-2 border-dashed", {
                      "border-primary bg-primary/10": fileHover,
                    })}
                  />
                </FormControl>
                <FormDescription>
                  Se você deseja incluir uma captura de tela do erro.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        {isCompressingImage ? (
          <div className="flex w-full justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          imagePreview && (
            <Avatar className="h-auto w-full">
              <AvatarImage src={imagePreview} alt="Preview" />
            </Avatar>
          )
        )}

        <DialogFooter>
          <Button
            type="submit"
            form="report-form"
            className="relative overflow-hidden"
          >
            {isUploading && (
              <span className="absolute inset-0 flex items-center justify-center bg-primary">
                <LoadingSpinner />
              </span>
            )}
            <span className={isUploading ? "invisible" : ""}>Enviar</span>
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
