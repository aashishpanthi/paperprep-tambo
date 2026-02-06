import { cn } from "@/lib/utils";

export interface ProgressIndicatorProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressIndicator({
  current,
  total,
  className,
}: ProgressIndicatorProps) {
  const percentage = (current / total) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm sm:text-base font-medium">
          Question {current} of {total}
        </span>
        <span className="text-sm sm:text-base text-muted-foreground">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 sm:h-3 overflow-hidden shadow-inner">
        <div
          className="bg-primary h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
