"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Question } from "@/types/question";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface FlashcardProps {
  question: Question;
  onNext?: () => void;
  onPrevious?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  className?: string;
}

export function Flashcard({
  question,
  onNext,
  onPrevious,
  canGoNext = true,
  canGoPrevious = true,
  className,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoNext && onNext) {
      setIsFlipped(false);
      onNext();
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoPrevious && onPrevious) {
      setIsFlipped(false);
      onPrevious();
    }
  };

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto flex items-center gap-4 sm:gap-8", className)}>
      {/* Previous Button - Left Side */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full bg-background border-2 shadow-lg flex-shrink-0",
          "hover:bg-primary/10 hover:border-primary/30 transition-all",
          !canGoPrevious && "opacity-50 cursor-not-allowed"
        )}
        onClick={handlePrevious}
        disabled={!canGoPrevious}
      >
        <ChevronLeft className="h-6 w-6 text-primary" />
      </Button>

      {/* Flashcard */}
      <div
        className="relative flex-1 h-64 sm:h-80 perspective-1000 cursor-pointer"
        onClick={handleFlip}
      >
        <div
          className={cn(
            "relative w-full h-full preserve-3d transition-transform duration-500",
            isFlipped && "rotate-y-180"
          )}
        >
          {/* Front side */}
          <Card className="absolute w-full h-full backface-hidden border-2">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <p className="text-sm text-muted-foreground mb-4">Question</p>
              <p className="text-xl sm:text-2xl font-semibold text-center">
                {question.question}
              </p>
              {question.chapter && (
                <p className="text-xs text-muted-foreground mt-4">
                  {question.chapter}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Back side */}
          <Card className="absolute w-full h-full backface-hidden rotate-y-180 border-2">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <p className="text-sm text-muted-foreground mb-4">Answer</p>
              <p className="text-xl sm:text-2xl font-semibold text-center mb-4">
                {question.answer}
              </p>
              {question.explanation && (
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {question.explanation}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Button - Right Side */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full bg-background border-2 shadow-lg flex-shrink-0",
          "hover:bg-primary/10 hover:border-primary/30 transition-all",
          !canGoNext && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleNext}
        disabled={!canGoNext}
      >
        <ChevronRight className="h-6 w-6 text-primary" />
      </Button>
    </div>
  );
}
