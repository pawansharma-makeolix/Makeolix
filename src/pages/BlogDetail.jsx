import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import CaseStudiesSection from "../components/CaseStudiesSection";
import { BlogData } from "../components/data/BlogData";
import OtherPageHero from "../components/OtherPageHero";
import BlogContent from "../components/BlogContent";
import FaqVariant from "../components/FaqVariant";
import SeoMetaDesc from "../components/SeoMetaDesc";
const BlogDetail = () => {
  const { slug } = useParams();

  const pageData = BlogData[slug];

  if (!pageData) {
    return (
      <div
        style={{
          background: "#00171f",
          minHeight: "100vh",
          color: "white",
          padding: "100px 20px",
        }}
      >
        Blog Not Found{" "}
      </div>
    );
  }

  const relatedBlogs = pageData.relatedblogs || [];
  return (
    <>
      <SeoMetaDesc
        title={pageData.metaTitle}
        description={pageData.metaDescription}
        url={`https://makeolix.com/blog/${slug}`}
        image={pageData.image}
        publishedAt={pageData.publishedAt}
        updatedAt={pageData.updatedAt}
        type="article"
      />
      <Navbar />

      {pageData.sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return <OtherPageHero key={index} {...section.data} />;

          case "blogcontent":
            return <BlogContent key={index} {...section.data} />;
          case "faq":
            return <FaqVariant key={index} faqs={section.data.faqdata} />;
          default:
            return null;
        }
      })}

      {relatedBlogs.length > 0 && (
        <CaseStudiesSection
          heading="Related Blogs"
          subtext="Explore more articles"
          cases={relatedBlogs.map((item) => ({
  ...item,

  image: BlogData[item.slug]?.image || item.image,
  description: BlogData[item.slug]?.description || item.description,

  publishedAt: BlogData[item.slug]?.publishedAt,
  updatedAt: BlogData[item.slug]?.updatedAt,

  buttonText: "Read More",
  buttonHref: `/blog/${item.slug}`,
  buttonVariant: "",
}))}
          columns={3}
        />
      )}

      <CTAMarquee />
      <UltraFooter />
    </>
  );
};

export default BlogDetail;
