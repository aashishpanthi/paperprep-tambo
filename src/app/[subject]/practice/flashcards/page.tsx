"use client";

import { notFound, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ProgressIndicator } from "@/components/practice/ProgressIndicator";
import { Flashcard } from "@/components/practice/Flashcard";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { subjects, getQuestionsBySubject } from "@/data/questions";

export default function FlashcardsPracticePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const router = useRouter();
  const [subjectId, setSubjectId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
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
    <main className="flex-1 py-8 sm:py-12">
        <PageContainer maxWidth="2xl">
          <PracticeHeader subject={subjectId} mode="flashcards" />
          
          <div className="mb-8">
            <ProgressIndicator current={currentIndex + 1} total={questions.length} />
          </div>

          {currentQuestion && (
            <div className="mb-8">
              <Flashcard
                question={currentQuestion}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoNext={!isLastQuestion}
                canGoPrevious={!isFirstQuestion}
              />
            </div>
          )}

          {isLastQuestion && (
            <div className="text-center mt-12">
              <p className="text-lg font-semibold mb-4">
                All flashcards reviewed!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button onClick={() => router.push(`/${subjectId}/practice`)}>
                  Try Another Mode
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentIndex(0);
                  }}
                >
                  Review Again
                </Button>
              </div>
            </div>
          )}
        </PageContainer>
    </main>
  );
}
