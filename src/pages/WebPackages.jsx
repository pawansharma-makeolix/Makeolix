import { WEB_PLANS } from "../components/data/WEB_PLANS";
import PriceSection from "../components/PriceSection";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import Navbar from "../components/Navbar";
import HeroOrbit from "../components/HeroOrbit";
import SeoMetaDesc from '../components/SeoMetaDesc';

const WebPackages = () => {
  return (
    <>
    <SeoMetaDesc
  title="Website Development Pricing Plans | Affordable Web Design Packages "
  description="Explore MakeOlix's affordable website development pricing plans. Choose from custom web design packages for businesses, startups, and eCommerce websites."
  url="https://makeolix.com/pricing/web"
/>
      <Navbar></Navbar>
      <HeroOrbit
        title={"WEB DEV PRICING"}
        primaryBtnText={"Discuss With Us"}
        primaryLink={"/contact-us"}
        secondaryBtnText={"Know More"}
        secondaryLink={"/about"}
      ></HeroOrbit>
      <PriceSection
        plans={WEB_PLANS}
        subtitle="Best for ranking"
        alwaysExpanded={true}
      ></PriceSection>

      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default WebPackages;
