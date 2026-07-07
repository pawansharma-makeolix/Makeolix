import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import MM79 from "./pages/MM79";
import AeoGeo from "./pages/AeoGeo";
import SeoAiVisibility from "./pages/SeoAiVisibility";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
// import IndustryItem from "./pages/IndustryItem"
import ChatBot from "./components/chatbot/ChatBot";
import TermsConditions from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Dropshipping from "./pages/Dropshipping";


function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop></ScrollToTop>
        <ChatBot></ChatBot>
        <CustomCursor />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/dropshipping" element={<Dropshipping />} />
          <Route path="/pricing/ai-powered-seo" element={<SeoPackages />} />
          <Route path="/pricing/smo" element={<SmoPackages />} />
          <Route path="/pricing/web" element={<WebPackages />} />
          <Route path="/pricing/aeo+geo" element={<AeoGeo />} />
          <Route
            path="/pricing/seo+ai_visibility"
            element={<SeoAiVisibility />}
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/matrix-maximizer-plan" element={<MM79 />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          

      

          <Route
            path="/phoenix"
            element={<Navigate to="/phoenix-seo-agency" replace />}
          />

         
          <Route
            path="/jacksonville"
            element={<Navigate to="/jacksonville-seo-agency" replace />}
          />

          <Route
            path="/houston"
            element={<Navigate to="/houston-seo-agency" replace />}
          />

          <Route
            path="/los-angeles"
            element={<Navigate to="/los-angeles-seo-agency" replace />}
          />

          <Route
            path="/indianapolis"
            element={<Navigate to="/indianapolis-seo-agency" replace />}
          />

          <Route
            path="/charlotte"
            element={<Navigate to="/charlotte-seo-agency" replace />}
          />

          <Route
            path="/san-francisco"
            element={<Navigate to="/san-francisco-seo-agency" replace />}
          />

          <Route
            path="/san-antonio"
            element={<Navigate to="/san-antonio-seo-agency" replace />}
          />

          <Route
            path="/columbus"
            element={<Navigate to="/columbus-seo-agency" replace />}
          />

          <Route
            path="/new-york"
            element={<Navigate to="/new-york-seo-agency" replace />}
          />

          <Route
            path="/austin"
            element={<Navigate to="/austin-seo-agency" replace />}
          />

          <Route
            path="/philadelphia"
            element={<Navigate to="/philadelphia-seo-agency" replace />}
          />

          <Route
            path="/denver"
            element={<Navigate to="/denver-seo-agency" replace />}
          />
          <Route path="/:city" element={<CountryPage />} />
          <Route
            path="/services/ecommerce-seo"
            element={<Navigate to="/services/e-commerce-seo" replace />}
          />
          <Route path="/services/:slug" element={<ServiceItem />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* <Route path="/industry/:slug" element={<IndustryItem />} /> */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
