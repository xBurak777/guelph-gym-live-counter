import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guelph Gryphons Fit & Rec — Live Gym Counter",
  description:
    "Real-time gym occupancy for the University of Guelph. Check before you go — never wait for a bench again.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
