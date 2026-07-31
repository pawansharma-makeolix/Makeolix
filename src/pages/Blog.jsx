import React from "react";
import { BlogData } from "../components/data/BlogData";
import Navbar from "../components/Navbar";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import HeroOrbit from "../components/HeroOrbit";
import CaseStudiesSection from "../components/CaseStudiesSection";
import SeoMetaDesc from "../components/SeoMetaDesc";


const Blog = () => {
 const blogsData = Object.entries(BlogData).map(([slug, blog]) => ({
  slug,
  image: blog.image,
  description: blog.description,
  publishedAt: blog.publishedAt,
  updatedAt: blog.updatedAt,

  buttonText: "Read More",
  buttonHref: `/blog/${slug}`,
  buttonVariant: "",
}));
  return (
    <>
     <SeoMetaDesc
    title="AI, SEO & Digital Marketing Blog | Expert Tips, Guides & Insights"

description="Discover expert insights on AI, SEO, content marketing, digital strategy, automation, and business growth. Explore actionable guides, industry trends | Makeolix"

url="https://makeolix.com/blog"
    ></SeoMetaDesc>
      <Navbar></Navbar>
      <HeroOrbit
        title={"Our Blogs"}
        primaryBtnText={"Know More"}
        primaryLink={"/about"}
        secondaryBtnText={"Get In Touch"}
        secondaryLink={"/contact-us"}
      ></HeroOrbit>

      <CaseStudiesSection
        heading="Stories That Inspire Growth"
        subtext="From creative ideas to practical strategies, discover articles that help you understand trends, solve challenges, and build stronger digital experiences."
        cases={blogsData}
        columns={3} // you can change to 2 or 4
      />
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default Blog;
