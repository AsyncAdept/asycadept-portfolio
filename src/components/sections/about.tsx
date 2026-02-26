'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const timelineData = [
  {
    year: '2020 — Present',
    title: 'Engineer',
    company: 'Balena',
    description:
      'Working on an IoT platform focused on container-based deployment and fleet management at scale.',
    highlights: [
      'Containerized workloads (Docker)',
      'Device fleet orchestration',
      'Electron-based desktop tooling',
      'Tauri evaluation',
    ],
    tech: ['Docker', 'TypeScript', 'Electron', 'Tauri', 'Kubernetes'],
  },
  {
    year: '2017 — 2020',
    title: 'Consultant / Tech Lead',
    company: 'Liknme',
    description:
      'Led and delivered multiple projects across domains, often defining initial architecture and technical direction.',
    highlights: [
      'Citizen services platforms',
      'Tax and operational systems',
      'Internal enterprise tools',
      'First mobile projects (Ionic/Cordova)',
    ],
    tech: ['TypeScript', 'Node.js', 'SQL/NoSQL', 'Ionic', 'Angular'],
  },
  {
    year: '2015 — 2017',
    title: 'Full Stack Developer',
    company: 'Reputation Manager',
    description:
      'Worked on a platform aggregating large volumes of social data to generate sentiment and reputation insights.',
    highlights: [
      'Data ingestion from multiple APIs',
      'Real-time analytics dashboards',
      'High-volume data processing',
    ],
    tech: ['C++', 'JavaScript', 'Angular'],
  },
  {
    year: '2012 — 2015',
    title: 'Frontend Developer',
    company: 'FWR / Snappin',
    description:
      'Co-built a digital signage product using Raspberry Pi devices and a custom CMS platform.',
    highlights: [
      'UI architecture for embedded displays',
      'Device-to-server communication',
      'CMS tooling for non-technical users',
    ],
    tech: ['Node.js', 'JavaScript', 'Angular', 'HTML/CSS'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            I design and ship production systems across web, mobile, and desktop. From complex
            frontend state management to APIs, data modeling, and real-time pipelines—I handle the
            full stack.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 md:text-right pl-8 md:pl-0">
                  <Card className="bg-card/50 border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex flex-col md:items-end gap-2">
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 w-fit">
                          {item.year}
                        </Badge>
                        <CardTitle className="text-lg sm:text-xl">{item.company}</CardTitle>
                        <p className="text-primary font-mono text-sm">{item.title}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base mb-4">
                        {item.description}
                      </p>
                      <ul className="space-y-1 mb-4">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-cyan-500 mt-1">▹</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                        {item.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs bg-secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-6">
                  <div className="w-4 h-4 rounded-full bg-cyan-500 glow-cyan-sm" />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
