import React from "react";
import Navbar from "../components/Navbar";
import HeroOrbit from "../components/HeroOrbit";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import IntroText from "../components/IntroText";

const MM79 = () => {
  return <>
  <Navbar></Navbar>
        <HeroOrbit
          title={"MATRIX MAXIMIZER $79"}
          description={
            "A KICK START TO YOUR DIGITAL JOURNEY"
          }
          primaryBtnText={"Get Started "}
          secondaryBtnText={"Learn More"}
          primaryLink={"/contact-us"}
          secondaryLink={"/contact-us"}
        ></HeroOrbit>
        <IntroText heading="WE DRIVE SUCCESS, YOU REAP REWARDS" paragraph="In the vast landscape of the digital realm, MakeOlix stands out as a beacon of innovation and expertise. As a leading Digital Marketing Company in the USA, we redefine how brands connect with their audiences, always going beyond the lead. Dynamic Marketing Strategy Definition MakeOlix Consulting Inc drives business transformation with innovative solutions in strategy, operations, and digital marketing. Their expert team ensures tailored, customer-focused approaches for growth, efficiency, and sustainable success."></IntroText>
        <CTAMarquee></CTAMarquee>
        <UltraFooter></UltraFooter> 
  </>
};

export default MM79;
