import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'AsycAdept | Full Stack TypeScript Engineer',
  description:
    'Full Stack TypeScript Engineer specializing in scalable systems, real-time data, and cross-platform applications. React/Next.js, React Native, Electron/Tauri expert.',
  keywords: [
    'Full Stack Engineer',
    'TypeScript',
    'React',
    'Next.js',
    'React Native',
    'Electron',
    'Tauri',
    'Cross-platform',
  ],
  authors: [{ name: 'AsycAdept' }],
  openGraph: {
    title: 'AsycAdept | Full Stack TypeScript Engineer',
    description:
      'Full Stack TypeScript Engineer specializing in scalable systems, real-time data, and cross-platform applications.',
    type: 'website',
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
