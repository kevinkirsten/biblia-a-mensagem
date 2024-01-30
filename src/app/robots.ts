import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";
  const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

  if (isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
