import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AsycAdept | Full Stack TypeScript Engineer",
  description:
    "Full Stack TypeScript Engineer specializing in scalable systems, real-time data, and cross-platform applications. React/Next.js, React Native, Electron/Tauri expert.",
  keywords: [
    "Full Stack Engineer",
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "Electron",
    "Tauri",
    "Cross-platform",
  ],
  authors: [{ name: "AsycAdept" }],
  openGraph: {
    title: "AsycAdept | Full Stack TypeScript Engineer",
    description:
      "Full Stack TypeScript Engineer specializing in scalable systems, real-time data, and cross-platform applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
