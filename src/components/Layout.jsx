import Navbar from './Navbar'
import CTAMarquee from './CTAMarquee'
import UltraFooter from './UltraFooter'

const Layout = ({children}) => {
  return (
    <>
    <Navbar></Navbar>
    {children}
    <CTAMarquee></CTAMarquee>
    <UltraFooter></UltraFooter>
    
    </>
  )
}

export default Layout
