import React from "react";
import Navbar from "../components/Navbar";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import SeoMetaDesc from "../components/SeoMetaDesc";
import VirtualAssistantHero from "../components/VirtualAssistantHero";
import VirtualAssistantServices from "../components/VirtualAssistantServices";
import VirtualAssistantOffered from "../components/VirtualAssistantOffered"
import WhyChooseMakeolix from "../components/WhyChooseMakeolix";
import FaqVariant from "../components/FaqVariant"
import VirtualAssistantFAQ from "../components/VirtualAssistantFAQ";

const VirtualAssistant = () => {
  

  return (
    <>
     <SeoMetaDesc
   title="Client Testimonials & Success Stories | Real Customer Reviews"

description="Read genuine client testimonials and success stories from businesses that achieved measurable growth through expert digital marketing, SEO, web development."

url="https://makeolix.com/testimonials"
    ></SeoMetaDesc>
      <Navbar></Navbar>
      <VirtualAssistantHero
        headline="Virtual Assistant Services"
        description="Your inbox is full, follow-ups are slipping, and the marketing tasks you planned last month are still on the list. When founders and managers handle every small task themselves, growth slows down. "
        
      />
      <VirtualAssistantServices></VirtualAssistantServices>
      <VirtualAssistantOffered></VirtualAssistantOffered>
     <WhyChooseMakeolix></WhyChooseMakeolix>
     <VirtualAssistantFAQ></VirtualAssistantFAQ>
     <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default VirtualAssistant;