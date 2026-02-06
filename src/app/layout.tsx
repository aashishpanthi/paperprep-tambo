import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PaperPrep - Interactive Exam Preparation Platform",
  description: "Transform your exam preparation from static PDFs into interactive learning experiences. Practice with MCQs, flashcards, fill-in-the-blanks, and AI-powered chat tutoring for students in Nepal.",
  keywords: ["exam preparation", "Nepal", "MCQ practice", "flashcards", "AI tutoring", "interactive learning", "education"],
  authors: [{ name: "PaperPrep" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "PaperPrep - Interactive Exam Preparation Platform",
    description: "Transform your exam preparation from static PDFs into interactive learning experiences. Practice with MCQs, flashcards, fill-in-the-blanks, and AI-powered chat tutoring.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperPrep - Interactive Exam Preparation Platform",
    description: "Transform your exam preparation from static PDFs into interactive learning experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
