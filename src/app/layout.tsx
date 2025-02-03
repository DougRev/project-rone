// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Footer from "./components/Footer";

export const metadata = {
  title: "Project-Rone - Windows 95 Desktop",
  description: "A Windows 95 styled Next.js site with desktop navigation",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-win95background text-black flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
