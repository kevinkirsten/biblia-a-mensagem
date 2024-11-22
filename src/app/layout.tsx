import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Providers from "@/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { MicrosoftClarityScript } from "@/scripts/microsoft-clarity";
import { GoogleAnalyticsScript } from "@/scripts/google-analytics";
import { GoogleAdsenseScript } from "@/scripts/google-adsense";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const dynamicParams = false;

export const metadata: Metadata = {
  title: {
    default: "Bíblia A Mensagem",
    template: "%s | Bíblia A Mensagem",
  },
  description:
    "Explore a Bíblia A Mensagem online, uma tradução moderna e acessível da Bíblia. Mergulhe nos textos sagrados e deixe que a palavra de Deus inspire e guie seu caminho.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <MicrosoftClarityScript />
      <GoogleAnalyticsScript />
      <GoogleAdsenseScript />
      <body
        className={cn(
          inter.className,
          "flex h-full min-h-screen w-full flex-col justify-start bg-gray-100 antialiased dark:bg-gray-800"
        )}
      >
        <Providers>
          <Header />
          <div className="mx-auto min-h-screen w-full max-w-7xl bg-gray-100 px-4 dark:bg-gray-800 sm:px-6 lg:px-8">
            <div className="mx-auto mb-8 mt-6 max-w-3xl">{children}</div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
