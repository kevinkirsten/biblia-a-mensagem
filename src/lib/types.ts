import { z } from "zod";

export interface BibleBook {
  title: string;
  normalizedTitle: string;
  chaptersCount: number;
}

export interface Chapter {
  number: string;
  verses: Verse[];
}

export interface Verse {
  title: string;
  number: string;
  content: string;
}

const EmailSchema = z.union([
  z.literal(""),
  z.string().email({
    message: "Por favor, insira um email válido.",
  }),
]);

const ImageFileSchema = z.union([
  z.instanceof(Blob).refine((file) => file.type.startsWith("image/"), {
    message: "Por favor, insira apenas arquivos de imagem.",
  }),
  z.literal(undefined),
]);

export const ReportFormSchema = z.object({
  email: EmailSchema,
  description: z.string().min(10, {
    message: "A descrição deve ter no mínimo 10 caracteres.",
  }),
  category: z.enum(
    ["Text Error", "Technical Issue", "Improvement Suggestion"],
    {
      errorMap: () => ({
        message: "Por favor, selecione um tipo de erro válido.",
      }),
    }
  ),
  book: z.string(),
  chapter: z.string(),
  verse: z.string(),
  screenshot: ImageFileSchema,
  url: z.string(),
});
