// ────────────────────────────────────────────────────────────────────────────
// SITE CONTENT — single source of truth for non-course copy.
// Edit this file to change brand, landing page, footer, and public account label.
// ────────────────────────────────────────────────────────────────────────────

export const siteContent = {
  brand: {
    name: "Codern",
    tagline: "Course storefront demo",
    description:
      "An interactive course storefront demo with a sample catalogue and browser-local cart. No courses or subscriptions are sold here.",
  },

  // Public account identifier only. The password hash stays on the server.
  admin: {
    email: "admin@codern.io",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Browse courses", href: "/courses" },
    { label: "For teams", href: "/teams" },
    { label: "Pricing", href: "/pricing" },
  ],

  pricing: {
    eyebrow: "Sample pricing",
    title: "Explore example plans.",
    subtitle:
      "Illustrative plans and prices for this demo. No payment, subscription, course access or refund service is available.",
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
        a: "No subscriptions are available. These are example plan layouts only.",
      },
      {
        q: "Can I get a refund?",
        a: "No purchases or refunds are processed by this demo.",
      },
      {
        q: "Do prices include tax?",
        a: "Prices are illustrative. There is no real checkout or tax calculation.",
      },
      {
        q: "Can I upgrade later?",
        a: "No paid plans or upgrades are provided in this demo.",
      },
    ],
  },

  teams: {
    eyebrow: "Team service concept",
    title: "Level up your entire engineering org.",
    subtitle:
      "A preview of a possible team learning service. Dashboard figures, features and companies below are illustrative; this service is not available.",
    highlights: [
      {
        icon: "Users",
        title: "Team dashboard",
        body: "Concept preview only. Progress tracking and team seats are not implemented.",
      },
      {
        icon: "ShieldCheck",
        title: "SSO & SCIM",
        body: "Proposed feature only. SSO, SCIM and team provisioning are unavailable.",
      },
      {
        icon: "BarChart3",
        title: "Custom paths",
        body: "Illustrative service idea. No custom learning plans are delivered.",
      },
      {
        icon: "Sparkles",
        title: "Mentor office hours",
        body: "Proposed feature only. No live sessions or mentoring service is offered.",
      },
    ],
    stats: [
      { label: "Example teams", value: "180+" },
      { label: "Example seats", value: "4,200" },
      { label: "Example completion", value: "92%" },
      { label: "Example NPS", value: "72" },
    ],
    logos: ["Razorpay", "Zomato", "Freshworks", "Postman", "Cred", "Groww"],
    finalCta: {
      title: "Explore the sample catalogue",
      body: "This is a service concept. Team onboarding and sales appointments are not available.",
      primary: { label: "Browse sample courses", href: "/courses" },
      secondary: { label: "See pricing", href: "/pricing" },
    },
  },

  hero: {
    eyebrow: "Interactive course storefront demo",
    title: "Build a tech career one project at a time.",
    subtitle:
      "Browse sample courses and try the catalogue and cart. This prototype does not provide lessons, student accounts or certificates.",
    primaryCta: { label: "Browse all courses", href: "/courses" },
    secondaryCta: { label: "Explore the catalogue", href: "/courses" },
    stats: [
      { label: "Catalogue", value: "Sample" },
      { label: "Cart storage", value: "Local" },
      { label: "Student accounts", value: "Off" },
      { label: "Payments", value: "Off" },
    ],
  },

  partnerLogos: ["Google", "Meta", "Microsoft", "Stripe", "Atlassian", "Shopify"],

  valueProps: [
    {
      icon: "Code2",
      title: "Sample course catalogue",
      body: "Browse fictional course descriptions and compare example topics, prices and ratings.",
    },
    {
      icon: "Users",
      title: "Example instructor profiles",
      body: "Instructor names and descriptions are sample content, with no employer affiliation claimed.",
    },
    {
      icon: "ShieldCheck",
      title: "Browser-local cart",
      body: "Try adding and removing sample courses. No purchase or certificate is provided.",
    },
    {
      icon: "Infinity",
      title: "Demo administration",
      body: "The owner can edit course data in this browser. Edits do not publish a shared catalogue.",
    },
  ],

  howItWorks: [
    {
      step: "01",
      title: "Pick your track",
      body: "Browse sample course entries across web, data, AI, mobile, cloud and security.",
    },
    {
      step: "02",
      title: "Try the cart",
      body: "Add a sample course to the browser-local cart and compare illustrative totals.",
    },
    {
      step: "03",
      title: "Explore course details",
      body: "Open a course page to see its sample outline. Lessons, certificates and hiring referrals are unavailable.",
    },
  ],

  testimonials: [
    {
      quote:
        "I went from QA tester to a frontend role in 4 months. The React track is the most practical course I've taken.",
      name: "Aanya Krishnan",
      role: "Fictional frontend learner",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face",
    },
    {
      quote:
        "The Python for Data Science course is hands-down the clearest explanation of pandas I've found anywhere.",
      name: "Marcus Wei",
      role: "Fictional data learner",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=face",
    },
    {
      quote:
        "Mentor feedback on my capstone was the difference between a tutorial project and a portfolio piece.",
      name: "Priya Menon",
      role: "Fictional backend learner",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=face",
    },
  ],

  finalCta: {
    title: "Ready to start building?",
    body: "Explore the sample catalogue. No payment, enrolment or course access is provided in this demo.",
    primary: { label: "Browse courses", href: "/courses" },
    secondary: { label: "Sign in as admin", href: "/admin/login" },
  },

  footer: {
    columns: [
      {
        title: "Learn",
        links: [
          { label: "Sample catalogue", href: "/courses" },
          { label: "Demo cart", href: "/cart" },
        ],
      },
      {
        title: "Explore the demo",
        links: [
          { label: "Team service concept", href: "/teams" },
          { label: "Sample pricing", href: "/pricing" },
        ],
      },
      {
        title: "Project",
        links: [
          { label: "Source on GitHub", href: "https://github.com/BenoshAntonyBenoy/codern" },
          { label: "Admin sign-in", href: "/admin/login" },
        ],
      },
    ],
    bottom: "© 2026 Codern. A portfolio demo with fictional course and business content.",
  },
};

export type SiteContent = typeof siteContent;
