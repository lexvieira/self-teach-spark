import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const heroButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-hero text-primary-foreground hover:shadow-growth hover:scale-105 active:scale-95",
        secondary: "bg-gradient-learning text-accent-foreground hover:shadow-learning hover:scale-105 active:scale-95",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-soft",
        wisdom: "bg-gradient-wisdom text-white hover:shadow-learning hover:scale-105 active:scale-95"
      },
      size: {
        default: "h-12 px-8 py-3",
        lg: "h-14 px-10 py-4",
        xl: "h-16 px-12 py-5"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface HeroButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heroButtonVariants> {}

const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(heroButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

HeroButton.displayName = "HeroButton";

export { HeroButton, heroButtonVariants };