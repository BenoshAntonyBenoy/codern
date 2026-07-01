// ────────────────────────────────────────────────────────────────────────────
// SITE CONTENT — single source of truth for non-course copy.
// Edit this file to change brand, landing page, footer, admin credentials, etc.
// ────────────────────────────────────────────────────────────────────────────

export const siteContent = {
  brand: {
    name: "Codern",
    tagline: "Master in-demand tech skills",
    description:
      "Project-based online computer courses taught by industry mentors. Build a portfolio while you learn.",
  },

  // Demo admin credentials. CHANGE THESE before any real deployment.
  admin: {
    email: "admin@codern.io",
    password: "admin123",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Browse courses", href: "/courses" },
    { label: "For teams", href: "/teams" },
    { label: "Pricing", href: "/pricing" },
  ],

  pricing: {
    eyebrow: "Pricing",
    title: "Pay once. Own it forever.",
    subtitle:
      "No subscriptions. No hidden fees. Every plan gets lifetime access and free updates.",
    tiers: [
      {
        name: "Personal",
        priceUsd: 89,
        cadence: "per course",
        description:
          "For solo learners who buy courses one at a time.",
        features: [
          "Lifetime access to any course you buy",
          "Certificate of completion",
          "Access on web, mobile, and offline",
          "30-day money-back guarantee",
        ],
        cta: { label: "Browse courses", href: "/courses" },
        featured: false,
      },
      {
        name: "All-access",
        priceUsd: 249,
        cadence: "per year",
        description:
          "Unlock the entire catalogue with one annual pass.",
        features: [
          "Every current and future course",
          "Priority mentor Q&A",
          "Verified graduate portfolio review",
          "Early access to new tracks",
          "Downloadable source code + assets",
        ],
        cta: { label: "Get All-access", href: "/courses" },
        featured: true,
      },
      {
        name: "Team",
        priceUsd: 29,
        cadence: "per seat / month",
        description:
          "For engineering teams levelling up together.",
        features: [
          "5-seat minimum, volume discounts at 25+",
          "Team dashboard & progress reports",
          "Custom learning paths",
          "SSO / SAML on request",
          "Dedicated success manager",
        ],
        cta: { label: "Contact sales", href: "/teams" },
        featured: false,
      },
    ],
    faqs: [
      {
        q: "Do I need a subscription?",
        a: "No. Personal plans are pay-per-course. All-access and Team are the only recurring plans.",
      },
      {
        q: "Can I get a refund?",
        a: "Yes — every purchase has a 30-day, no-questions-asked refund window.",
      },
      {
        q: "Do prices include tax?",
        a: "Prices are shown pre-tax. Local tax is added at checkout where applicable.",
      },
      {
        q: "Can I upgrade later?",
        a: "Yes. Anything you've already bought is credited towards an All-access upgrade.",
      },
    ],
  },

  teams: {
    eyebrow: "For teams",
    title: "Level up your entire engineering org.",
    subtitle:
      "The same project-based curriculum, delivered to your team with dashboards, custom learning paths, and mentor office hours.",
    highlights: [
      {
        icon: "Users",
        title: "Team dashboard",
        body: "See progress, streaks, and skill maps for every seat in one place.",
      },
      {
        icon: "ShieldCheck",
        title: "SSO & SCIM",
        body: "SAML, OIDC, and automated provisioning available on the Team plan.",
      },
      {
        icon: "BarChart3",
        title: "Custom paths",
        body: "We tailor a learning path to your stack — React shop, data team, platform group.",
      },
      {
        icon: "Sparkles",
        title: "Mentor office hours",
        body: "Weekly live sessions with senior engineers from top tech companies.",
      },
    ],
    stats: [
      { label: "Teams onboarded", value: "180+" },
      { label: "Seats deployed", value: "4,200" },
      { label: "Avg. completion", value: "92%" },
      { label: "NPS", value: "72" },
    ],
    logos: ["Razorpay", "Zomato", "Freshworks", "Postman", "Cred", "Groww"],
    finalCta: {
      title: "Ready to roll it out?",
      body: "Book a 20-minute call and we'll draft a pilot plan for your team.",
      primary: { label: "Book a demo", href: "mailto:sales@codern.io" },
      secondary: { label: "See pricing", href: "/pricing" },
    },
  },

  hero: {
    eyebrow: "Trusted by 250,000+ learners",
    title: "Build a tech career one project at a time.",
    subtitle:
      "Hands-on computer courses from absolute beginner to senior engineer. Pick a track, ship real projects, get a verified certificate.",
    primaryCta: { label: "Browse all courses", href: "/courses" },
    secondaryCta: { label: "Try a free lesson", href: "/courses" },
    stats: [
      { label: "Courses", value: "120+" },
      { label: "Hours of content", value: "4,800" },
      { label: "Active learners", value: "250k" },
      { label: "Avg. course rating", value: "4.8 / 5" },
    ],
  },

  partnerLogos: ["Google", "Meta", "Microsoft", "Stripe", "Atlassian", "Shopify"],

  valueProps: [
    {
      icon: "Code2",
      title: "Project-based learning",
      body: "Every course ships you a portfolio-ready project. No tutorial-hell, no toy problems.",
    },
    {
      icon: "Users",
      title: "Industry mentors",
      body: "Instructors are senior engineers at top tech companies — not full-time YouTubers.",
    },
    {
      icon: "ShieldCheck",
      title: "Verified certificates",
      body: "Earn a certificate hiring managers actually recognize, signed against your GitHub.",
    },
    {
      icon: "Infinity",
      title: "Lifetime access",
      body: "Pay once, own forever. All future updates to the course included.",
    },
  ],

  howItWorks: [
    {
      step: "01",
      title: "Pick your track",
      body: "Browse 120+ courses across web, data, AI, mobile, cloud, and security.",
    },
    {
      step: "02",
      title: "Learn by building",
      body: "Each lesson is a checkpoint towards a real project — not a passive video.",
    },
    {
      step: "03",
      title: "Ship and get hired",
      body: "Add your projects to your portfolio and use our hiring network for referrals.",
    },
  ],

  testimonials: [
    {
      quote:
        "I went from QA tester to a frontend role in 4 months. The React track is the most practical course I've taken.",
      name: "Aanya Krishnan",
      role: "Frontend Engineer at Razorpay",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face",
    },
    {
      quote:
        "The Python for Data Science course is hands-down the clearest explanation of pandas I've found anywhere.",
      name: "Marcus Wei",
      role: "Data Analyst at Atlassian",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=face",
    },
    {
      quote:
        "Mentor feedback on my capstone was the difference between a tutorial project and a portfolio piece.",
      name: "Priya Menon",
      role: "Backend Engineer at Stripe",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=face",
    },
  ],

  finalCta: {
    title: "Ready to start building?",
    body: "Join 250,000 learners shipping real projects every week. No subscription — pay once per course.",
    primary: { label: "Browse courses", href: "/courses" },
    secondary: { label: "Sign in as admin", href: "/admin/login" },
  },

  footer: {
    columns: [
      {
        title: "Learn",
        links: [
          { label: "All courses", href: "/courses" },
          { label: "Learning tracks", href: "/courses" },
          { label: "Free lessons", href: "/courses" },
          { label: "Certifications", href: "/courses" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/" },
          { label: "Mentors", href: "/" },
          { label: "Careers", href: "/" },
          { label: "Press", href: "/" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/" },
          { label: "Help center", href: "/" },
          { label: "Community", href: "/" },
          { label: "Contact", href: "/" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms", href: "/" },
          { label: "Privacy", href: "/" },
          { label: "Cookies", href: "/" },
          { label: "Refunds", href: "/" },
        ],
      },
    ],
    bottom: "© 2026 Codecourse. All rights reserved.",
  },
};

export type SiteContent = typeof siteContent;
