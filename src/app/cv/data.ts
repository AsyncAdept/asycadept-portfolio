export const cvData = {
  name: "AsycAdept",
  title: "Full Stack TypeScript Engineer",
  contact: {
    email: "contact@asycadept.com",
    location: "Available Remote (UTC)",
    website: "asycadept.com",
    linkedin: "linkedin.com/in/asycadept",
    github: "github.com/AsycAdept",
  },
  summary:
    "Full Stack TypeScript Engineer with 12+ years shipping production systems across web, mobile, and desktop. Specialized in real-time data pipelines, cross-platform architecture (React Native, Electron, Tauri), and high-performance UIs. Proven track record optimizing systems handling 10K+ events/sec and leading technical architecture for IoT platforms.",
  skills: {
    frontend: [
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "Vue",
      "RxJS",
      "State Management",
    ],
    mobile: [
      "React Native",
      "Ionic/Capacitor",
      "Mobile Architecture",
      "Biometric Auth",
    ],
    crossPlatform: ["Electron", "Tauri (Rust)", "Native Integrations"],
    backend: ["Node.js", "REST APIs", "Event-Driven Patterns", "Message Queues"],
    data: [
      "PostgreSQL",
      "MongoDB",
      "Real-time Pipelines",
      "IndexedDB",
      "WebSockets",
    ],
    tools: ["Docker", "Git", "CI/CD", "Playwright"],
  },
  experience: [
    {
      company: "Balena",
      role: "Engineer",
      period: "2020 — Present",
      highlights: [
        "Architected container-based deployment platform managing 100K+ IoT devices",
        "Built Electron-based desktop tooling for device fleet management",
        "Implemented real-time monitoring dashboards handling high-volume telemetry",
      ],
      tech: ["Docker", "TypeScript", "Electron", "Tauri", "React"],
    },
    {
      company: "Liknme",
      role: "Consultant / Tech Lead",
      period: "2017 — 2020",
      highlights: [
        "Led architecture for citizen services platforms and enterprise tools",
        "Delivered first mobile projects using Ionic/Capacitor (iOS/Android)",
        "Defined technical direction for 5+ projects across domains",
      ],
      tech: ["TypeScript", "Node.js", "Ionic", "PostgreSQL"],
    },
    {
      company: "Reputation Manager",
      role: "Full Stack Developer",
      period: "2015 — 2017",
      highlights: [
        "Built real-time social data aggregation platform (10K+ messages/min)",
        "Optimized browser-based analytics dashboards for high-frequency updates",
        "Implemented data ingestion pipelines from multiple external APIs",
      ],
      tech: ["JavaScript", "Angular", "C++", "Real-time Systems"],
    },
    {
      company: "FWR / Snappin",
      role: "Frontend Developer",
      period: "2012 — 2015",
      highlights: [
        "Co-built digital signage product using Raspberry Pi and custom CMS",
        "Architected UI for embedded touch displays and large-format screens",
        "Developed device-to-server communication protocols",
      ],
      tech: ["Node.js", "JavaScript", "Angular", "HTML/CSS"],
    },
  ],
  projects: [
    {
      title: "Targeted Messaging Platform",
      challenge: "Ingest and process 10K+ contact records/minute with deduplication",
      solution:
        "Streaming CSV/XML ingestion with queue-based processing and rate limiting",
      impact: "40% processing time reduction, scalable campaign execution",
    },
    {
      title: "Real-Time Social Firehose Dashboard",
      challenge: "Handle 50K+ messages/sec in browser without memory bloat",
      solution:
        "Sliding window model with IndexedDB buffering and batched UI updates",
      impact: "60% memory reduction, maintained 60fps under peak load",
    },
    {
      title: "Cross-Platform Mobile Banking (Ionic/React)",
      challenge: "Deliver iOS/Android banking app with native-quality UX",
      solution:
        "Ionic/Capacitor architecture with secure storage and biometric auth",
      impact: "4.6★ app store rating, 40% faster time-to-market vs native",
    },
  ],
};
