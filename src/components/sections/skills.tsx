"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillsData = [
  {
    category: "Frontend Engineering",
    icon: "⚛️",
    description:
      "Building performant, accessible user interfaces with modern frameworks",
    skills: [
      "JavaScript / TypeScript",
      "React / Next.js",
      "Angular / RxJS",
      "Vue / Nuxt",
      "Design Systems",
      "Performance Optimization",
    ],
  },
  {
    category: "Mobile",
    icon: "📱",
    description:
      "Delivering native-quality experiences across iOS and Android",
    skills: [
      "React Native",
      "Ionic / Capacitor",
      "Mobile Architecture",
      "Biometric Auth",
      "Offline-First",
      "App Store Deployment",
    ],
  },
  {
    category: "Cross-Platform",
    icon: "🖥️",
    description:
      "Building desktop applications that work seamlessly across platforms",
    skills: [
      "Electron",
      "Tauri (Rust)",
      "Native Integrations",
      "Shared Architecture",
      "Desktop Tooling",
      "System Tray & IPC",
    ],
  },
  {
    category: "Backend & Architecture",
    icon: "🔧",
    description: "Designing scalable APIs and event-driven systems",
    skills: [
      "Node.js / REST APIs",
      "Event-Driven Patterns",
      "Queue-Based Systems",
      "API Design",
      "Auth Patterns (OAuth/JWT)",
      "Webhooks & Integrations",
    ],
  },
  {
    category: "Data Systems",
    icon: "📊",
    description:
      "Handling data ingestion, processing, and real-time pipelines",
    skills: [
      "PostgreSQL / MySQL",
      "MongoDB",
      "Streaming Ingestion",
      "Real-time Pipelines",
      "IndexedDB",
      "WebSockets / SSE",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            Skills <span className="gradient-text">&</span> Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built over 12+ years of shipping production
            systems
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category) => (
            <motion.div key={category.category} variants={cardVariants}>
              <Card className="h-full bg-card/50 border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-cyan-500/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{category.icon}</span>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-secondary/80 hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
