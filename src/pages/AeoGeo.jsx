import React from 'react'
import Navbar from '../components/Navbar';
import HeroOrbit from '../components/HeroOrbit';
import SEOPricingTable from '../components/SEOPricingTable';
import CTAMarquee from '../components/CTAMarquee';
import UltraFooter from '../components/UltraFooter';
import SeoMetaDesc from '../components/SeoMetaDesc';
function AeoGeo() {
  return (
    


<>
<SeoMetaDesc
  title="AEO + GEO Pricing Plans | AI Search Optimization Services"
  description="Explore affordable AEO + GEO pricing plans by MakeOlix. Optimize your brand for AI search engines, ChatGPT, Gemini, and Google AI Overviews with expert solutions."
  url="https://makeolix.com/pricing/aeo+geo"
/>
<Navbar></Navbar>
<HeroOrbit 
title={"AEO + GEO"}
primaryBtnText={"Discuss With Us"}
primaryLink={"/contact-us"}
secondaryBtnText={"Know More"}
secondaryLink={"/about"}
></HeroOrbit>
<SEOPricingTable></SEOPricingTable>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
</>

)
}

export default AeoGeo;
