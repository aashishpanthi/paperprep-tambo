import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export interface PracticeHeaderProps {
  subject: string;
  mode: string;
  onBack?: () => void;
}

export function PracticeHeader({ subject, mode, onBack }: PracticeHeaderProps) {
  const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
  const modeName = mode
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="flex items-center justify-between mb-8 sm:mb-10 flex-wrap gap-4">
      <div className="flex items-center space-x-4">
        {onBack ? (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        ) : (
          <Link href={`/subjects/${subject}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{subjectName}</h1>
          <p className="text-sm text-muted-foreground">{modeName} Mode</p>
        </div>
      </div>
    </div>
  );
}
