import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from "@/components/core/carousel";
import Link from "next/link";
import { Metadata } from "next";
import SetCookie from "@/components/set-cookie";
import { Button } from "@/components/ui/button";
import { CreditCard, ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Contribuir",
  description:
    "Apoie o projeto Bíblia A Mensagem online. Compre a versão física para aprofundar seu estudo, ou contribua com doações para ajudar a manter este recurso acessível a todos.",
};

const affiliateProducts = [
  {
    title: "Bíblia de Estudo A Mensagem - Capa Luxo - Grafite e Bege",
    imageUrl: "/amazon-products/biblia-grafite-bege.png",
    url: "https://amzn.to/4fZAiqr",
  },
  {
    title: "Bíblia de Estudo - A Mensagem - Capa Luxo - Cinza e Vermelho",
    imageUrl: "/amazon-products/biblia-cinza-vermelho.png",
    url: "https://amzn.to/4egrew3",
  },
  {
    title: "Biblia de Estudo a Mensagem - Capa Luxo Azul e Bege com Índice",
    imageUrl: "/amazon-products/biblia-azul-bege.png",
    url: "https://amzn.to/3T2Q9uG",
  },
  {
    title: "Bíblia a Mensagem - Capa Luxo Rosa Claro e Escuro",
    imageUrl: "/amazon-products/biblia-rosa-claro.png",
    url: "https://amzn.to/3T2CAvc",
  },
  {
    title: "Bíblia a Mensagem - Capa Luxo Preta e Cinza",
    imageUrl: "/amazon-products/biblia-preta-cinza.png",
    url: "https://amzn.to/3ABg3PP",
  },
  {
    title:
      "Bíblia A Mensagem Letra Gigante Rosa: Bíblia em Linguagem Contemporânea",
    imageUrl: "/amazon-products/biblia-rosa.png",
    url: "https://amzn.to/3yTPUv1",
  },
];

export default function Contribuir() {
  return (
    <Card className="mx-auto w-full max-w-4xl">
      <SetCookie name="visited_contribute_page" value="true" />
      <CardHeader>
        <h1 className="text-center text-2xl font-bold leading-none tracking-tight sm:text-2xl">
          Participe e Contribua
        </h1>
        <CardDescription className="mt-4 text-center">
          Contribua para manter o projeto Bíblia A Mensagem Online acessível e
          livre de anúncios. Sua generosidade ajuda a cobrir os custos de
          hospedagem e a melhorar constantemente o site.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Como você pode ajudar?</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-base font-semibold sm:text-lg">
                1. Doações Únicas:
              </h3>
              <p className="mb-4">
                Faça uma doação única pelo Stripe para ajudar a cobrir os custos
                operacionais do site. Cada contribuição é crucial para manter o
                projeto vivo e acessível a todos.
              </p>
              <Button asChild>
                <Link
                  href={`${process.env.STRIPE_DONATION_URL}`}
                  target="_blank"
                  className="w-full sm:w-auto"
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Doar via Stripe
                </Link>
              </Button>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold sm:text-lg">
                2. Compras Afiliadas:
              </h3>
              <p className="mb-4">
                Compre sua cópia física da Bíblia A Mensagem através de nossos
                links afiliados na Amazon. Ao comprar pelo link e adicionar ao
                carrinho, você nos apoia sem custo adicional.
              </p>

              {/* desktop grid */}
              <div className="hidden grid-cols-1 gap-4 xsm:grid xsm:grid-cols-2 sm:grid-cols-3">
                {affiliateProducts.map((product) => (
                  <Card id={product.title}>
                    <CardContent className="flex h-full flex-col justify-between p-2">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="mb-2 h-auto w-full"
                      />
                      <h4 className="mb-2 text-sm font-semibold md:text-base">
                        {product.title}
                      </h4>
                      <Button asChild>
                        <Link
                          href={product.url}
                          target="_blank"
                          className="text-center text-sm md:text-base"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" /> Comprar na
                          Amazon
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* mobile carousel */}
              <div className="relative w-full xsm:hidden">
                <Carousel>
                  <CarouselContent>
                    {affiliateProducts.map((product) => (
                      <CarouselItem className="p-4" id={product.title}>
                        <Card>
                          <CardContent className="flex h-full flex-col justify-between p-4">
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="mb-2 h-auto w-full"
                              draggable={false}
                            />
                            <h4 className="mb-2 text-sm font-semibold md:text-base">
                              {product.title}
                            </h4>
                            <Button asChild>
                              <Link
                                href={product.url}
                                target="_blank"
                                className="text-center text-sm md:text-base"
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />{" "}
                                Comprar na Amazon
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNavigation alwaysShow className="px-5" />
                  <CarouselIndicator />
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">
            Sua Contribuição Faz a Diferença
          </h2>
          <p>
            Agradecemos seu apoio e dedicação em tornar as escrituras acessíveis
            a todos. Juntos, podemos manter este recurso valioso disponível para
            quem busca inspiração e orientação na palavra de Deus.
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
