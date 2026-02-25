"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@asycadept.com", label: "Email" },
];

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 2L38 36H2L20 2Z"
                  fill="url(#footerGradient)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 12L30 32H10L20 12Z"
                  fill="hsl(var(--background))"
                />
                <defs>
                  <linearGradient
                    id="footerGradient"
                    x1="2"
                    y1="2"
                    x2="38"
                    y2="36"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-mono font-bold text-lg">AsycAdept</span>
          </div>

          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>Built with Next.js, TypeScript & Framer Motion</span>
          </div>
          <p>© {new Date().getFullYear()} AsycAdept. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
