import fs from "fs";

import { ServicesPagesData } from "./src/components/data/index.js";
import { ServiceAreaPagesData } from "./src/components/data/ServiceAreaPagesData.js";
import { BlogData } from "./src/components/data/BlogData.js";
import { caseStudiesData } from "./src/components/data/caseStudiesData.js";

const BASE_URL = "https://makeolix.com";

/* =========================
   INDIA TIMEZONE LASTMOD
========================= */

const today =
  new Date()
    .toLocaleString("sv-SE", {
      timeZone: "Asia/Kolkata",
    })
    .replace(" ", "T") + "+05:30";

let urls = "";

/* =========================
   HOMEPAGE
========================= */

urls += `
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

/* =========================
   STATIC PAGES
========================= */

const staticPages = [
  "/about-us",
  "/contact-us",
  "/careers",
  "/privacy-policy",
  "/terms-and-conditions",
  "/matrix-maximizer-plan",
  "/testimonials",
  "/case-studies",
  "/blog",
  "/pricing/ai-powered-seo",
"/pricing/smo",
"/pricing/web",
"/pricing/aeo+geo",
"/pricing/seo+ai_visibility",
];

staticPages.forEach((page) => {
  urls += `
    <url>
      <loc>${BASE_URL}${page}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
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
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
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
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `;
});



/* =========================
   DYNAMIC BLOG PAGES
========================= */

Object.entries(BlogData).forEach(([slug, blog]) => {
  const lastmod = blog.updatedAt || blog.publishedAt || today;

  urls += `
    <url>
      <loc>${BASE_URL}/blog/${slug}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `;
});
/* =========================
   DYNAMIC CASE STUDIES
========================= */

Object.keys(caseStudiesData).forEach((slug) => {
  urls += `
    <url>
      <loc>${BASE_URL}/case-studies/${slug}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
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
