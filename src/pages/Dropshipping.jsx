
import Navbar from "../components/Navbar";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import RippleHero from "../components/RippleHero";
import FeatureCarousel from "../components/FeatureCarousel";
import ConnectedStepSection from "../components/ConnectedStepSection";
import TextMediaVariant from "../components/TextMediaVariant";
// import { Connect } from "vite";

const Dropshipping = () => {
  return (
   <>
   
   <Navbar></Navbar>
   <RippleHero
   heading="Dropshipping Website Builder Services for Fast-Growing Ecommerce Brands"
   paragraph="Thousands of dropshipping stores launch every year, but only a small percentage gain traction and scale profitably. Success comes from having the right platform, the right customer experience, and a growth-focused marketing strategy from day one."
   primaryLabel = "Get Started"
  primaryHref = "/start"
  secondaryLabel = "Learn More"
  secondaryHref = "/about-us"
   ></RippleHero>
    <ConnectedStepSection></ConnectedStepSection>
   <FeatureCarousel></FeatureCarousel>
  
   <TextMediaVariant

  heading="Advertising for Dropshipping Stores Across Google, Meta, and YouTube"

  description="Advertising for dropshipping has a learning curve. The platforms are powerful, but they're also easy to overspend on if your creative, targeting, and landing pages aren't aligned. We manage the full paid media stack, so your budget works harder from the start."

  services={[
    {
      number: "01",
      title: "YouTube Ads",
      desc: "Video creative that tells your product story at scale, with precise audience targeting and measurable ROAS."
    },
    {
      number: "02",
      title: "Google Search & Shopping",
      desc: "Capture buyers who are already looking. Google Shopping campaigns are often the highest-intent channel for dropshipping stores."
    },
    {
      number: "03",
      title: "Meta Ads (Facebook & Instagram)",
      desc: "Awareness, retargeting, and catalogue ads, built for the full funnel, from cold audiences to warm repeat buyers."
    },
    {
      number: "04",
      title: "Retargeting & Recovery",
      desc: "Bring back visitors who didn't convert. Abandoned cart retargeting alone can significantly lift your monthly revenue."
    }
  ]}

  images={[
    "/dallas.jpg",
    "/dallas.jpg",
    "/dallas.jpg",
    "/dallas.jpg",
   
  ]}

/>
   <CTAMarquee></CTAMarquee>
   <UltraFooter></UltraFooter>
   </>
  );
};

export default Dropshipping;
