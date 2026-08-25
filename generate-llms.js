import fs from "fs";

import { ServicesPagesData } from "./src/components/data/index.js";
import { ServiceAreaPagesData } from "./src/components/data/ServiceAreaPagesData.js";
import { BlogData } from "./src/components/data/BlogData.js";
import { caseStudiesData } from "./src/components/data/caseStudiesData.js";

const BASE_URL = "https://makeolix.com";

let content = `# MakeOlix Consulting

> MakeOlix is a digital marketing and web development agency helping US businesses with SEO, performance marketing, and eCommerce website development.

## Key Pages

- [Home](${BASE_URL}/)
- [About Us](${BASE_URL}/about-us)
- [Contact Us](${BASE_URL}/contact-us)
- [Testimonials](${BASE_URL}/testimonials)
- [Case Studies](${BASE_URL}/case-studies)
- [Blog](${BASE_URL}/blog)

## Services
`;

/* =========================
   DYNAMIC SERVICE LINKS
========================= */

Object.keys(ServicesPagesData).forEach((slug) => {
  const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  content += `- [${label}](${BASE_URL}/services/${slug})\n`;
});

/* =========================
   DYNAMIC CITY PAGES
========================= */

content += `\n## Service Areas\n`;

Object.keys(ServiceAreaPagesData).forEach((city) => {
  const label = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  content += `- [${label}](${BASE_URL}/${city})\n`;
});

/* =========================
   DYNAMIC BLOG POSTS
========================= */

content += `\n## Blog Posts\n`;

Object.entries(BlogData).forEach(([slug, blog]) => {
  const title = blog.metaTitle || blog.description || slug;
  content += `- [${title}](${BASE_URL}/blog/${slug})\n`;
});

/* =========================
   DYNAMIC CASE STUDIES
========================= */

content += `\n## Case Studies\n`;

Object.keys(caseStudiesData).forEach((slug) => {
  const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  content += `- [${label}](${BASE_URL}/case-studies/${slug})\n`;
});

/* =========================
   WRITE FILE
========================= */

fs.writeFileSync("./public/llms.txt", content);

console.log("✅ llms.txt generated successfully!");