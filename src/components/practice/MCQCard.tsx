"use client";

import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { MCQ } from "@/types/question";
import { CheckCircle2, XCircle } from "lucide-react";

export interface MCQCardProps {
  mcq: MCQ;
  onAnswer?: (isCorrect: boolean) => void;
  className?: string;
  key?: string | number; // Add key prop to help with reset
}

export function MCQCard({ mcq, onAnswer, className }: MCQCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Reset state when MCQ changes (using mcq.id or question as key)
  useEffect(() => {
    setSelectedIndex(null);
    setIsSubmitted(false);
    setIsCorrect(null);
  }, [mcq.question]);

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null || isSubmitted) return;
    
    const correct = selectedIndex === mcq.correctIndex;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer?.(correct);
  };

  const showResult = isSubmitted;
  const canSubmit = selectedIndex !== null && !isSubmitted;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6 text-lg sm:text-xl font-medium">{mcq.question}</div>
      <div className="space-y-3">
        {mcq.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === mcq.correctIndex;
          const isWrongSelection = isSelected && !isCorrectOption;

          let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
          if (showResult) {
            if (isCorrectOption) {
              variant = "default"; // Blue background
            } else if (isWrongSelection) {
              variant = "destructive"; // Muted red only when necessary
            }
          } else if (isSelected) {
            variant = "secondary"; // Light blue-tinted background
          }

          return (
            <Button
              key={index}
              variant={variant}
              className={cn(
                "w-full justify-start text-left h-auto py-4 px-5 transition-all duration-200",
                "hover:scale-[1.02] active:scale-[0.98]",
                !showResult && isSelected && "ring-2 ring-primary ring-offset-2",
                !showResult && isSelected && "bg-primary/5 border-primary/30",
                showResult && isCorrectOption && "bg-primary text-primary-foreground border-primary",
                showResult && isWrongSelection && "opacity-70",
                showResult && !isSelected && !isCorrectOption && "opacity-50"
              )}
              onClick={() => handleSelect(index)}
              disabled={showResult}
            >
              <span className="font-semibold mr-3 text-base">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="flex-1 text-left">{option}</span>
              {showResult && isCorrectOption && (
                <CheckCircle2 className="ml-2 h-5 w-5" />
              )}
              {showResult && isWrongSelection && (
                <XCircle className="ml-2 h-5 w-5" />
              )}
            </Button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!showResult && (
        <div className="mt-6">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full sm:w-auto min-w-[120px]"
            size="lg"
          >
            Submit Answer
          </Button>
        </div>
      )}

      {/* Feedback Message */}
      {showResult && (
        <div
          className={cn(
            "mt-6 p-4 rounded-lg border-2 animate-in fade-in slide-in-from-bottom-2 duration-300",
            isCorrect
              ? "bg-primary/10 border-primary/30 text-primary animate-pulse-success"
              : "bg-muted border-border text-foreground animate-pulse-error"
          )}
        >
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-primary">
                    Correct! ✓
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Great job! You got it right.
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    Incorrect ✗
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Don't worry, keep practicing!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Explanation */}
      {showResult && (
        <div className="mt-4 p-4 bg-muted rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
          <p className="text-sm font-medium mb-2">Explanation:</p>
          <p className="text-sm">{mcq.explanation}</p>
        </div>
      )}
    </div>
  );
}
