import React from "react";
import { BlogData } from "../components/data/BlogData";
import Navbar from "../components/Navbar";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import HeroOrbit from "../components/HeroOrbit";
import CaseStudiesSection from "../components/CaseStudiesSection";
import BlogContent from "../components/BlogContent";
import SeoMetaDesc from "../components/SeoMetaDesc";


const Blog = () => {
  const blogsData = [


      {
      slug: "how-the-best-e-commerce-seo-agency-helps-brands-achieve-10x-growth",
      image: "/lukas-muller-Q4iYWsWbR90-unsplash (1).webp",
      description:
        "How the Best E-commerce SEO Agency Helps Brands Achieve 10X Growth",

      buttonText: "Read More",
      buttonHref: "/blog/how-the-best-e-commerce-seo-agency-helps-brands-achieve-10x-growth",
      buttonVariant: "",
    },
    {
      slug: "what-does-a-performance-marketing-agency-in-india-do",
      image: "/campaign-creators-pypeCEaJeZY-unsplash (2).webp",
      description:
        "What Does a Performance Marketing Agency in India Do? A 2026 Guide",

      buttonText: "Read More",
      buttonHref: "/blog/what-does-a-performance-marketing-agency-in-india-do",
      buttonVariant: "",
    },
    {
      slug: "top-7-best-wordpress-web-development-companies-in-2026",
      image: "/domenico-loia-hGV2TfOh0ns-unsplash1 (1).webp",
      description:
        "Top 7 Best WordPress Web Development Companies in 2026 ",

      buttonText: "Read More",
      buttonHref: "/blog/top-7-best-wordpress-web-development-companies-in-2026",
      buttonVariant: "",
    },
     {
      slug: "local-seo-services-9-best-ways-to-increase-online-visibility-in-2026",
      image: "/10-Best-E-Commerce-SEO-Services-Agencies-to-Grow-Your-Revenue-in-2026 (1).webp",
      description:
        "Local SEO Services: 9 Best Ways to Increase Online Visibility in 2026",

      buttonText: "Read More",
      buttonHref: "/blog/local-seo-services-9-best-ways-to-increase-online-visibility-in-2026",
      buttonVariant: "",
    },
    {
      slug: "10-best-e-commerce-seo-services-agencies",
      image: "/blog-image-16-6-2026 (1).webp",
      description:
        "10 Best E-Commerce SEO Services Agencies to Grow Your Revenue in 2026",

      buttonText: "Read More",
      buttonHref: "/blog/10-best-e-commerce-seo-services-agencies",
      buttonVariant: "",
    },
    {
      slug: "how-do-i-choose-the-best-seo",
      image: "/SEO-Reseller-Service-Provide-In-India-MakeOlix-Consulting.webp",
      description:
        "How Do I Choose the Best SEO Reseller Service Provider in India: Complete Guide for Growing Agencies 2026",
      buttonText: "Read More",
      buttonHref: "/blog/how-do-i-choose-the-best-seo",
      buttonVariant: "",
    },
    {
      slug: "top-seo-agencies-in-india",

      image:
        "/5-Top-SEO-Agencies-in-India-to-Boost-Your-Productivity-in-2025-MakeOlix-Consulting.webp",
      description:
        "5 Top SEO Agencies in India to Boost Your Productivity in 2025",
      buttonText: "Read More",
      buttonHref: "/blog/top-seo-agencies-in-india",
      buttonVariant: "",
    },
    {
      slug: "want-more-traffic-sales",
      image: "/Top-E-commerce-SEO-Agency-in-India-MakeOlix-Consulting.webp",
      description:
        "Want More Traffic & Sales? Partner with a Top E-commerce SEO Agency in India",
      buttonText: "Read More",
      buttonHref: "/blog/want-more-traffic-sales",
      buttonVariant: "",
    },
    {
      slug: "how-much-do-seo-companies-charge",
      image: "/How-Much-Do-SEO-Companies-Charge_3.webp",
      description: "How Much Do SEO Companies Charge?",
      buttonText: "Read More",
      buttonHref: "/blog/how-much-do-seo-companies-charge",
      buttonVariant: "",
    },
    {
      slug: "the-role-of-an-seo-company",
      image: "/The-Role-of-an-SEO-Company_BLOG-3.webp",
      description:
        "The Role of an SEO Company in Boosting Your Online Presence",

      buttonText: "Read More",
      buttonHref: "/blog/the-role-of-an-seo-company",
      buttonVariant: "",
    },
    
   
  ];
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
