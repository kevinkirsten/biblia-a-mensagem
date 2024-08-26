import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AllBibleBooks } from "@/data/bible-books";
import { z } from "zod";
import { ReportFormSchema } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatChapterAmountText(chapterAmount: number) {
  return `${chapterAmount} capítulo${chapterAmount > 1 ? "s" : ""}`;
}

export function normalizeText(bookName: string) {
  /**
   * Normalizes a given book name by performing the following operations:
   * 1. Removes all spaces.
   * 2. Converts all characters to lowercase.
   * 3. Applies Unicode normalization (NFD).
   * 4. Removes all diacritic signs from each character.
   *
   * @param bookName - The original book name to normalize.
   * @returns The normalized string.
   */
  return bookName
    .replace(" ", "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function findBookByNormalizedTitle(normalizedTitle: string) {
  return AllBibleBooks.find((book) => book.normalizedTitle === normalizedTitle);
}

export async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

export function createSubmitFormData(data: z.infer<typeof ReportFormSchema>) {
  if (data.verse === "none") {
    data.verse = "";
  }

  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data];
    if (key !== "screenshot") {
      formData.append(key, value as string);
    }
  });

  if (data.screenshot) {
    formData.append("screenshot", data.screenshot);
  }

  return formData;
}
