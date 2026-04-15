import {SEO_PLANS} from "../components/data/SEO_PLANS"
import Navbar from "../components/Navbar"
import PriceSection from "../components/PriceSection"
import UltraFooter from "../components/UltraFooter"
import CTAMarquee from "../components/CTAMarquee"
import HeroOrbit from "../components/HeroOrbit"
const SeoPackages = () => {
  return (
<>
<Navbar></Navbar>
<HeroOrbit></HeroOrbit>
 <PriceSection 
       plans={SEO_PLANS}
      title="SEO Packages"
      subtitle="Best for ranking"
      ></PriceSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
</>
)
}

export default SeoPackages