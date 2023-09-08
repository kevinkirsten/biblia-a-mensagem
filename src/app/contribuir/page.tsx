import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribuir",
  description:
    "Apoie o projeto Bíblia A Mensagem online. Compre a versão física para aprofundar seu estudo, ou contribua com doações para ajudar a manter este recurso acessível a todos.",
};

export default function Contribuir() {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold tracking-tight dark:text-white sm:text-2xl">
        Contribuir [Em Construção]
      </h1>
      <br />
      <p>
        Estamos atualizando esta página com diversas maneiras pelas quais você
        pode contribuir para o projeto Bíblia A Mensagem online. Em breve você
        poderá comprar a versão física da Bíblia A Mensagem, ou contribuir com
        doações para ajudar a manter este recurso acessível a todos.
      </p>
    </div>
  );
}
