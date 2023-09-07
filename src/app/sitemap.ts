import { MetadataRoute } from "next";
import { generateStaticParams } from "@/app/[book]/[chapter]/page";
import { baseUrl } from "@/app/appConfig";
import { AllBibleBooks } from "@/data/bible-books";

type Sitemap = Array<{
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticParams = generateStaticParams();

  const versesPages: Sitemap = staticParams.map((params) => ({
    url: `${baseUrl}/${params.book}/${params.chapter}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const chaptersPages: Sitemap = AllBibleBooks.map((book) => ({
    url: `${baseUrl}/${book.normalizedTitle}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const staticPages: Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contribuir`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...chaptersPages, ...versesPages];
}
