"use client";

import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Question } from "@/types/question";

export interface FillBlankCardProps {
  question: Question;
  onAnswer?: (isCorrect: boolean) => void;
  className?: string;
}

export function FillBlankCard({
  question,
  onAnswer,
  className,
}: FillBlankCardProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const normalizeAnswer = (answer: string) => {
    return answer.trim().toLowerCase().replace(/\s+/g, " ");
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(question.answer);
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer ||
      normalizedCorrectAnswer.includes(normalizedUserAnswer) ||
      normalizedUserAnswer.includes(normalizedCorrectAnswer);

    setIsCorrect(correct);
    setShowResult(true);
    onAnswer?.(correct);
  };

  const handleReset = () => {
    setUserAnswer("");
    setShowResult(false);
    setIsCorrect(null);
  };

  const questionText = question.question.replace("_____", "________");

  return (
    <QuestionCard question={{ ...question, question: questionText }} className={className}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Answer:
          </label>
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={showResult}
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !showResult) {
                handleSubmit();
              }
            }}
          />
        </div>

        {!showResult ? (
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Submit Answer
          </Button>
        ) : (
          <div className="space-y-4">
            <div
              className={cn(
                "p-4 rounded-lg border-2 animate-in fade-in slide-in-from-bottom-2 duration-300",
                isCorrect
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-muted border-border text-foreground"
              )}
            >
              <p className={cn(
                "font-semibold mb-2",
                isCorrect ? "text-primary" : "text-foreground"
              )}>
                {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
              </p>
              <p className="text-sm mb-2 text-muted-foreground">
                <span className="font-medium">Your answer:</span> {userAnswer}
              </p>
              {!isCorrect && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Correct answer:</span>{" "}
                  {question.answer}
                </p>
              )}
            </div>

            {question.explanation && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Explanation:</p>
                <p className="text-sm">{question.explanation}</p>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </QuestionCard>
  );
}
