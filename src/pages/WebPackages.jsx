import {WEB_PLANS} from "../components/data/WEB_PLANS"
import PriceSection from "../components/PriceSection"
import UltraFooter from "../components/UltraFooter"
import CTAMarquee from "../components/CTAMarquee"
import Navbar from "../components/Navbar"
import HeroOrbit from "../components/HeroOrbit"
const WebPackages = () => {
  return (
<>
<Navbar></Navbar>
<HeroOrbit 
title={"Web Packages"}
primaryBtnText={"Discuss Us"}
primaryLink={"/contact-us"}
secondaryBtnText={"Know More"}
secondaryLink={"/about"}
></HeroOrbit>
 <PriceSection 
       plans={WEB_PLANS}
      
      subtitle="Best for ranking"
      ></PriceSection>

      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
</> 
 );
}

export default WebPackages