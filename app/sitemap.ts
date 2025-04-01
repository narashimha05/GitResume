import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://git-resume-coral.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://git-resume-coral.vercel.app/form",
      lastModified: new Date(),
    },
    {
      url: "https://git-resume-coral.vercel.app/resume",
      lastModified: new Date(),
    },
  ];
}