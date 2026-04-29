import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import CustomCursor from "./components/CustomCursor";
import SeoPackages from "./pages/SeoPackages";
import SmoPackages from "./pages/SmoPackages";
import WebPackages from "./pages/WebPackages";
import ContactUs from "./pages/ContactUs";
import Testimonials from "./pages/Testimonials";
import CountryPage from "./pages/CountryPage";
import ServiceItem from "./pages/ServiceItem";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About"; // About Page
import Services from "./pages/Services"; // Services Page
function App() {
  return (
    <Router>
      <ScrollToTop></ScrollToTop>
      <CustomCursor />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/pricing/seo" element={<SeoPackages />} />
        <Route path="/pricing/smo" element={<SmoPackages />} />
        <Route path="/pricing/web" element={<WebPackages />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/testimonials" element={<Testimonials/>} />
       
      <Route path="/:city" element={<CountryPage />} />
      <Route path="/services/:slug" element={<ServiceItem />} />
      </Routes>
    </Router>
  );
}

export default App;



