import { cn } from "@/lib/utils";

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export function PageContainer({
  children,
  className,
  maxWidth = "xl",
}: PageContainerProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className={cn(maxWidthClasses[maxWidth], "mx-auto", className)}>
        {children}
      </div>
    </div>
  );
}
