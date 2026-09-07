import React from 'react'
import Navbar from '../components/Navbar'
import SeoMetaDesc from '../components/SeoMetaDesc'
import CTAMarquee from '../components/CTAMarquee'
import UltraFooter from '../components/UltraFooter'
import PortfolioHero from '../components/PortfolioHero'
import { ShopifyPortfolioo } from "../components/data/PortfolioData";
import PortfolioShowcase from '../components/PortfolioShowcase'

const ShopifyPortfolio = () => {
  return (
  <>
  <SeoMetaDesc

title="Matrix Maximizer $79 SEO Package | Website Optimization | MakeOlix"

description="Improve your website's rankings with our $79 SEO package. Includes onsite optimization, content enhancements, UI/UX improvements, SEO audit, and growth strategy."

url="https://makeolix.com/mm79"

/>
<Navbar></Navbar>
<PortfolioHero></PortfolioHero>
 <PortfolioShowcase
        projects={ShopifyPortfolioo}
      />
<CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter> 
  </>
  );
};
export default ShopifyPortfolio;
