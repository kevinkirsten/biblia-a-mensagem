import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { normalizeText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { AllBibleBooks } from "@/data/bible-books";

export default function SearchPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const closeSearchPalette = () => setOpen(false);

  const filteredBook =
    query === ""
      ? []
      : AllBibleBooks.filter((book) => {
          return book.normalizedTitle.includes(normalizeText(query));
        });

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={closeSearchPalette}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 mt-12 overflow-y-auto p-4 sm:mt-10 sm:p-6 md:mt-0 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all dark:divide-gray-600 dark:bg-gray-900 dark:ring-gray-600">
              <Combobox
                onChange={(bookName: string) => {
                  router.push(`/${bookName}`);
                  setOpen(false);
                }}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white sm:text-sm"
                    placeholder="Pesquisar livro..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredBook.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-gray-200"
                  >
                    {filteredBook.map((book) => (
                      <Combobox.Option
                        key={book.title}
                        value={book.normalizedTitle}
                        className={({ active }) =>
                          clsx("cursor-default select-none px-4 py-2", {
                            "bg-gray-200 dark:bg-gray-700": active,
                          })
                        }
                      >
                        {book.title}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredBook.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">
                    Nenhum livro encontrado.
                  </p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
