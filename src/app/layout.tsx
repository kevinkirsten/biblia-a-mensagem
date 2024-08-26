import "@/app/globals.css";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import Providers from "@/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import clsx from "clsx";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_PROJECT_ID}");`,
        }}
      />
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
      <body
        className={clsx(
          inter.className,
          "flex min-h-screen w-full flex-col justify-start bg-gray-100 antialiased dark:bg-gray-800"
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
