import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import ChatBot from "./components/chatbot/ChatBot";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/About"));
const SeoPackages = lazy(() => import("./pages/SeoPackages"));
const SmoPackages = lazy(() => import("./pages/SmoPackages"));
const WebPackages = lazy(() => import("./pages/WebPackages"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const CountryPage = lazy(() => import("./pages/CountryPage"));
const ServiceItem = lazy(() => import("./pages/ServiceItem"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const MM79 = lazy(() => import("./pages/MM79"));
const AeoGeo = lazy(() => import("./pages/AeoGeo"));
const SeoAiVisibility = lazy(() => import("./pages/SeoAiVisibility"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const TermsConditions = lazy(() => import("./pages/TermsCondition"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop></ScrollToTop>
        <ChatBot></ChatBot>
        {/* <CustomCursor /> */}

        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            {/* <Route path="/dropshipping" element={<Dropshipping />} /> */}
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
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;