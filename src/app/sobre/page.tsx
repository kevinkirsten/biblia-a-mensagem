import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Saiba mais sobre o projeto Bíblia A Mensagem online. Descubra a história e a missão por trás da nossa dedicação em tornar a palavra de Deus acessível a todos.",
};

export default function Sobre() {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold tracking-tight dark:text-white sm:text-2xl">
        Sobre [Em Construção]
      </h1>
      <br />
      <p>
        Estamos trabalhando para fornecer mais informações sobre o projeto
        Bíblia A Mensagem online. Volte em breve para aprender mais sobre o
        início do projeto, nossa visão e missão.
      </p>
    </div>
  );
}
