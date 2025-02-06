// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Footer from "./components/Footer";
import { Providers } from "./providers";
import ScrollingBanner from "./components/ScrollingBanner";

export const metadata = {
  title: "RoneDotCom - High Vibes and Good Times",
  description: "RoneDotCom is a place for high vibes and good times.",
  keywords: "Rone, Barstool, games, competitions, fun, entertainment",
  openGraph: {
    title: "RoneDotCom",
    description: "A fun, nostalgic site inspired by Windows 95, featuring videos, music, and more!",
    url: "https://project-rone.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/windows-95-bg.jpg",
        width: 1200,
        height: 630,
        alt: "RoneDotCom Windows 95 Themed Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "RoneDotCom",
    description: "Check out RoneDotCom for competitions, videos, and more!",
    images: ["/images/windows-95-bg.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-win95background text-black flex flex-col">
        <Providers>
        <ScrollingBanner />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
