import { clsx } from "clsx";
import Link from "next/link";
import { Metadata } from "next";
import SetCookie from "@/components/set-cookie";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Saiba mais sobre o projeto Bíblia A Mensagem online. Descubra a história e a missão por trás da nossa dedicação em tornar a palavra de Deus acessível a todos.",
};

export default async function Sobre() {
  return (
    <Card className="mx-auto w-full max-w-4xl">
      <SetCookie name="visited_about_page" value="true" />
      <CardHeader>
        <h1 className="text-center text-2xl font-bold leading-none tracking-tight sm:text-2xl">
          Sobre o Projeto
        </h1>
      </CardHeader>
      <CardContent className="space-y-8 text-justify">
        <section>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">
            Início e Inspiração
          </h2>
          <p>
            O projeto Bíblia A Mensagem Online nasceu durante a pandemia, com a
            visão de tornar a tradução contemporânea da Bíblia, “A Mensagem”,
            acessível digitalmente. Originado da necessidade da comunidade da
            igreja local do autor, onde as fontes desta tradução eram limitadas
            a formatos físicos e alguns aplicativos menos práticos, o projeto
            visava facilitar o acesso durante as pregações e estudos bíblicos.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">
            Desenvolvimento Técnico
          </h2>
          <p>
            Iniciado no começo de 2021, o projeto utilizou Python para
            transformar um PDF extenso em um formato mais gerenciável, JSON,
            facilitando o acesso e a distribuição dos textos. A escolha do
            framework Next.js possibilitou uma abordagem fullstack,
            simplificando o desenvolvimento e hospedagem do site. Esta fase
            inicial foi marcada por um profundo aprendizado em padrões de
            expressões regulares e tratamento de dados.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">
            Crescimento e Impacto
          </h2>
          <p>
            Desde o primeiro commit em março de 2021, o projeto cresceu
            exponencialmente. A transição para um novo domínio em setembro de
            2024 e a reconstrução do site refletem esse crescimento e a
            necessidade de uma plataforma mais robusta. Este crescimento foi
            evidenciado pelos expressivos números de acessos, que demandaram uma
            refatoração completa para melhor atender aos usuários.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">
            Compromisso com a Acessibilidade e Ética
          </h2>
          <p>
            A aderência estrita às diretrizes de uso estipuladas pela Editora
            Vida foi uma preocupação constante, garantindo que o projeto
            permanecesse dentro dos limites legais de citação sem exceder os
            limites de versículos por publicação. Esta cautela jurídica foi
            crucial para manter o projeto alinhado com os direitos autorais e
            éticos, proporcionando uma plataforma livre de anúncios e focada
            unicamente na disseminação do texto bíblico. Você pode conhecer mais
            sobre o trabalho da{" "}
            <Link
              className={clsx(buttonVariants({ variant: "link" }), "px-0")}
              href={`${process.env.EDITORA_VIDA_URL}`}
              target="_blank"
            >
              Editora Vida
            </Link>
            , responsável pela publicação da tradução da Bíblia A Mensagem em
            português.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">Conquistas</h2>
          <p>
            A aceitação e o reconhecimento do projeto podem ser quantificados
            pelo impacto significativo na Pesquisa Google, com crescimento
            contínuo do engajamento desde 2023. Este sucesso é um testemunho do
            valor que Bíblia A Mensagem Online oferece aos seus usuários,
            proporcionando um recurso valioso para estudo, reflexão e inspiração
            espiritual.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">
            Olhando para o Futuro
          </h2>
          <p>
            À medida que o projeto avança, os planos incluem a implementação de
            novas funcionalidades, aprimorando a interatividade do site e
            expandindo ainda mais seu alcance. A continuidade deste trabalho
            depende crucialmente do apoio da comunidade, seja através de
            contribuições diretas ou do apoio indireto por meio de compras
            afiliadas.
          </p>
        </section>
        <Separator />
        <section>
          <p>
            Este relato encapsula não apenas a jornada técnica e espiritual do
            projeto, mas também a paixão e dedicação em tornar as escrituras
            acessíveis a todos, mantendo um ambiente digital puro e
            enriquecedor. Através de “Bíblia A Mensagem Online”, os versículos
            sagrados são mais do que textos; são fontes de luz e sabedoria
            eternas para todos que buscam compreensão e conforto nas palavras de
            Deus.
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
