import React from 'react'
import Navbar from '../components/Navbar'
import UltraFooter from '../components/UltraFooter'
import HeroOrbit from '../components/HeroOrbit'

const Testimonials = () => {
  return (
    <>
    <Navbar></Navbar>
    <HeroOrbit
    title={"Our Testimonials"}
    primaryBtnText={"Know More"}
    primaryLink={"/contact-us"}
    secondaryBtnText={"Get In Touch"}
    secondaryLink={"/contact-us"}
    ></HeroOrbit>
    <UltraFooter></UltraFooter>
    
    </>
  )
}

export default Testimonials
