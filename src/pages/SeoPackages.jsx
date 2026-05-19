import { SEO_PLANS } from "../components/data/SEO_PLANS";
import Navbar from "../components/Navbar";
import PriceSection from "../components/PriceSection";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import HeroOrbit from "../components/HeroOrbit";
const SeoPackages = () => {
  return (
    <>
      <Navbar></Navbar>
      <HeroOrbit
<<<<<<< HEAD
        title={"AI-POWERED SEO"}
=======
        title={"AI-Powered SEO"}
>>>>>>> b0271f215facce0fb74ffb3bfbd0f78f2ec33ab2
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
