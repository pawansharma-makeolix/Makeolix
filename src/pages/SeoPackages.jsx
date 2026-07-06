import { SEO_PLANS } from "../components/data/SEO_PLANS";
import Navbar from "../components/Navbar";
import PriceSection from "../components/PriceSection";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import HeroOrbit from "../components/HeroOrbit";
import SeoMetaDesc from '../components/SeoMetaDesc';

const SeoPackages = () => {
  return (
    <>
    <SeoMetaDesc
  title="AI-Powered SEO Pricing Plans | Affordable SEO Packages | Makeolix"
  description="Explore Makeolix AI-powered SEO pricing plans designed to boost rankings, increase organic traffic, and grow your business with affordable SEO solutions."
  url="https://makeolix.com/pricing/ai-powered-seo"
/>
      <Navbar></Navbar>
      <HeroOrbit
        title={"AI-POWERED SEO"}
        title={"AI-Powered SEO"}
        primaryBtnText={"Discuss With Us"}
        primaryLink={"/contact-us"}
        secondaryBtnText={"Know More"}
        secondaryLink={"/about"}
      ></HeroOrbit>
      <PriceSection
        plans={SEO_PLANS}
        subtitle="Best for ranking"
        alwaysExpanded={true}
      ></PriceSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default SeoPackages;
