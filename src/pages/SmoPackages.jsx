import {SMO_PLANS} from "../components/data/SMO_PLANS"
import PriceSection from "../components/PriceSection"
import UltraFooter from "../components/UltraFooter"
import CTAMarquee from "../components/CTAMarquee"
import Navbar from "../components/Navbar"

const SmoPackages = () => {
  return (

<div>
  <Navbar></Navbar>
     <PriceSection 
       plans={SMO_PLANS}
      title="SMO Packages"
      subtitle="Best for ranking"
      ></PriceSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
</div> 
  )
}

export default SmoPackages