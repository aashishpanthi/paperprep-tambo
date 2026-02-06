"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleStartPracticing = () => {
    if (pathname === "/") {
      // If already on home page, scroll to subjects section
      const subjectsSection = document.getElementById("subjects-section");
      if (subjectsSection) {
        subjectsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home and then scroll
      router.push("/#subjects-section");
      // Wait for navigation then scroll
      setTimeout(() => {
        const subjectsSection = document.getElementById("subjects-section");
        if (subjectsSection) {
          subjectsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex h-28 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PaperPrep"
              width={120}
              height={34}
              className="h-14 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Button 
              size="sm" 
              onClick={handleStartPracticing}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md transition-all"
            >
              Start Practicing
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
