"use client";

import { notFound, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ProgressIndicator } from "@/components/practice/ProgressIndicator";
import { Flashcard } from "@/components/practice/Flashcard";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { subjects, getQuestionsBySubject } from "@/data/questions";
import type { Question } from "@/types/question";

export default function FlashcardsPracticePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const router = useRouter();
  const [subjectId, setSubjectId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [reviseCount, setReviseCount] = useState(0);

  useEffect(() => {
    params.then((resolved) => {
      const id = resolved.subject.toLowerCase();
      setSubjectId(id);
    });
  }, [params]);

  if (!subjectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) {
    notFound();
  }

  const questions = getQuestionsBySubject(subjectId);
  const currentQuestion = questions[currentIndex];

  const handleKnow = () => {
    setKnownCount(knownCount + 1);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRevise = () => {
    setReviseCount(reviseCount + 1);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;
  const isFirstQuestion = currentIndex === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 sm:py-12">
        <PageContainer maxWidth="2xl">
          <PracticeHeader subject={subjectId} mode="flashcards" />
          
          <div className="mb-6">
            <ProgressIndicator current={currentIndex + 1} total={questions.length} />
          </div>

          <div className="mb-6 flex gap-4 text-sm text-muted-foreground flex-wrap">
            <span>Known: {knownCount}</span>
            <span>To Revise: {reviseCount}</span>
          </div>

          {currentQuestion && (
            <div className="mb-8">
              <Flashcard
                question={currentQuestion}
                onKnow={handleKnow}
                onRevise={handleRevise}
              />
            </div>
          )}

          <div className="flex justify-between items-center gap-4 flex-wrap">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
            >
              Previous
            </Button>
            {isLastQuestion && (
              <div className="text-center">
                <p className="text-lg font-semibold mb-4">
                  All flashcards reviewed!
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button onClick={() => router.push(`/subjects/${subjectId}/practice`)}>
                    Try Another Mode
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentIndex(0);
                      setKnownCount(0);
                      setReviseCount(0);
                    }}
                  >
                    Review Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </PageContainer>
      </main>
      <Footer />
    </div>
  );
}
