import { Heading } from "lucide-react";
import { Link } from "react-router-dom";

export const seoData = {
    meta: {
    title: "#1 SEO Agency in India | Increase Rankings & Traffic",

    description:
      "Partner with MakeOlix for data-driven SEO Services in India. We optimize your website to boost search rankings, drive quality traffic, and generate more leads. Contact us today!"
  },
    sections: [
      {
        type: "hero",
        data: {
          title:
            "Professional SEO Services to Boost Your Business Growth Online",
          subtitle:
            'Most businesses do not have a traffic problem. They have a "the wrong people find us, or nobody does" problem. Our SEO services fix that: we get your site in front of people who are searching for what you sell, then track whether those visits turn into leads and revenue.',
        },
      },
      {
        type: "intro",
        data: {
          paragraph:
            "MakeOlix Consulting is an India-based SEO team with a U.S. market focus. We work with startups, local businesses, online stores, and established brands. Every plan starts from your goals and your competitors, not from a template.",
        },
      },
      {
        type: "textmedia",
        data: {
          title: "What Are SEO Services?",
          description:
            'SEO services are the ongoing work of improving a website so it ranks higher on Google for searches your customers make. That includes fixing technical problems, optimizing pages and content, earning backlinks from trusted sites, and tracking what happens, so more of the right people find you and a share of them become leads or sales.\n "Ongoing" matters. Rankings move because competitors publish, Google updates, and your own site changes. A one-time fix helps for a while. A steady program keeps compounding.',
          image: "/SEO Services -Makeolix Consulting.webp",
        },
      },
      {
        type: "parallax",

        data: {
          bgImage: "/Why Do Growing Businesses Need SEO Services - Makeolix Consulting.webp",
          align: "left",
          // LEFT
          title: "Why Growing Businesses Invest in SEO Services",
          description:
            "Picture two businesses selling the same thing. One pays for every click. The day the ad budget pauses, the phone stops ringing. The other has spent a year earning rankings, and the calls keep coming at 11 p.m. on a Sunday without a dollar of new ad spend.That's the case for SEO, and it's why it suits growing companies in particular. You can compete with bigger brands without matching their ad budgets.",
          subtext: "Here's what a good SEO program does for you:",
          features: [
            "**Gets you found.** Higher rankings on Google put you in front of people who are already searching.",
            "**Attracts buyers, not browsers.** Visitors arrive with a specific need, so they're likelier to inquire or buy.",
            "**Lowers your cost per lead over time.** Paid ads stop when the money stops. Organic rankings don't.",
            "**Builds trust.** Quality content and backlinks signal credibility, which matters most in competitive U.S. markets.",
            '**Shows up in "near me" searches.** For service businesses, local visibility often decides who gets the call.',
            "**Gives you data.** You see what's working: rankings, traffic, user behavior, and conversions.",
          ],
        },
      },

     
      {
        type: "services",
        data: {
          heading: "SEO Services We Provide",
          subheading:
            "You can hire us for one service or combine several. Most clients start with an audit, then pick what the audit says matters.",
          services: [
            {
              id: "1",
              title: "E-commerce SEO",
              description:
                "We optimize product pages, category pages, and the path to checkout. For stores, the big wins usually come from category pages and fixing duplicate or thin product pages.\n [ See our ecommerce SEO service.|/services/e-commerce-seo/]",
    image: "/Servicesglance/Ecommerce seo - Makeolix consulting.webp",
            },
            {
              id: "2",
              title: "Technical SEO",
              description:
                "Slow pages, indexing errors, broken links, poor mobile layout. Google can't rank what it can't crawl or what loads too slowly for people to wait. We find the problems and fix them, including Core Web Vitals. \n [ See our technical SEO service.|/services/technical-seo]",
 image: "/Servicesglance/Technical seo - Makeolix consulting.webp",
            },
            {
              id: "3",

              title: "Local SEO",
              description:
                'We optimize your Google Business Profile, citations, and local keywords so you show up in Google Maps and "near me" searches. If your customers come from a specific city or region, our [local SEO services|/services/local-seo] are the place to begin. ',
              image: "/Servicesglance/White label seo - Makeolix Consulting.webp",
            },
            {
              id: "4",

              title: "Link building",
              description:
                "We earn backlinks from relevant, reputable sites through ethical outreach. No link farms, no bulk packages. Slower than buying links, and far safer.",
              image: "/Servicesglance/Local seo - Makeolix consulting.webp",
            },
            {
              id: "5",

              title: "AEO and GEO optimization",
              description:
                "People now ask AI tools and voice assistants questions that used to go to Google. [Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO)|/pricing/aeo+geo] structure your content so it's easier for those systems to understand, pull from, and cite. It also helps you win featured snippets.",
              image: "/Servicesglance/Link building seo - Makeolix consulting.webp",
            },
            {
              id: "6",

              title: "White-label SEO",
              description:
                "Run an agency or freelance practice? Our [white-label SEO service|/services/white-label-seo] covers the SEO work behind the scenes, and you deliver it to your clients under your own brand, without hiring a team.",
              image: "/Servicesglance/AEO & GEO Optimization - Makeolix consulting.webp",
            },
            {
              id: "7",

              title: "App Store Optimization (ASO)",
              description:
                "For mobile apps, we improve titles, descriptions, keywords, and visuals on the Apple App Store and Google Play to lift visibility, downloads, and engagement.",
              image: "/Servicesglance/App store optimization - Makeolix consulting.webp",},
          ],
        },
      },
      {
        type: "steps",
        data: {
          heading: "How Our SEO Process Works",
         
          perRow: "4",
          steps: [
            {
              number: 1,
              title: "Website audit",
              body: "We review technical, on-page, and off-page issues: site speed, mobile performance, broken links, indexing, metadata, and Core Web Vitals. The initial audit is free. It's the foundation for everything else.",
            },

            {
              number: 2,
              title: "Competitor analysis",
              body: "We look at who's outranking you, what keywords they target, and where their backlinks come from. Their gaps are your openings.",
            },

            {
              number: 3,
              title: "Keyword Research",
              body: "We look for high-intent, lower-competition searches that match what you actually sell. A keyword with a thousand monthly searches and no buying intent is a vanity metric.",
            },
            {
              number: 4,
              title: "Content creation and optimization",
              body: "We write and refine pages, blog posts, and landing pages around real search intent, with the goal of ranking and converting.",
            },
            {
              number: 5,
              title: "On-Page Optimization",
              body: "Title tags, meta descriptions, headers, URLs, and content structure. Small details, but they decide whether Google understands the page and whether a searcher clicks it.",
            },

            {
              number: 6,
              title: "Off-Page Optimization",
              body: "Ethical link building to grow your authority in competitive results.",
            },

            {
              number: 7,
              title: "Google Business Profile optimization",
              body: "For businesses with local customers, we make sure your profile is accurate, active, and keyword-aware.",
            },
            {
              number: 8,
              title: "Tracking and reporting",
              body: "We monitor performance in Google Analytics and Search Console: rankings, organic traffic, user behavior, and conversions. You get regular reports, and we adjust the plan based on what the data shows.",
            },
          ],
        },
      },

      {
        type: "features",
        data: {
          heading: "Industries We Serve",
          subtext:
            "We work with businesses across the U.S. The playbook shifts by industry, because buyers search differently.",
          leftCards: [
            {
              id: 1,
              number: "01",
              title: "Small and local businesses",
              body: "Visibility in your area and more calls from people nearby.",
              icon: "⬡",
            },
            {
              id: 2,
              number: "02",
              title: "Ecommerce and retail",
              body: "Product and category rankings that lead to orders.",
              icon: "⬡",
            },
            {
              id: 3,
              number: "03",
              title: "Healthcare and medical",
              body: "Trust-focused strategies for clinics and providers, built to attract new patients.",
              icon: "⬡",
            },
            {
              id: 4,
              number: "04",
              title: "Real Estate",
              body: "Qualified leads from high-intent property searches.",
              icon: "⬡",
            },
          ],
          rightCards: [
            {
              id: 5,
              number: "05",
              title: "Legal Services",
              body: "Authority and rankings in markets where every firm is competing for the same few keywords.",
              icon: "◈",
            },
            {
              id: 6,
              number: "06",
              title: "SaaS and technology",
              body: "Organic growth and lead generation for software and tech companies.",
              icon: "◈",
            },
            {
              id: 7,
              number: "07",
              title: "Home Services",
              body: "Plumbing, HVAC, and similar trades ranking locally for more service calls.",
              icon: "◈",
            },
            {
              id: 8,
              number: "08",
              title: "Finance and Insurance",
              body: "Content and trust signals for people comparing financial options.",
              icon: "◈",
            },
          ],
        },
      },
       {
        type: "textmedia",
        data: {
          title: "How Long Do SEO Services Take to Show Results?",
          description:
            "Most businesses see noticeable improvement within 3 to 6 months. The range depends on competition in your industry, your site's age and current health, and how much needs fixing first.\n Early on, the work is mostly invisible: audits, fixes, rewrites. Then Google re-crawls, pages start to move, and traffic follows. In highly competitive U.S. markets, reaching the top spots can take longer. We'd rather build something that holds than chase a short-term spike. Be wary of any agency that promises first-page rankings in a few weeks.",
          image: "/SEO Services -Makeolix Consulting.webp",
        },
      },
       {
        type: "usp",
        data: {
          heading: "Why Choose MakeOlix Consulting",
          

          statsData: [
            {
              title: "Strategies built for your business",
              desc: "We don't reuse templates. Your industry, competitors, and goals shape the plan, whether you're a startup or an established brand.",
            },
            {
              title: "Focus on business results",
              desc: "Rankings matter only if they lead to leads and sales. We track traffic, conversions, and lead quality.",
            },
            {
              title: "Clear reporting",
              desc: "You get regular reports covering rankings, traffic, and campaign progress, plus ongoing consulting so you always know where things stand.",
            },
            {
              title: "Flexible pricing",
              desc: "Plans scale from a basic engagement to a full campaign, designed to be workable for small businesses.",
            },
            {
              title: "U.S. market knowledge, India-based team",
              desc: "We understand how U.S. customers search, and our team's location keeps costs reasonable.",
            },
            {
              title: "Everything in one place",
              desc: "Audits, technical fixes, content, and backlinks all come from one team, so the pieces fit together.",
            },
          ],
        },
      },
    
      {
        type: "faq",
        data: {
          faqs: [
            {
              id: 1,
              question: "How long does SEO take to show results?",

              answer:
                "SEO is a long-term strategy, and most businesses start seeing noticeable improvements within 3 to 6 months. However, the exact timeline depends on factors like your industry competition, website age, current SEO health, and the strategies implemented. For highly competitive markets in the U.S., it may take longer to achieve top rankings. At MakeOlix Consulting, we focus on building a strong foundation first, so your growth is sustainable and continues to improve over time rather than delivering short-term spikes.",
            },
            {
              id: 2,

              question: "Do you offer a free SEO audit?",

              answer:
                "Yes, MakeOlix Consulting provides a free initial SEO audit to help you understand your website’s current performance. This audit covers key areas like technical issues, keyword rankings, on-page optimization, and competitor insights. We also highlight growth opportunities and provide actionable recommendations so you can clearly see what’s holding your website back and how we can improve it",
            },
            {
              id: 3,

              question: "How much do SEO services cost in the USA?",

              answer:
                "SEO pricing in the U.S. varies depending on your business size, goals, competition level, and the scope of work required. Small businesses may need basic optimization, while larger or competitive niches require more advanced strategies. At MakeOlix Consulting, we offer flexible SEO Agency Pricing designed to fit different budgets while focusing on delivering strong ROI. Instead of a one-size-fits-all plan, we create customized packages based on your specific growth needs.",
            },
            {
              id: 4,
              question:
                "Why should I choose MakeOlix Consulting over other agencies?",

              answer:
                "MakeOlix Consulting stands out because we focus on real business results, not just rankings. While many agencies promise quick wins, we build strategies that drive consistent traffic, leads, and revenue. Our team combines global expertise with a strong understanding of the U.S. market, making us a reliable alternative to any Best SEO Company in USA. We also prioritize transparency, regular reporting, and personalized strategies so you always know how your campaign is performing.",
            },
            {
              id: 5,
              question: "Can SEO help my local business grow?",

              answer:
                "Absolutely. SEO is one of the most effective ways to grow a local business, especially with the rise of “near me” searches. With our Local SEO Services, we optimize your online presence so your business appears in local search results, Google Maps, and relevant directories. This helps you attract highly targeted customers who are actively searching for your services. Over time, this leads to increased website traffic, more inquiries, and higher conversions from your local area.",
            },
          ],
        },
      },
    ],
  
}
 