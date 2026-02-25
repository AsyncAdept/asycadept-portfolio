"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, BarChart3, MessageSquare, Smartphone, Zap, Play } from "lucide-react";
import { MessagingDemo } from "@/components/demos/messaging-demo";
import { FirehoseDemo } from "@/components/demos/firehose-demo";
import { AutoUIDemo } from "@/components/demos/autoui-demo";
import { MobileBankingDemo } from "@/components/demos/mobile-banking-demo";

const projectsData = [
  {
    id: "messaging",
    title: "Targeted Messaging Platform",
    subtitle: "High-Volume Campaigns",
    icon: MessageSquare,
    description:
      "Designed and implemented a system capable of ingesting large contact datasets and orchestrating multi-channel communication campaigns.",
    challenge:
      "Streaming ingestion and normalization of 10K+ records/minute with deduplication, rate limiting, and provider backoff strategies.",
    impact: [
      "40% processing time reduction",
      "10K+ messages/minute throughput",
      "Scalable campaign execution",
    ],
    tech: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Message Queues",
      "WebSockets",
    ],
    color: "cyan",
    hasDemo: true,
    demoComponent: MessagingDemo,
  },
  {
    id: "firehose",
    title: "Real-Time Social Firehose",
    subtitle: "Peak Event Traffic",
    icon: BarChart3,
    description:
      "Optimized a browser-based dashboard handling extremely high message rates during peak global events.",
    challenge:
      "Sliding one-hour window model, IndexedDB-backed buffering, batched UI updates, 60fps maintained under load.",
    impact: [
      "60% memory footprint reduction",
      "50K+ messages/sec handled",
      "60fps maintained",
    ],
    tech: [
      "React",
      "TypeScript",
      "IndexedDB",
      "WebSockets",
      "Real-time Charts",
    ],
    color: "blue",
    hasDemo: true,
    demoComponent: FirehoseDemo,
  },
  {
    id: "autoui",
    title: "AutoUI Generator",
    subtitle: "JSON Schema-Driven UI",
    icon: Zap,
    description:
      "Designed and prototyped a system that automatically generated UI screens from API-defined JSON Schema models.",
    challenge:
      "Schema-to-component mapping, validation inference, layout algorithms, cross-platform form generation.",
    impact: [
      "70% faster CRUD development",
      "Model-driven generation",
      "Web + mobile output",
    ],
    tech: ["TypeScript", "React", "JSON Schema", "Angular", "React Native"],
    color: "violet",
    hasDemo: true,
    demoComponent: AutoUIDemo,
  },
  {
    id: "mobile-banking",
    title: "Cross-Platform Mobile Banking",
    subtitle: "Ionic/React",
    icon: Smartphone,
    description:
      "Led frontend architecture for a hybrid mobile banking application serving 50K+ users.",
    challenge:
      "Secure storage, biometric auth, offline-first sync, shared codebase with web admin panel.",
    impact: [
      "40% faster time-to-market",
      "50K+ users served",
      "4.6★ app store rating",
    ],
    tech: ["Ionic", "React", "Capacitor", "TypeScript", "Node.js"],
    color: "emerald",
    hasDemo: true,
    demoComponent: MobileBankingDemo,
  },
];

const colorClasses: Record<string, string> = {
  cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
  blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
  emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
};

const iconColorClasses: Record<string, string> = {
  cyan: "text-cyan-400",
  blue: "text-blue-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Projects() {
  const [openDemo, setOpenDemo] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Production systems I&apos;ve architected and shipped—real solutions
            to complex engineering challenges
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projectsData.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Card
                className={`h-full bg-gradient-to-br ${colorClasses[project.color]} border transition-all hover:shadow-xl hover:shadow-cyan-500/10 group`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-lg bg-background/50 ${iconColorClasses[project.color]}`}
                      >
                        <project.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-foreground">
                      Challenge
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-foreground">
                      Impact
                    </h4>
                    <ul className="space-y-1">
                      {project.impact.map((item) => (
                        <li
                          key={item}
                          className="text-sm flex items-center gap-2"
                        >
                          <span className="text-primary">◆</span>
                          <span className="text-cyan-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.hasDemo && (
                      <Dialog open={openDemo === project.id} onOpenChange={(open) => setOpenDemo(open ? project.id : null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary/50 hover:bg-primary/20"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Demo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{project.title}</DialogTitle>
                          </DialogHeader>
                          <project.demoComponent />
                        </DialogContent>
                      </Dialog>
                    )}
                    <Button
                      variant="ghost"
                      className="group-hover:text-primary transition-colors p-0 hover:bg-transparent"
                    >
                      <a
                        href={`/projects/${project.id}`}
                        className="flex items-center gap-2"
                      >
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
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
