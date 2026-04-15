import {WEB_PLANS} from "../components/data/WEB_PLANS"
import PriceSection from "../components/PriceSection"
import UltraFooter from "../components/UltraFooter"
import CTAMarquee from "../components/CTAMarquee"
import Navbar from "../components/Navbar"
const WebPackages = () => {
  return (
<>
<Navbar></Navbar>
 <PriceSection 
       plans={WEB_PLANS}
      title="Web Packages"
      subtitle="Best for ranking"
      ></PriceSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
</> 
 );
}

export default WebPackages