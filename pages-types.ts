import type { Crumb } from "./ui.ts";

export interface PageDef {
  path: string;
  title: string;
  description: string;
  body: string;
  jsonLd?: object[];
  crumbs?: Crumb[];
  noindex?: boolean;
  ogType?: "website" | "article";
  /** Jätetäänkö pois sivukartasta. */
  excludeFromSitemap?: boolean;
  /** Tiedostonimi dist-kansiossa, jos poikkeaa polusta (esim. 404.html). */
  outFile?: string;
}
