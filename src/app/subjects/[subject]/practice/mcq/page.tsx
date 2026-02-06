"use client";

import { notFound, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ProgressIndicator } from "@/components/practice/ProgressIndicator";
import { MCQCard } from "@/components/practice/MCQCard";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { subjects, getQuestionsBySubject } from "@/data/questions";
import { questionToMCQ } from "@/lib/question-transformers";
import type { MCQ } from "@/types/question";

export default function MCQPracticePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const router = useRouter();
  const [subjectId, setSubjectId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

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
  const mcqs: MCQ[] = questions.map((q) => questionToMCQ(q));
  const currentMCQ = mcqs[currentIndex];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnswered(false);
    }
  };

  const isLastQuestion = currentIndex === mcqs.length - 1;
  const isFirstQuestion = currentIndex === 0;

  return (
    <main className="flex-1 py-8 sm:py-12">
        <PageContainer maxWidth="2xl">
          <PracticeHeader subject={subjectId} mode="mcq" />
          
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4">
            <ProgressIndicator current={currentIndex + 1} total={mcqs.length} />
          </div>

          <div className="mb-8">
            <div className="text-sm text-muted-foreground">
              Score: {score} / {currentIndex + (answered ? 1 : 0)}
            </div>
          </div>

          {currentMCQ && (
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <MCQCard 
                key={`${currentIndex}-${currentMCQ.question}`} 
                mcq={currentMCQ} 
                onAnswer={handleAnswer} 
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
            <div className="flex gap-4">
              {!isLastQuestion ? (
                <Button onClick={handleNext} disabled={!answered}>
                  Next Question
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold mb-4">
                    Practice Complete! Final Score: {score} / {mcqs.length}
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button onClick={() => router.push(`/subjects/${subjectId}/practice`)}>
                      Try Another Mode
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentIndex(0);
                        setScore(0);
                        setAnswered(false);
                      }}
                    >
                      Restart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </PageContainer>
    </main>
  );
}
