import { findBookByNormalizedTitle } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ book: string }> }) {
    const pathParamBook = (await params).book;
    const book = findBookByNormalizedTitle(pathParamBook);
    return NextResponse.json(book);
}