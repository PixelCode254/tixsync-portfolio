import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { MouseGlow } from "@/components/ui/mouse-glow";
import { Analytics } from "@/components/ui/analytics";
import { Chatbot } from "@/components/ui/chatbot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cornelius Maina Nyaga | Full-Stack Developer & Security Engineer",
    template: "%s | Cornelius Maina Nyaga",
  },
  description:
    "Full-Stack Developer & Security Engineer building secure, scalable systems. Expertise in Next.js, TypeScript, PostgreSQL, penetration testing, and enterprise cybersecurity. Founder of TIXSYNC SOLUTIONS.",
  keywords: [
    "Cornelius Maina", "full-stack developer", "cybersecurity engineer",
    "penetration testing", "Next.js", "TypeScript", "security architect",
    "TIXSYNC SOLUTIONS", "Kenya", "Nairobi", "web development",
  ],
  authors: [{ name: "Cornelius Maina Nyaga" }],
  creator: "Cornelius Maina Nyaga",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://corneliusmaina.dev",
    siteName: "Cornelius Maina Nyaga",
    title: "Cornelius Maina Nyaga | Full-Stack Developer & Security Engineer",
    description: "Building secure, scalable systems. Full-Stack Development & Cybersecurity.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cornelius Maina Nyaga" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornelius Maina Nyaga | Full-Stack Developer & Security Engineer",
    description: "Building secure, scalable systems.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Cornelius Maina Nyaga",
          jobTitle: "Full-Stack Developer & Security Engineer",
    url: "https://tixsync.com",
          email: "tixsyncsolutions@gmail.com",
          telephone: "+254704440164",
          address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
          sameAs: ["https://github.com/PixelCode254", "https://linkedin.com/in/corneliusmaina", "https://twitter.com/corneliusmaina"],
          knowsAbout: ["Full-Stack Development", "Cybersecurity", "Penetration Testing", "Security Architecture", "Next.js", "TypeScript", "PostgreSQL"],
          worksFor: { "@type": "Organization", name: "TIXSYNC SOLUTIONS", url: process.env.NEXT_PUBLIC_BUSINESS_API_URL || "https://tixsyncsolutions.com" },
        })}} />
      </head>
      <body className="min-h-screen bg-obsidian-950">
        <div className="grid-bg" />
        <MouseGlow />
        <Analytics />
        <Navbar />
        <main>{children}</main>
        <Chatbot />
      </body>
    </html>
  );
}
