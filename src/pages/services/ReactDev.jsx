import Layout from "../../components/Layout";
import HeroOrbit from "../../components/HeroOrbit";
const ReactDev = () => {
  return (
   <>
    <Layout><HeroOrbit 
    title={"React Development "}
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

export default ReactDev
