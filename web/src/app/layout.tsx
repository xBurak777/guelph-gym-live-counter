import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Guelph Gryphons Fit & Rec — University of Guelph",
    template: "%s — Guelph Gryphons Fit & Rec",
  },
  description:
    "Fitness, recreation, and community programs at the University of Guelph. Real-time gym occupancy, NRG classes, personal training, aquatics, camps, and more.",
  metadataBase: new URL("https://guelph-gym-live-counter.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Guelph Gryphons Fit & Rec",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 antialiased font-sans">{children}</body>
    </html>
  );
}
