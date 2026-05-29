import fs from "fs";

import { ServicesPagesData } from "./src/components/data/index.js";
import { ServiceAreaPagesData } from "./src/components/data/ServiceAreaPagesData.js";

const BASE_URL = "https://makeolix.com";

let urls = "";

/* =========================
   STATIC PAGES
========================= */

const staticPages = [
  "",
  "/about",
  "/contact-us",
  "/careers",
  "/privacy-policy",
  "/terms-and-conditions",
  "/mm79",
  "/testimonials",
  "/case-studies",
  "/blog",
];

staticPages.forEach((page) => {
  urls += `
    <url>
      <loc>${BASE_URL}${page}</loc>
    </url>
  `;
});

/* =========================
   DYNAMIC SERVICE PAGES
========================= */

Object.keys(ServicesPagesData).forEach((slug) => {
  urls += `
    <url>
      <loc>${BASE_URL}/services/${slug}</loc>
    </url>
  `;
});

/* =========================
   DYNAMIC CITY / AREA PAGES
========================= */

Object.keys(ServiceAreaPagesData).forEach((city) => {
  urls += `
    <url>
      <loc>${BASE_URL}/${city}</loc>
    </url>
  `;
});

/* =========================
   FINAL XML
========================= */

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls}

</urlset>
`;

/* =========================
   WRITE FILE
========================= */

fs.writeFileSync("./public/sitemap.xml", sitemap);

console.log("✅ Sitemap generated successfully!");