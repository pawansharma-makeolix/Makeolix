import Layout from "../../components/Layout";
import HeroOrbit from "../../components/HeroOrbit";
const PhpDev = () => {
  return (
   <>

    <Layout><HeroOrbit 
    title={"Php Development"}
           description={
             "We blend creativity and technology to build powerful digital solutions that drive growth and create lasting impact."
           }
           primaryBtnText={"Get Started "}
           secondaryBtnText={"Learn More"}
           primaryLink={"/contact-us"}
           secondaryLink={"/contact-us"}
    ></HeroOrbit>
    </Layout>
   </>
  )
}

export default PhpDev
