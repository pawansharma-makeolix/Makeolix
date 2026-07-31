import React from "react";
import Navbar from "../components/Navbar";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import HeroOrbit from "../components/HeroOrbit";
import CaseStudiesGrid from "../components/CaseStudiesGrid";
import CaseStudiesSection from "../components/CaseStudiesSection";
import SeoMetaDesc from "../components/SeoMetaDesc";
import { caseStudiesData } from "../components/data/caseStudiesData";
function CaseStudies() {
 const caseData = Object.entries(caseStudiesData).map(([slug, item]) => ({
  slug,
  image: item.image,
  description: item.description,
  publishedAt: item.publishedAt,
  updatedAt: item.updatedAt,

  buttonText: "Read More",
  buttonHref: `/case-studies/${slug}`,
  buttonVariant: "outline",
}));
  return (
    <>
     <SeoMetaDesc
    title="Case Studies | Proven Digital Marketing & SEO Success Stories"

description="Explore real-world case studies showcasing successful SEO, digital marketing, and business growth strategies. Discover measurable results, increased traffic."

url="https://makeolix.com/case-studies"
    ></SeoMetaDesc>
      <Navbar></Navbar>
      <HeroOrbit
        title={"Our Case Studies"}
        primaryBtnText={"Know More"}
        primaryLink={"/about-us"}
        secondaryBtnText={"Get In Touch"}
        secondaryLink={"/contact-us"}
      ></HeroOrbit>

      <CaseStudiesSection
        heading="Our Recent Work"
        subtext="Real results for real businesses – crafted with strategy and precision."
        cases={caseData}
        columns={3} // you can change to 2 or 4
      />
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
}

export default CaseStudies;