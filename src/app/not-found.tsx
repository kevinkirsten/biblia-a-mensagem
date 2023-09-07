import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="grid place-items-center rounded-xl bg-white px-6 py-12 dark:bg-gray-900 sm:py-16 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-gray-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          Perdão, não conseguimos encontrar a página que você está procurando.
        </p>
        <figure className="mt-10 border-l border-gray-600 pl-6 dark:border-gray-400">
          <blockquote className="text-justify font-normal text-gray-900 dark:text-gray-400">
            <p>
              “Imaginem que um de vocês tenha cem ovelhas e perca uma delas.
              Será que não vai deixar as noventa e nove no pasto para ir atrás
              da que se perdeu? E, quando a encontrar, ficará feliz da vida e a
              levará nos ombros de volta para casa. Vai até chamar os amigos e
              vizinhos e dizer: ‘Vamos comemorar! Encontrei a ovelha que eu
              havia perdido!’. Acreditem, há mais alegria no céu pela vida
              resgatada de um pecador que por noventa e nove pessoas que acham
              que não precisam de salvação.”
            </p>
          </blockquote>
          <figcaption className="mt-6 flex gap-x-4">
            <strong className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400">
              Lucas 15:4-7
            </strong>
          </figcaption>
        </figure>
        <div className="mt-10 flex flex-col items-start gap-2">
          <Button variant="outline" asChild>
            <Link href="/">Voltar para o início</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

// focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500
