"use client";

import { SubjectNetwork } from "@/components/home/SubjectNetwork";
import { Button } from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const scrollToSubjects = () => {
    const subjectsSection = document.getElementById("subjects-section");
    if (subjectsSection) {
      subjectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex-1">
      <section className="bg-background min-h-screen flex items-center justify-center py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-foreground">
              Prepare Smarter. Not Harder.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your exam preparation from static PDFs into interactive
              learning experiences. Practice with MCQs, flashcards, fill-in-the-blanks,
              and AI-powered chat tutoring.
            </p>
            <Button
              onClick={scrollToSubjects}
              size="lg"
              variant="ghost"
              className="group text-primary hover:!bg-transparent"
            >
              Explore Subjects
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <section id="subjects-section" className="bg-support-teal pb-12 sm:pb-16 lg:pb-20">
        <SubjectNetwork />
      </section>
    </main>
  );
}
