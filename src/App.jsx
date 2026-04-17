import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import CustomCursor from "./components/CustomCursor";
import SeoPackages from "./pages/SeoPackages";
import SmoPackages from "./pages/SmoPackages";
import WebPackages from "./pages/WebPackages";
import ContactUs from "./pages/ContactUs";
import Testimonials from "./pages/Testimonials";
import Seo from "./pages/services/Seo"
import EcommerceSeo  from "./pages/services/EcommerceSeo";
import TechnicalSeo from "./pages/services/TechnicalSeo";
import WhiteLabelSeo from "./pages/services/WhiteLabelSeo";
import AeoGeoSeo from "./pages/services/AeoGeoSeo";
import LinkBuilding from "./pages/services/LinkBuilding";
import LocalSeo from "./pages/services/LocalSeo";
function App() {
  return (
    <Router>
      
      <CustomCursor />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/pricing/seo" element={<SeoPackages />} />
        <Route path="/pricing/smo" element={<SmoPackages />} />
        <Route path="/pricing/web" element={<WebPackages />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/testimonials" element={<Testimonials/>} />
        <Route path = "/services/seo" element={<Seo/>}/>
        <Route path = "/services/ecommerce-seo" element={<EcommerceSeo/>}/>
        <Route path = "/services/technical-seo" element={<TechnicalSeo/>}/>
        <Route path = "/services/white-label-seo" element={<WhiteLabelSeo/>}/>
        <Route path = "/services/aeo-geo-seo" element={<AeoGeoSeo/>}/>
        <Route path = "/services/link-building" element={<LinkBuilding/>}/>
        <Route path = "/services/local-seo" element={<LocalSeo/>}/>
      </Routes>
    </Router>
  );
}

export default App;



