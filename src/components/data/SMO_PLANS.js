// ═══════════════════════════════════════════════════════════════════════════════
// SMO PLANS — Social Media Optimization
// Inhe PricingSection me pass karo: <PricingSection plans={SMO_PLANS} title="SMO Packages" />
// ═══════════════════════════════════════════════════════════════════════════════

export const SMO_PLANS = [

  // ─── SILVER ─────────────────────────────────────────────────────────────────
  {
    planName: 'SILVER',
    currentPrice: 'Custom',
    originalPrice: null,
    period: '/ month',
    isPopular: false,
    inclusions: [
      'Monthly Creatives – 5',
      'Monthly Postings – 5',
      'Organic Promotion',
      'Analytics Tracking',
    ],
    sections: [
      {
        title: 'Organic Promotion',
        items: [
          { label: 'Competitor analysis', included: true },
          { label: 'Strategy formation', included: true },
          { label: 'Hashtag creation and promotion', included: true },
          { label: 'Monthly creative creation - 5', included: true },
          { label: 'Monthly postings - 5', included: true },
          { label: 'Analytics Tracking', included: true },
          { label: 'Account Management', included: true },
          { label: 'Engagement with active communities and groups', included: true },
          { label: 'Network build-up', included: true },
          { label: 'Engagement with third-party posts', included: true },
          { label: 'Content optimization', included: true },
        ],
      },
      {
        title: 'Paid Promotion',
        items: [
          { label: 'Budget estimate', included: false },
          { label: 'Setting up campaigns', included: false },
          { label: 'Ad creative creation', included: false },
          { label: 'Daily account optimization', included: false },
          { label: 'Setting up sales funnel for conversion objective', included: false },
          { label: 'Conversion tracking assisted by Google Analytics', included: false },
        ],
      },
      {
        title: 'Remarketing',
        items: [
          { label: 'Creation of audience lists', included: false },
          { label: 'Setting up campaigns', included: false },
          { label: 'Ad creative creation', included: false },
          { label: 'Daily account optimization', included: false },
          { label: 'Setting up sales funnel for conversion objective', included: false },
          { label: 'Conversion tracking assisted by Google Analytics', included: false },
        ],
      },
      {
        title: 'SMO Activities',
        items: [
          { label: 'Monthly report generation with insights', included: true },
          { label: "Next month's line of action", included: true },
        ],
      },
      {
        title: 'Customer Support',
        items: [
          { label: 'Email', included: true },
          { label: 'Phone', included: true },
          { label: 'Chat', included: true },
        ],
      },
    ],
  },

  // ─── GOLD ───────────────────────────────────────────────────────────────────
  {
    planName: 'GOLD',
    currentPrice: 'Custom',
    originalPrice: null,
    period: '/ month',
    isPopular: true,
    badgeText: 'Most Popular',
    inclusions: [
      'Monthly Creatives – 8',
      'Monthly Postings – 8',
      'Organic + Paid Promotion',
      'Analytics Tracking',
    ],
    sections: [
      {
        title: 'Organic Promotion',
        items: [
          { label: 'Competitor analysis', included: true },
          { label: 'Strategy formation', included: true },
          { label: 'Hashtag creation and promotion', included: true },
          { label: 'Monthly creative creation - 8', included: true },
          { label: 'Monthly postings - 8', included: true },
          { label: 'Analytics Tracking', included: true },
          { label: 'Account Management', included: true },
          { label: 'Engagement with active communities and groups', included: true },
          { label: 'Network build-up', included: true },
          { label: 'Engagement with third-party posts', included: true },
          { label: 'Content optimization', included: true },
        ],
      },
      {
        title: 'Paid Promotion',
        items: [
          { label: 'Budget estimate', included: true },
          { label: 'Setting up campaigns', included: true },
          { label: 'Ad creative creation', included: true },
          { label: 'Daily account optimization', included: true },
          { label: 'Setting up sales funnel for conversion objective', included: true },
          { label: 'Conversion tracking assisted by Google Analytics', included: true },
        ],
      },
      {
        title: 'Remarketing',
        items: [
          { label: 'Creation of audience lists', included: false },
          { label: 'Setting up campaigns', included: false },
          { label: 'Ad creative creation', included: false },
          { label: 'Daily account optimization', included: false },
          { label: 'Setting up sales funnel for conversion objective', included: false },
          { label: 'Conversion tracking assisted by Google Analytics', included: false },
        ],
      },
      {
        title: 'SMO Activities',
        items: [
          { label: 'Monthly report generation with insights', included: true },
          { label: "Next month's line of action", included: true },
        ],
      },
      {
        title: 'Customer Support',
        items: [
          { label: 'Email', included: true },
          { label: 'Phone', included: true },
          { label: 'Chat', included: true },
        ],
      },
    ],
  },

  // ─── PREMIUM ─────────────────────────────────────────────────────────────────
  {
    planName: 'PREMIUM',
    currentPrice: 'Custom',
    originalPrice: null,
    period: '/ month',
    isPopular: false,
    inclusions: [
      'Monthly Creatives – 8',
      'Monthly Postings – 8',
      'Organic + Paid + Remarketing',
      'Full Analytics Suite',
    ],
    sections: [
      {
        title: 'Organic Promotion',
        items: [
          { label: 'Competitor analysis', included: true },
          { label: 'Strategy formation', included: true },
          { label: 'Hashtag creation and promotion', included: true },
          { label: 'Monthly creative creation - 8', included: true },
          { label: 'Monthly postings - 8', included: true },
          { label: 'Analytics Tracking', included: true },
          { label: 'Account Management', included: true },
          { label: 'Engagement with active communities and groups', included: true },
          { label: 'Network build-up', included: true },
          { label: 'Engagement with third-party posts', included: true },
          { label: 'Content optimization', included: true },
        ],
      },
      {
        title: 'Paid Promotion',
        items: [
          { label: 'Budget estimate', included: true },
          { label: 'Setting up campaigns', included: true },
          { label: 'Ad creative creation', included: true },
          { label: 'Daily account optimization', included: true },
          { label: 'Setting up sales funnel for conversion objective', included: true },
          { label: 'Conversion tracking assisted by Google Analytics', included: true },
        ],
      },
      {
        title: 'Remarketing',
        items: [
          { label: 'Creation of audience lists', included: true },
          { label: 'Setting up campaigns', included: true },
          { label: 'Ad creative creation', included: true },
          { label: 'Daily account optimization', included: true },
          { label: 'Setting up sales funnel for conversion objective', included: true },
          { label: 'Conversion tracking assisted by Google Analytics', included: true },
        ],
      },
      {
        title: 'SMO Activities',
        items: [
          { label: 'Monthly report generation with insights', included: true },
          { label: "Next month's line of action", included: true },
        ],
      },
      {
        title: 'Customer Support',
        items: [
          { label: 'Email', included: true },
          { label: 'Phone', included: true },
          { label: 'Chat', included: true },
        ],
      },
    ],
  },
];