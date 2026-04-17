import React from 'react'
import HeroOrbit from "../../components/HeroOrbit";
import Navbar from '../../components/Navbar'
import UltraFooter from '../../components/UltraFooter';
import CTAMarquee from '../../components/CTAMarquee';

const Seo = () => {
  return (
    <>
    <Navbar></Navbar>
   <HeroOrbit
           title={"Seo Service "}
           description={
             "We blend creativity and technology to build powerful digital solutions that drive growth and create lasting impact."
           }
           primaryBtnText={"Get Started "}
           secondaryBtnText={"Learn More"}
           primaryLink={"/contact-us"}
           secondaryLink={"/contact-us"}
         ></HeroOrbit>
         <CTAMarquee></CTAMarquee>
         <UltraFooter></UltraFooter>
    </>
  )
}

export default Seo
