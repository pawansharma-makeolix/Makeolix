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

import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted></Trusted>
      <About></About>
      <KnowPoints></KnowPoints>
      <ServicesSlider />
      <MakeolixNumbers></MakeolixNumbers>
      <WhyChooseUs></WhyChooseUs>
      <VideoTestimonials></VideoTestimonials>
      <FAQSection></FAQSection>
      <Achievements></Achievements>
      <BlogSection></BlogSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default Home;
