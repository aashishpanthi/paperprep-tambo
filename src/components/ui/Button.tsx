import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer active:scale-95 hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-sm hover:shadow-md",
        destructive: "bg-muted text-foreground hover:bg-muted/80 active:bg-muted/70 border border-border",
        outline: "border-2 border-primary bg-background hover:bg-primary/5 hover:text-primary hover:border-primary active:bg-primary/10",
        secondary: "bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 active:bg-primary/15",
        ghost: "hover:bg-primary/5 hover:text-primary active:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline active:text-primary/80",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          disabled && "hover:scale-100 active:scale-100",
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
