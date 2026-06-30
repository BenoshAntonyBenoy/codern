// ────────────────────────────────────────────────────────────────────────────
// SEED COURSES — initial catalogue loaded into localStorage on first visit.
// To add/remove courses at runtime, use the admin panel (/admin/login).
// To change the *initial* set permanently, edit this file.
// ────────────────────────────────────────────────────────────────────────────

export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationHours: number;
  lessons: number;
  priceUsd: number;
  originalPriceUsd?: number;
  rating: number;
  reviews: number;
  instructor: string;
  instructorRole: string;
  image: string;
  highlights: string[];
  description: string;
  featured?: boolean;
  createdAt: string;
};

export const categories: { name: string; icon: string; description: string }[] =
  [
    {
      name: "Web Development",
      icon: "Globe2",
      description: "HTML, CSS, JavaScript, React, Next.js, full-stack",
    },
    {
      name: "Data Science",
      icon: "BarChart3",
      description: "Python, pandas, SQL, statistics, visualisation",
    },
    {
      name: "AI & Machine Learning",
      icon: "BrainCircuit",
      description: "Deep learning, LLMs, computer vision, MLOps",
    },
    {
      name: "Mobile Development",
      icon: "Smartphone",
      description: "iOS, Android, React Native, Flutter",
    },
    {
      name: "Cloud & DevOps",
      icon: "Cloud",
      description: "AWS, Docker, Kubernetes, CI/CD, Terraform",
    },
    {
      name: "Cybersecurity",
      icon: "ShieldCheck",
      description: "Network security, pentesting, SOC, ethical hacking",
    },
    {
      name: "Programming Languages",
      icon: "Code2",
      description: "Python, Go, Rust, TypeScript, Java, C++",
    },
    {
      name: "Game Development",
      icon: "Gamepad2",
      description: "Unity, Unreal Engine, Godot, game design",
    },
  ];

export const seedCourses: Course[] = [
  {
    id: "c-001",
    slug: "the-complete-web-developer-2026",
    title: "The Complete Web Developer in 2026",
    subtitle: "Zero to full-stack engineer — HTML, CSS, JS, React, Node",
    category: "Web Development",
    level: "Beginner",
    durationHours: 62,
    lessons: 412,
    priceUsd: 89,
    originalPriceUsd: 199,
    rating: 4.9,
    reviews: 18420,
    instructor: "Hannah Reyes",
    instructorRole: "Staff Engineer, Vercel",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=600&fit=crop",
    highlights: [
      "Build 8 production-grade projects",
      "Deploy with Vercel & Railway",
      "Modern React (Hooks, RSC, Suspense)",
      "Certificate of completion",
    ],
    description:
      "Start from the absolute basics and finish ready to apply for junior full-stack roles. Every module ships a project you can put on GitHub.",
    featured: true,
    createdAt: "2026-01-12",
  },
  {
    id: "c-002",
    slug: "python-for-data-science-bootcamp",
    title: "Python for Data Science Bootcamp",
    subtitle: "pandas, NumPy, matplotlib, scikit-learn — by example",
    category: "Data Science",
    level: "Beginner",
    durationHours: 48,
    lessons: 286,
    priceUsd: 79,
    originalPriceUsd: 159,
    rating: 4.8,
    reviews: 12030,
    instructor: "Dr. Anil Sharma",
    instructorRole: "Senior Data Scientist, Atlassian",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop",
    highlights: [
      "Hands-on with 5 real datasets",
      "Pandas, NumPy, Matplotlib mastery",
      "Intro to ML with scikit-learn",
      "Jupyter notebooks for every lesson",
    ],
    description:
      "Learn Python the way data teams actually use it. Work with messy CSVs, build dashboards, train your first model — all in Jupyter.",
    featured: true,
    createdAt: "2026-01-08",
  },
  {
    id: "c-003",
    slug: "machine-learning-with-pytorch",
    title: "Deep Learning with PyTorch",
    subtitle: "From tensors to transformers — production-ready ML",
    category: "AI & Machine Learning",
    level: "Intermediate",
    durationHours: 56,
    lessons: 312,
    priceUsd: 119,
    originalPriceUsd: 229,
    rating: 4.9,
    reviews: 7641,
    instructor: "Lin Zhao",
    instructorRole: "Research Scientist, Meta AI",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&h=600&fit=crop",
    highlights: [
      "Build a transformer from scratch",
      "Fine-tune open-source LLMs",
      "Deploy models with TorchServe",
      "Real-world MLOps patterns",
    ],
    description:
      "A practical, code-first deep learning course. By the end you'll have trained, fine-tuned, and deployed neural networks for vision and language.",
    featured: true,
    createdAt: "2026-01-21",
  },
  {
    id: "c-004",
    slug: "react-native-mobile-apps",
    title: "React Native — Cross-Platform Mobile Apps",
    subtitle: "Build & ship iOS + Android apps with one codebase",
    category: "Mobile Development",
    level: "Intermediate",
    durationHours: 38,
    lessons: 198,
    priceUsd: 89,
    rating: 4.7,
    reviews: 5320,
    instructor: "Carlos Martín",
    instructorRole: "Mobile Lead, Shopify",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=600&fit=crop",
    highlights: [
      "Expo router & native modules",
      "Publish to App Store + Play Store",
      "Push notifications & deep links",
      "3 portfolio apps",
    ],
    description:
      "Move from web React to mobile React Native, ship two real apps to both stores, and learn the platform quirks that tutorials skip.",
    createdAt: "2026-02-02",
  },
  {
    id: "c-005",
    slug: "aws-cloud-practitioner-to-saa",
    title: "AWS — Cloud Practitioner to Solutions Architect",
    subtitle: "Pass two certifications and architect real systems",
    category: "Cloud & DevOps",
    level: "Intermediate",
    durationHours: 52,
    lessons: 268,
    priceUsd: 99,
    originalPriceUsd: 179,
    rating: 4.8,
    reviews: 9410,
    instructor: "Robert Olufemi",
    instructorRole: "Principal SA, AWS (ex)",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=600&fit=crop",
    highlights: [
      "300+ exam-style questions",
      "Hands-on labs with the free tier",
      "Architecture deep dives",
      "Two cert prep paths",
    ],
    description:
      "Whether you're going for the Cloud Practitioner or the Solutions Architect Associate, this course covers both with hands-on labs.",
    createdAt: "2026-01-30",
  },
  {
    id: "c-006",
    slug: "ethical-hacking-bootcamp",
    title: "Ethical Hacking & Penetration Testing",
    subtitle: "Network, web, and Active Directory pentesting",
    category: "Cybersecurity",
    level: "Intermediate",
    durationHours: 44,
    lessons: 224,
    priceUsd: 109,
    rating: 4.8,
    reviews: 6210,
    instructor: "Eliza Park",
    instructorRole: "Senior Pentester, Bishop Fox",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&h=600&fit=crop",
    highlights: [
      "Kali Linux toolchain",
      "OWASP Top 10 in depth",
      "AD attack chains",
      "OSCP-style lab reports",
    ],
    description:
      "An ethical, lab-based intro to professional penetration testing. You'll attack realistic networks and write the report a client would receive.",
    createdAt: "2026-02-10",
  },
  {
    id: "c-007",
    slug: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    subtitle: "Generics, types as values, and the type system at the limit",
    category: "Programming Languages",
    level: "Advanced",
    durationHours: 22,
    lessons: 124,
    priceUsd: 69,
    rating: 4.9,
    reviews: 4320,
    instructor: "Sofia Albrecht",
    instructorRole: "TS team contributor",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop",
    highlights: [
      "Conditional & mapped types",
      "Type-level programming",
      "Library author patterns",
      "Real-world refactors",
    ],
    description:
      "For developers who already use TypeScript daily and want to understand why their types behave the way they do.",
    createdAt: "2026-02-14",
  },
  {
    id: "c-008",
    slug: "unity-game-dev-2d",
    title: "Unity 2D — Build Your First Indie Game",
    subtitle: "Sprites, physics, audio, polish, and Steam release",
    category: "Game Development",
    level: "Beginner",
    durationHours: 34,
    lessons: 178,
    priceUsd: 79,
    rating: 4.7,
    reviews: 3815,
    instructor: "Jonas Lindqvist",
    instructorRole: "Indie dev, Hollow Knight contributor",
    image:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=900&h=600&fit=crop",
    highlights: [
      "Complete platformer end-to-end",
      "Tilemaps, animation, audio",
      "Save systems & menus",
      "Submission to Steam",
    ],
    description:
      "Learn Unity by building one complete 2D platformer from blank project to Steam page. No prior C# experience needed.",
    createdAt: "2026-02-18",
  },
  {
    id: "c-009",
    slug: "docker-kubernetes-for-developers",
    title: "Docker & Kubernetes for Developers",
    subtitle: "Containerize, orchestrate, and ship to production",
    category: "Cloud & DevOps",
    level: "Intermediate",
    durationHours: 28,
    lessons: 152,
    priceUsd: 79,
    rating: 4.8,
    reviews: 7102,
    instructor: "Devon Tate",
    instructorRole: "Platform Eng, Stripe",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=900&h=600&fit=crop",
    highlights: [
      "Multi-stage Dockerfiles",
      "K8s objects from scratch",
      "Helm charts & GitOps",
      "Run a real cluster on Civo",
    ],
    description:
      "Containers and orchestration explained for developers — no ops background required.",
    createdAt: "2026-02-22",
  },
  {
    id: "c-010",
    slug: "go-from-zero-to-microservices",
    title: "Go — From Zero to Microservices",
    subtitle: "Idiomatic Go and gRPC services that scale",
    category: "Programming Languages",
    level: "Intermediate",
    durationHours: 30,
    lessons: 168,
    priceUsd: 79,
    rating: 4.8,
    reviews: 4905,
    instructor: "Yuki Tanaka",
    instructorRole: "Backend Lead, Cloudflare",
    image:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=900&h=600&fit=crop",
    highlights: [
      "Concurrency patterns done right",
      "gRPC + protobuf",
      "Observability with OTel",
      "Production deployment",
    ],
    description:
      "A practical Go course aimed at developers from other backend languages. End the course with a deployed microservices project.",
    createdAt: "2026-02-26",
  },
  {
    id: "c-011",
    slug: "llm-app-engineering",
    title: "LLM App Engineering",
    subtitle: "RAG, agents, evals, and shipping AI features in production",
    category: "AI & Machine Learning",
    level: "Intermediate",
    durationHours: 26,
    lessons: 142,
    priceUsd: 119,
    rating: 4.9,
    reviews: 3240,
    instructor: "Ravi Krishnan",
    instructorRole: "Founding Eng, Perplexity",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&h=600&fit=crop",
    highlights: [
      "RAG that actually works",
      "Agentic patterns & tool use",
      "Eval harnesses for AI",
      "Production cost optimization",
    ],
    description:
      "An engineering-first course on building real LLM apps — not prompt-hacking, not slideware.",
    featured: true,
    createdAt: "2026-03-03",
  },
  {
    id: "c-012",
    slug: "sql-mastery",
    title: "SQL Mastery — Postgres Edition",
    subtitle: "Window functions, CTEs, indexes, query planning",
    category: "Data Science",
    level: "Intermediate",
    durationHours: 18,
    lessons: 96,
    priceUsd: 59,
    rating: 4.9,
    reviews: 8120,
    instructor: "Mei Lin",
    instructorRole: "DBA, Snowflake (ex)",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&h=600&fit=crop",
    highlights: [
      "Advanced SQL patterns",
      "Query optimization",
      "Real Postgres internals",
      "Interview-style problem sets",
    ],
    description:
      "Stop writing SQL by trial and error. Understand the planner, write set-based queries, and ace data-eng interviews.",
    createdAt: "2026-03-07",
  },
];
