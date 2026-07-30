import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Trusted from "../components/Trusted";
import KnowPoints from "../components/KnowPoints";
import ServicesSlider from "../components/ServicesSlider";
import MakeolixNumbers from "../components/MakeolixNumbers";
import WhyChooseUs from "../components/WhyChooseUs";
import VideoTestimonials from "../components/VideoTestimonials";
import FAQSection from "../components/FAQSection";
import Achievements from "../components/Achievements";
import BlogSection from "../components/BlogSection";
import { TestimonialData } from "../components/data/TestimonialData";
import StaggerTestimonials from "../components/StaggerTestimonials";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import HorizontalScrollSection from "../components/HorizontalScrollSection";
import GoogleReviewsWidget from "../components/GoogleReviewsWidget";
import SeoMetaDesc from "../components/SeoMetaDesc";
const Home = () => {
  const stats = [
    {
      number: "10+",
      title: "Years of Experience",
      desc: "Expertise honed through a decade of diverse industry challenges.",
    },
    {
      number: "150+",
      title: "Specialist",
      desc: "A dedicated team of skilled professionals driving excellence.",
    },
    {
      number: "5,000+",
      title: "Marketing Consultations",
      desc: "Proven insights from a wealth of strategic consultations conducted.",
    },
    {
      number: "2",
      title: "Continents",
      desc: "Expanding global reach with successful endeavors on multiple continents.",
    },
    {
      number: "3,000+",
      title: "Executed Campaigns",
      desc: "A track record of executing effective and impactful marketing campaigns.",
    },
    {
      number: "100",
      title: "Established Partners Globally",
      desc: "Trusted partnerships fostering global connections and mutual success.",
    },
  ];

  return (
    <>
      <SeoMetaDesc
        title="MakeOlix: India's #1 Result-Driven Digital Marketing Agency"
        url="https://makeolix.com/"
        description="Partner with MakeOlix for expert SEO, PPC, social media marketing, website development, and branding services that help businesses generate more traffic, leads, and sales."
      ></SeoMetaDesc>
      <Navbar />
      <Hero />
      <Trusted></Trusted>
      <About></About>

      <KnowPoints></KnowPoints>
      <ServicesSlider />
      <MakeolixNumbers
        heading="The Makeolix in Numbers"
        statsData={stats}
        variant={"dark"}
      ></MakeolixNumbers>
      <WhyChooseUs></WhyChooseUs>
      <VideoTestimonials></VideoTestimonials>
      {/* <StaggerTestimonials data={TestimonialData}></StaggerTestimonials> */}
      <GoogleReviewsWidget></GoogleReviewsWidget>
      <FAQSection></FAQSection>
      <Achievements></Achievements>
      <BlogSection></BlogSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default Home;
