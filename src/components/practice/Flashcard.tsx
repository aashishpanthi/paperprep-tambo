"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Question } from "@/types/question";

export interface FlashcardProps {
  question: Question;
  onKnow?: () => void;
  onRevise?: () => void;
  className?: string;
}

export function Flashcard({
  question,
  onKnow,
  onRevise,
  className,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div
        className="relative h-64 sm:h-80 perspective-1000 cursor-pointer"
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

      {isFlipped && (
        <div className="flex gap-4 mt-6 justify-center flex-wrap">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
              onRevise?.();
            }}
          >
            Revise Again
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
              onKnow?.();
            }}
          >
            I Know This
          </Button>
        </div>
      )}
    </div>
  );
}
