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
    { label: "For teams", href: "/courses?audience=teams" },
    { label: "Pricing", href: "/courses" },
  ],

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
