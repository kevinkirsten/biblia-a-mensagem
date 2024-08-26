import { Verse } from "@/lib/types";
import { Check, Copy } from "lucide-react";

export default function VerseContent({
  verse,
  onCopy,
  isCopied,
}: {
  verse: Verse;
  onCopy: () => void;
  isCopied: boolean;
}) {
  function renderContentWithLineBreaks(content: string) {
    return content.split("\n").map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  }

  return (
    <section key={verse.number}>
      {verse.title !== "" && (
        <h4
          className="mb-4 scroll-my-20 text-center text-base font-semibold uppercase"
          id={verse.title}
        >
          {verse.title}
        </h4>
      )}
      <p
        className="justify-inter-word scroll-my-20 text-justify text-sm text-primary dark:text-gray-200 sm:text-base"
        id={verse.number}
      >
        <sup className="mr-2 text-sm font-bold dark:text-gray-400">
          {verse.number}
        </sup>
        {renderContentWithLineBreaks(verse.content)}
        {isCopied ? (
          <Check className="float-right my-1 inline-block h-5 w-5 cursor-pointer text-emerald-600" />
        ) : (
          <Copy
            onClick={onCopy}
            className="float-right my-1 inline-block h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400"
          />
        )}
      </p>
    </section>
  );
}
