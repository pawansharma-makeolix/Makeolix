import ContactSection from "../components/ContactSection"
import CTAMarquee from "../components/CTAMarquee"
import HeroOrbit from "../components/HeroOrbit"
import Navbar from "../components/Navbar"
import UltraFooter from "../components/UltraFooter"
import SeoMetaDesc from "../components/SeoMetaDesc"
const ContactUs = () => {
  return (
    <>
     <SeoMetaDesc
    title="Contact MakeOlix | Get in Touch with Our Digital Marketing Experts"

description="Contact MakeOlix for expert SEO, PPC, web development, and digital marketing solutions. Reach our team today for a free consultation and business growth."

url="https://makeolix.com/contact-us"
    ></SeoMetaDesc>
    <Navbar></Navbar>
    <HeroOrbit
    title ={"Contact Us"}
    description= {"We are here for the helping and growing your business. Let's connect with us to growing your business in your way."}
    showButtons={false}
    ></HeroOrbit>
    <ContactSection></ContactSection>
    <CTAMarquee></CTAMarquee>
    <UltraFooter></UltraFooter>
    </>
  )
}

export default ContactUs
