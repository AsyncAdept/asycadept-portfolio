"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Command = {
  input: string;
  output: React.ReactNode;
};

const commands: Record<string, React.ReactNode> = {
  help: (
    <div className="space-y-1">
      <p className="text-cyan-400">Available commands:</p>
      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
        <span className="text-muted-foreground">help — show commands</span>
        <span className="text-muted-foreground">about — about me</span>
        <span className="text-muted-foreground">skills — my skills</span>
        <span className="text-muted-foreground">timeline — career</span>
        <span className="text-muted-foreground">projects — projects</span>
        <span className="text-muted-foreground">cv — download CV</span>
        <span className="text-muted-foreground">contact — contact</span>
        <span className="text-muted-foreground">clear — clear terminal</span>
      </div>
    </div>
  ),
  about: (
    <div className="space-y-2">
      <p className="text-cyan-400 font-bold">AsycAdept — Full Stack TypeScript Engineer</p>
      <p className="text-sm text-muted-foreground">
        I design and ship production systems across web, mobile, and desktop.
        From complex frontend state management to APIs, data modeling, and
        real-time pipelines — I handle the full stack.
      </p>
      <p className="text-sm text-muted-foreground">
        Specializing in React/Next.js, React Native, Electron/Tauri, and
        scalable data systems.
      </p>
    </div>
  ),
  skills: (
    <div className="space-y-2">
      <p className="text-cyan-400 font-bold">Technical Skills</p>
      <div className="flex flex-wrap gap-2">
        {[
          "TypeScript",
          "React",
          "Next.js",
          "React Native",
          "Angular",
          "Vue",
          "Node.js",
          "Electron",
          "Tauri",
          "PostgreSQL",
          "MongoDB",
          "Docker",
        ].map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-secondary rounded text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  ),
  timeline: (
    <div className="space-y-2 text-sm">
      <p className="text-cyan-400 font-bold">Career Timeline</p>
      <p className="text-muted-foreground">2020 — Present: Engineer @ Balena</p>
      <p className="text-muted-foreground">2017 — 2020: Consultant/Tech Lead @ Liknme</p>
      <p className="text-muted-foreground">2015 — 2017: Full Stack Dev @ Reputation Manager</p>
      <p className="text-muted-foreground">2012 — 2015: Frontend Dev @ FWR/Snappin</p>
    </div>
  ),
  projects: (
    <div className="space-y-2 text-sm">
      <p className="text-cyan-400 font-bold">Featured Projects</p>
      <p className="text-muted-foreground">1. Targeted Messaging Platform</p>
      <p className="text-muted-foreground">2. Real-Time Social Firehose</p>
      <p className="text-muted-foreground">3. AutoUI Generator</p>
      <p className="text-muted-foreground">4. Cross-Platform Mobile Banking</p>
      <p className="text-cyan-400 mt-2">Type &apos;project &lt;id&gt;&apos; for details</p>
    </div>
  ),
  cv: (
    <div className="space-y-2">
      <p className="text-cyan-400">Opening CV PDF...</p>
      <p className="text-sm text-muted-foreground">
        <a href="/cv" className="underline" target="_blank">
          /cv
        </a>
      </p>
    </div>
  ),
  contact: (
    <div className="space-y-2">
      <p className="text-cyan-400 font-bold">Get In Touch</p>
      <p className="text-sm text-muted-foreground">Email: contact@asycadept.com</p>
      <p className="text-sm text-muted-foreground">
        Or use the contact form at the bottom of the page.
      </p>
    </div>
  ),
};

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([
    {
      input: "help",
      output: commands.help,
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (cmd.startsWith("project ")) {
      const id = cmd.split(" ")[1];
      const projectDetails: Record<string, React.ReactNode> = {
        messaging: (
          <div className="space-y-1 text-sm">
            <p className="text-cyan-400 font-bold">Targeted Messaging Platform</p>
            <p className="text-muted-foreground">High-Volume Campaigns system</p>
            <p className="text-muted-foreground">10K+ messages/minute throughput</p>
            <p className="text-muted-foreground">40% processing time reduction</p>
          </div>
        ),
        firehose: (
          <div className="space-y-1 text-sm">
            <p className="text-cyan-400 font-bold">Real-Time Social Firehose</p>
            <p className="text-muted-foreground">Peak Event Traffic dashboard</p>
            <p className="text-muted-foreground">50K+ messages/sec handled</p>
            <p className="text-muted-foreground">60% memory reduction</p>
          </div>
        ),
        autoui: (
          <div className="space-y-1 text-sm">
            <p className="text-cyan-400 font-bold">AutoUI Generator</p>
            <p className="text-muted-foreground">JSON Schema-Driven UI</p>
            <p className="text-muted-foreground">70% faster CRUD development</p>
            <p className="text-muted-foreground">Web + mobile output</p>
          </div>
        ),
        "mobile-banking": (
          <div className="space-y-1 text-sm">
            <p className="text-cyan-400 font-bold">Mobile Banking App</p>
            <p className="text-muted-foreground">Ionic/React cross-platform</p>
            <p className="text-muted-foreground">50K+ users served</p>
            <p className="text-muted-foreground">4.6★ app store rating</p>
          </div>
        ),
      };
      setHistory([
        ...history,
        { input, output: projectDetails[id] || <p>Project not found</p> },
      ]);
    } else {
      setHistory([
        ...history,
        {
          input,
          output: commands[cmd] || (
            <p className="text-red-400">Command not found. Type &apos;help&apos; for available commands.</p>
          ),
        },
      ]);
    }

    setInput("");
    setCurrentIndex(history.length + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(prevIndex);
      if (history[prevIndex]) {
        setInput(history[prevIndex].input);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = Math.min(history.length, currentIndex + 1);
      setCurrentIndex(nextIndex);
      setInput("");
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 bg-primary/90 hover:bg-primary glow-cyan-sm"
        size="icon"
      >
        <TerminalIcon className="w-6 h-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-lg"
          >
            <Card className="bg-background/95 backdrop-blur border-border shadow-2xl">
              <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground ml-2 font-mono">
                    asycadept@portfolio
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 h-80 overflow-y-auto font-mono text-sm">
                <div className="space-y-2">
                  {history.map((cmd, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">$</span>
                        <span className="text-foreground">{cmd.input}</span>
                      </div>
                      <div className="ml-4 text-muted-foreground">
                        {cmd.output}
                      </div>
                    </div>
                  ))}
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-cyan-400">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent border-none outline-none text-foreground"
                      autoFocus
                    />
                  </form>
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
