import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import CustomCursor from "./components/CustomCursor";
import SeoPackages from "./pages/SeoPackages";
import SmoPackages from "./pages/SmoPackages";
import WebPackages from "./pages/WebPackages";
import ContactUs from "./pages/ContactUs";
import Testimonials from "./pages/Testimonials";

function App() {
  return (
    <Router>
      {/* Global Components */}
      <CustomCursor />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/pricing/seo" element={<SeoPackages />} />
        <Route path="/pricing/smo" element={<SmoPackages />} />
        <Route path="/pricing/web" element={<WebPackages />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/testimonials" element={<Testimonials/>} />
      </Routes>
    </Router>
  );
}

export default App;
