import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/question";

export interface QuestionCardProps {
  question: Question;
  className?: string;
  children?: React.ReactNode;
}

export function QuestionCard({
  question,
  className,
  children,
}: QuestionCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        {question.chapter && (
          <p className="text-sm text-muted-foreground mb-3">
            Chapter: {question.chapter}
          </p>
        )}
        <CardTitle className="text-lg sm:text-xl">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">{children}</CardContent>
    </Card>
  );
}
