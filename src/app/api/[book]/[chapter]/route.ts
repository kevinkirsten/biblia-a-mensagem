import { BibleBooks } from "@/data/bible-books";
import { BibleBook, Verse } from "@/lib/types";
import { findBookByNormalizedTitle } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as fs from "fs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ book: string, chapter: string }> }) {
    const pathParamBook = (await params).book;
    const pathParamChapter = (await params).chapter;
    const bookParam = findBookByNormalizedTitle(pathParamBook);

    const isOldTestament = BibleBooks.oldTestament.some(
        (book: BibleBook) => book.normalizedTitle === bookParam?.normalizedTitle
    );
    const isNewTestament = BibleBooks.newTestament.some(
        (book: BibleBook) => book.normalizedTitle === bookParam?.normalizedTitle
    );

    if (!isOldTestament && !isNewTestament) {
        return null;
    }

    const testament = isOldTestament ? "old-testament" : "new-testament";

    const filePath = path.join(
        process.cwd(),
        `src/data/${testament}/${bookParam?.normalizedTitle}/${pathParamChapter}.json`
    );

    const bookData: Verse[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return NextResponse.json(bookData);
}