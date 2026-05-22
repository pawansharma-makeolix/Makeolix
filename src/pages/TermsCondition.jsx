import React from "react";
import PrivacyHero from "../components/PrivacyHero";
import Navbar from "../components/Navbar";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import BlogContent from "../components/BlogContent";

const termsData = {
  blocks: [
    {
      type: "h2",
      text: "MakeOlix Consulting Pvt Ltd",
    },
    {
      type: "para",
      text: "Welcome to MakeOlix. By accessing or using our website at makeolix.com or engaging with our services, you agree to the following Terms & Conditions. Please read them carefully. If you do not agree with any part of these terms, we advise you not to use our website or services.",
    },

    {
      type: "para",
      text: "Agencies keep the client relationship. The reseller handles execution. Many agencies that already offer SEO services to their direct clients use reseller partnerships to fulfill backend work efficiently while focusing on client acquisition and strategy.",
    },
    // {
    //   type: "steps",
    //   items: [
    //     {
    //       title: "Acceptance of Terms",
    //       description:
    //         "Agencies that want to expand service offerings without increasing overhead.",
    //     },

    //   ],
    // },
    {
      type: "h2",
      text: "Acceptance of Terms",
    },
    {
      type: "para",
      text: "By browsing our website, submitting a form, requesting a consultation, or engaging with MakeOlix for any service, you confirm that you have read, understood, and agreed to these Terms & Conditions.",
    },
    {
      type: "list",
      heading: "These terms apply to:",
      items: [
        "Website visitors",
        "Clients",
        "Business partners",
        "Individuals submitting inquiries or forms",
        "Anyone accessing MakeOlix digital properties",
      ],
    },

    {
      type: "para",
      text: "If you are using our services on behalf of a company or organization, you represent that you have the authority to bind that entity to these terms.",
    },
    { type: "h2", text: "About MakeOlix" },

    {
      type: "para",
      text: "MakeOlix is a digital marketing and technology solutions company providing services including, but not limited to:",
    },
    {
      type: "list",
      // heading: "You partner with a provider who handles:",
      items: [
        "Search Engine Optimization (SEO)",
        "AEO & GEO",
        "Performance Marketing",
        "Social Media Marketing",
        "Website Design & Development",
        "E-commerce Development",
        "Local SEO Services",
        "Branding & Digital Growth Solutions",
      ],
    },
    {
      type: "para",
      text: "We help businesses scale through innovative, AI-powered, and performance-driven digital strategies.",
    },

    {
      type: "h2",
      text: "Use of Our Website",
    },
    {
      type: "para",
      text: "You agree to use our website only for lawful purposes and in a way that does not violate applicable laws or regulations.",
    },
    {
      type: "list",
      heading: "You must not:",
      items: [
        "Copy, redistribute, or reproduce website content without written permission",
        "Attempt unauthorized access to our systems, servers, or networks",
        "Introduce malware, viruses, or harmful code",
        "Use our website for fraudulent or illegal activities",
        "Misrepresent your identity or business information",
        "Interfere with website functionality, security, or performance",
      ],
    },

    {
      type: "para",
      text: "MakeOlix reserves the right to restrict or terminate access to users who violate these terms.",
    },
    {
      type: "h2",
      text: "Intellectual Property Rights",
    },
    {
      type: "para",
      text: "All content available on this website, including but not limited to logos, graphics, website design, service descriptions, blogs, videos, case studies, branding materials, and digital assets, is the intellectual property of MakeOlix Consulting Pvt Ltd unless otherwise stated.",
    },
    {
      type: "para",
      text: "Unauthorized copying, modification, reproduction, distribution, or commercial use of any material is strictly prohibited without prior written consent.",
    },
    {
      type: "para",
      text: "Clients retain ownership of materials and assets provided by them. However, unless otherwise agreed in writing, MakeOlix reserves the right to showcase completed work, campaign results, client logos, and case studies in its portfolio and marketing materials.",
    },

    {
      type: "h2",
      text: "Services & Project Scope",
    },
    {
      type: "para",
      text: "MakeOlix provides customized digital marketing and development services based on client requirements.",
    },
    {
      type: "list",
      heading: "Before initiating any project:",
      items: [
        "A proposal or scope document may be shared",
        "Deliverables, timelines, and pricing will be discussed",
        "Clients are expected to provide accurate information and timely approvals",
      ],
    },
    {
      type: "para",
      text: "Any additional work requested outside the agreed scope may require revised timelines and additional charges.",
    },
    {
      type: "list",
      heading:
        "While we strive to deliver the best possible results, digital marketing outcomes may vary depending on:",
      items: [
        "Market conditions",
        "Industry competition",
        "Advertising budgets",
        "Search engine algorithm updates",
        "Platform policy changes",
        "Client participation and responsiveness",
      ],
    },
    {
      type: "para",
      text: "MakeOlix does not guarantee specific rankings, leads, sales, traffic, ROAS, or revenue outcomes.",
    },
    {
      type: "h2",
      text: "Client Responsibilities",
    },
    {
      type: "list",
      heading: "Clients agree to:",
      items: [
        "Provide timely approvals and feedback",
        "Share required credentials, access, and business information",
        "Ensure all provided content is legally authorized.",
        "Maintain active communication during project execution",
      ],
    },
    {
      type: "para",
      text: "Delays in approvals, communication, or required deliverables from the client side may impact project timelines, campaign performance, or delivery schedules. MakeOlix is not responsible for delays caused by incomplete or delayed client communication.",
    },
    { type: "h2", text: "Payments & Billing" },
    {
      type: "para",
      text: "Clients agree to pay all fees associated with selected services according to agreed payment terms.",
    },
    {
      type: "list",
      heading: "Important billing terms include:",
      items: [
        "Some services may require advance payment before work begins",
        "Delayed payments may result in project delays or suspension of services",
        "Recurring services may be billed monthly or as agreed",
        "Applicable taxes and government charges may apply",
      ],
    },
    {
      type: "para",
      text: "MakeOlix reserves the right to discontinue services for unpaid invoices or repeated payment delays.",
    },
    { type: "h2", text: "Refund & Cancellation Policy" },
    {
      type: "para",
      text: "Due to the nature of digital services, refunds are subject to specific conditions.",
    },
    {
      type: "list",
      heading:
        "Refund requests may be considered only under circumstances such as:",
      items: [
        "Failure to initiate agreed services within a reasonable timeframe",
        "Duplicate payments",
        "Internal operational issues preventing service delivery",
      ],
    },
    {
      type: "para",
      text: "Refund requests must be submitted within 15 days of the payment date.",
    },
    {
      type: "list",
      heading: "Refunds will not apply for:",
      items: [
        "Completed work or delivered milestones",
        "SEO rankings or marketing expectations were not achieved due to external factors",
        "Delays caused by a lack of client communication or approvals",
        "Change of mind after project initiation",
      ],
    },
    {
      type: "para",
      text: "If you want to discontinue ongoing services, you must provide a 30-day written notice. Services will continue during the notice period with standard billing applicable.For cancellation or refund inquiries, contact: contactus@makeolix.com  ",
    },
    { type: "h2", text: "Confidentiality" },
    {
      type: "para",
      text: "Both MakeOlix and the client agree to maintain confidentiality regarding proprietary, strategic, financial, or business information shared during the course of engagement.",
    },
    {
      type: "list",
      heading:
        "Confidential information shall not be disclosed to third parties unless:",
      items: [
        "Required by law",
        "Authorized in writing by the disclosing party",
        "Necessary for service execution through approved vendors or partners",
      ],
    },
    { type: "h2", text: "User-Submitted Information" },
    {
      type: "para",
      text: "Any information voluntarily submitted through our website,  including contact forms, consultation requests, project briefs, or inquiries, will be handled responsibly and in accordance with our Privacy Policy.",
    },
    {
      type: "list",
      heading: "By submitting information, you consent to:",
      items: [
        "Responding to inquiries",
        "Providing requested services",
        "Improving customer experience",
        "Sending service-related communications",
      ],
    },
    {
      type: "para",
      text: "You are responsible for ensuring all submitted information is accurate and lawful.",
    },
    {
      type: "h2",
      text: "Third-Party Platforms & Links",
    },
    {
      type: "list",
      heading:
        "Our website may contain links to third-party platforms such as:",
      items: [
        "Google",
        "Meta platforms",
        "Shopify",
        "WordPress",
        "Analytics tools",
        "Advertising platforms",
      ],
    },
    {
      type: "para",
      text: "MakeOlix is not responsible for the security, functionality, content, or policies of third-party websites or services. Users access third-party platforms at their own risk and should review their respective terms and privacy policies.",
    },
    { type: "h2", text: "Messaging Terms & Communication Consent" },
    {
      type: "list",
      heading:
        "By providing your contact information through our website, forms, or consultation requests, you consent to receive communications from MakeOlix, including:",
      items: [
        "Service updates",
        "Project notifications",
        "Appointment reminders",
        "Marketing messages",
        "Promotional offers",
      ],
    },
    {
      type: "list",
      heading: "Communication Channels",
      items: ["Email", "Phone calls", "SMS", "WhatsApp"],
    },
    {
      type: "list",
      heading: "Communication Channels",
      items: ["Email", "Phone calls", "SMS", "WhatsApp"],
    },
    {
      type: "steps",
      items: [
        {
          title: "Frequency",
          description: "Varies based on user activity and service engagement.",
        },
        {
          title: "Charges",
          description: "Standard carrier or messaging charges may apply.",
        },
        {
          title: "Opt-Out",
          description:
            "You can opt out of receiving promotional updates at any time by",
        },
      ],
    },
    {
      type: "list",

      items: [
        "Replying STOP to SMS messages",
        "Contacting us directly at contactus@makeolix.com",
      ],
    },
    { type: "h2", text: "Disclaimer of Warranties" },
    {
      type: "para",
      text: "All services, content, and information provided by MakeOlix are offered on an “as is” and “as available” basis without warranties of any kind, express or implied.",
    },
    {
      type: "list",
      heading:
        "MakeOlix disclaims all warranties, including but not limited to:",
      items: [
        "We do not guarantee uninterrupted website availability",
        "We do not guarantee error-free functionality",
        "We do not guarantee specific marketing or revenue outcomes",
      ],
    },
    {
      type: "para",
      text: "Digital marketing performance depends on several external variables beyond our control.",
    },
    { type: "h2", text: "Limitation of Liability" },
    {
      type: "list",
      heading:
        "To the fullest extent permitted by law, MakeOlix Consulting Pvt Ltd, its directors, employees, partners, affiliates, or agents shall not be liable for any:",
      items: [
        "Direct or indirect losses",
        "Revenue loss",
        "Data loss",
        "Business interruption",
        "Reputation damage",
        "Technical failures",
        "Consequential or incidental damages",
      ],
    },
    {
      type: "para",
      text: "arising from the use of our website, services, recommendations, or digital strategies.Clients acknowledge that business decisions made based on our strategies are undertaken at their own discretion.",
    },
    { type: "h2", text: "Changes to These Terms" },
    {
      type: "para",
      text: "MakeOlix reserves the right to update or revise these Terms & Conditions at any time without prior notice.",
    },
    {
      type: "para",
      text: "Changes become effective immediately upon publication on this page. Continued use of our website or services after updates constitutes acceptance of the revised terms. We encourage users to review this page periodically.",
    },
    { type: "h2", text: "Governing Law" },
    {
      type: "para",
      text: "These Terms & Conditions shall be governed and interpreted in accordance with the laws of India.",
    },
    {
      type: "para",
      text: "Both parties agree to first attempt to resolve disputes amicably through mutual discussion.",
    },
    {
      type: "para",
      text: "If resolution cannot be achieved, disputes shall fall under the exclusive jurisdiction of the courts located in Noida, Uttar Pradesh, India. For international clients, applicable local consumer protection laws may apply where required by law.",
    },
    { type: "h2", text: "Contact Information" },
    {
      type: "list",
      heading:
        "If you have any questions regarding these Terms & Conditions, please contact us:",
      items: [
        "Email: contactus@makeolix.com ",
        "Phone: +91 1204537874",
        "USA Office : 8 The Green, STE B Dover, DE 19901",
        "India Office : Suite G-02, H-143, Sector 63, Noida",
      ],
    },
  ],
};

const TermsCondition = () => {
  return (
    <>
      <Navbar></Navbar>
      <PrivacyHero
        badge="Terms & Conditions"
        heading="Our Terms & Conditions"
        primaryLabel="Contact Us"
        primaryHref="/contact-us"
        secondaryLabel="Download PDF"
        pdfUrl="/Terms and condition.pdf"
      />
      <BlogContent blocks={termsData.blocks} />
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default TermsCondition;
