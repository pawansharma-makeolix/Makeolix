import React from "react";
import Navbar from "../components/Navbar";
import PrivacyHero from "../components/PrivacyHero";
import BlogContent from "../components/BlogContent";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";

const PrivacyPolicy = () => {
  const privacydata = {
    blocks: [
      {
        type: "h2",
        text: "Privacy Policy",
      },
      {
        type: "para",
        text: "Welcome to MakeOlix Consulting. Your privacy is important to us, and we are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, disclose, and safeguard your information when you visit our website, use our services, or communicate with our team.",
      },
      {
        type: "para",
        text: "By accessing or using our website and services, you agree to the terms outlined in this Privacy Policy.",
      },

      {
        type: "h2",
        text: "Who We Are",
      },

      {
        type: "list",
        heading:
          "MakeOlix Consulting is a digital marketing and web solutions company providing services including:",
        items: [
          "Search Engine Optimization (SEO)",
          "AEO & GEO",
          "Website Design & Development",
          "E-commerce Development",
          "Performance Marketing",
          "Local SEO",
          "Social Media Marketing",
          "Branding & Digital Strategy",
        ],
      },

      {
        type: "para",
        text: "We work with businesses worldwide to help improve their online visibility and business growth.",
      },
      { type: "h2", text: "Information We Collect" },

      {
        type: "para",
        text: "We may collect both personal and non-personal information when you interact with our website or services.",
      },
      {
        type: "h2",
        text: "Personal Information",
      },
      {
        type: "list",
        heading: "Personal information may include:",
        items: [
          "Full name",
          "Email address",
          "Phone number",
          "Company or business name",
          "Billing or payment details",
          "Information submitted through contact forms, inquiries, or consultations",
        ],
      },
      {
        type: "h2",
        text: "Non-Personal Information",
      },
      {
        type: "list",
        heading:
          "We may automatically collect certain technical and usage-related information, including:",
        items: [
          "IP address",
          "Browser type",
          "Device information",
          "Operating system",
          "Website pages visited",
          "Time spent on pages",
          "Referral sources",
          "Website interaction data",
        ],
      },
      {
        type: "h2",
        text: "How We Collect Information",
      },

      {
        type: "list",
        heading: "We collect information through:",
        items: [
          "Website contact forms",
          "Consultation or inquiry requests",
          "Newsletter subscriptions",
          "Phone calls and email communication",
          "Cookies and tracking technologies",
          "Analytics tools",
          "Advertising and marketing platforms",
          "Third-party integrations",
        ],
      },

      {
        type: "para",
        text: "By voluntarily providing your information, you consent to its collection and use in accordance with this Privacy Policy.",
      },
      {
        type: "h2",
        text: "How We Use Your Information",
      },

      {
        type: "list",
        heading: "We may use your information for the following purposes:",
        items: [
          "To respond to inquiries and provide customer support",
          "To deliver the requested services",
          "To improve our website and user experience",
          "To analyze website traffic and marketing performance",
          "To personalize content and communications",
          "To process transactions or service requests",
          "To send updates, promotional materials, or industry insights",
          "To maintain internal business records",
          "To comply with legal obligations",
        ],
      },
      {
        type: "para",
        text: "We process personal data only where we have a lawful basis to do so, including consent, contractual necessity, legitimate business interests, or legal compliance.",
      },
      {
        type: "h2",
        text: "Cookies and Tracking Technologies",
      },
      {
        type: "para",
        text: "Our website may use cookies and similar tracking technologies to enhance your browsing experience and improve website functionality.",
      },
      {
        type: "list",
        heading: "These technologies may help us:",
        items: [
          "Understand visitor behavior",
          "Analyze website performance",
          "Measure marketing effectiveness",
          "Store user preferences",
          "Provide personalized experiences",
        ],
      },
      {
        type: "para",
        text: "You may disable cookies through your browser settings. However, certain features of the website may not function properly if cookies are disabled.",
      },
      {
        type: "h2",
        text: "Third-Party Services",
      },
      {
        type: "list",
        heading:
          "We may use trusted third-party platforms and tools to support our operations and services, including:",
        items: [
          "Google Analytics",
          "Google Ads",
          "Meta/Facebook advertising tools",
          "CRM platforms",
          "Email marketing software",
          "Payment gateways",
          "Website hosting providers",
        ],
      },
      {
        type: "para",
        text: "These providers may collect limited information necessary to perform their services. We work only with providers that maintain appropriate security and privacy standards. We are not responsible for the privacy practices of third-party websites or external services linked from our website.",
      },
      { type: "h2", text: "Data Sharing and Disclosure" },
      {
        type: "para",
        text: "MakeOlix does not sell, rent, or trade your personal information to third parties for marketing purposes.",
      },
      {
        type: "list",
        heading:
          "We may share information only in the following circumstances:",
        items: [
          "With trusted service providers assisting our operations",
          "When required by law, regulation, or legal process",
          "To protect our legal rights or prevent fraud",
          "During mergers, acquisitions, or business restructuring",
        ],
      },
      {
        type: "para",
        text: "Any shared information is limited to what is reasonably necessary for the intended purpose.",
      },
      { type: "h2", text: "Data Retention" },
      {
        type: "para",
        text: "We retain personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce agreements. When information is no longer required, we take reasonable steps to securely delete or anonymize it.",
      },
      { type: "h2", text: "Data Security" },
      {
        type: "list",
        heading:
          "We implement appropriate technical and organizational security measures to protect personal information from:",
        items: [
          "Unauthorized access",
          "Data loss",
          "Misuse ",
          "Alteration ",
          "Disclosure ",
          "Destruction ",
        ],
      },
      {
        type: "para",
        text: "Our website uses secure technologies, including SSL encryption, to help safeguard user data.While we strive to use commercially acceptable methods to protect information, no method of electronic transmission or storage is completely secure.",
      },

      { type: "h2", text: "International Data Transfers" },
      {
        type: "para",
        text: "As MakeOlix operates internationally, your information may be processed or stored in countries outside your local jurisdiction, including India and the United States.",
      },
      {
        type: "para",
        text: "By using our services, you consent to the transfer, storage, and processing of your information in accordance with this Privacy Policy and applicable laws.",
      },
      { type: "h2", text: "Your Privacy Rights" },
      {
        type: "list",
        heading:
          "Depending on your location and applicable privacy laws, you may have the right to:",
        items: [
          "Access the personal information we hold about you",
          "Request correction of inaccurate data",
          "Request deletion of your personal information",
          "Withdraw consent where processing is based on consent",
          "Object to certain processing activities",
          "Request information about how your data is used",
          "Opt out of marketing communications at any time",
        ],
      },
      {
        type: "para",
        text: "To exercise any of these rights, please contact us using the information below.",
      },
      { type: "h2", text: "Email and Marketing Communications" },
      {
        type: "list",
        heading: "If you provide your contact information, we may send:",
        items: [
          "Service-related communications",
          "Business updates",
          "Marketing emails",
          "Promotional offers",
          "Industry insights",
        ],
      },
      {
        type: "para",
        text: "You may unsubscribe from marketing emails at any time by clicking the unsubscribe link included in our communications or by contacting us directly.",
      },
      {
        type: "h2",
        text: "Children’s Privacy",
      },
      {
        type: "para",
        text: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.",
      },
      {
        type: "para",
        text: "If we become aware that information from a minor has been collected unintentionally, we will take appropriate steps to remove such information promptly.",
      },
      { type: "h2", text: "Changes to This Privacy Policy" },
      {
        type: "para",
        text: "We may update this Privacy Policy periodically to reflect changes in our practices, technologies, legal requirements, or business operations. Any updates will be posted on this page along with the revised effective date. Continued use of our website after changes are posted constitutes acceptance of the updated policy.",
      },
      { type: "h2", text: "Contact Information" },

      {
        type: "list",
        heading:
          "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:",
        items: ["Email: contactus@makeolix.com ", "Phone: +91 1204537874"],
      },
      { type: "h2", text: "Office Addresses" },

      {
        type: "list",

        items: [
          "United States Office : 8 The Green, STE B Dover, DE 19901 ",
          "India Office : Suite G-02, H-143 Sector 63, Noida, India",
        ],
      },
      {
        type: "para",
        text: "Thank you for trusting MakeOlix Consulting. We are committed to maintaining the privacy, security, and confidence of every client, visitor, and business partner we work with.",
      },
    ],
  };

  return (
    <>
      <Navbar></Navbar>
      <PrivacyHero
        badge="Privacy & Data Protection"
        heading="Our Privacy Policy"
        primaryLabel="Contact Us"
        primaryHref="/contact-us"
        secondaryLabel="Download PDF"
        pdfUrl="/Privacy Policy.pdf"
      />
      <BlogContent blocks={privacydata.blocks} />
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default PrivacyPolicy;
