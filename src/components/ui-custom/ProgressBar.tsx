
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  steps: number;
  currentStep: number;
  className?: string;
}

export function ProgressBar({ steps, currentStep, className }: ProgressBarProps) {
  const percentage = Math.min(Math.max(((currentStep) / (steps)) * 100, 0), 100);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between mb-1 text-xs text-muted-foreground">
        {Array.from({ length: steps }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
              i + 1 <= currentStep 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground",
              i + 1 === currentStep && "ring-2 ring-primary/20 ring-offset-2"
            )}
          >
            {i + 1}
            
            {/* Connector line, don't show for last item */}
            {i < steps - 1 && (
              <div className="absolute left-full w-full h-0.5 bg-secondary -z-10">
                <div 
                  className={cn(
                    "h-full bg-primary transition-all duration-500",
                    i + 1 < currentStep ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
