
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "glass" | "elevated";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden transition-all duration-300",
          {
            "bg-card text-card-foreground shadow-sm border": variant === "default",
            "glass shadow-md": variant === "glass",
            "bg-white text-card-foreground shadow-xl border": variant === "elevated",
          },
          className
        )}
        {...props}
      >
        <div className="p-6">{children}</div>
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
