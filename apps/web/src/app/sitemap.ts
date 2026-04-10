import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

type Route = {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: readonly Route[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/calculate", priority: 0.9, changeFrequency: "monthly" },
  { path: "/research", priority: 0.8, changeFrequency: "yearly" },
  { path: "/model", priority: 0.8, changeFrequency: "yearly" },
  { path: "/imprint", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    priority,
    changeFrequency,
  }));
}
