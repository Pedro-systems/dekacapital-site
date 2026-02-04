// Design Philosophy: Minimalismo Financeiro
// Minimalist horizontal progress bar with step indicators

import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  completed: boolean;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full py-6 md:py-8">
      <div className="flex items-center justify-between relative">
        {/* Background progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border z-0" />
        
        {/* Filled progress line */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary z-0 transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.completed;
          const isPast = step.id < currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
              style={{ flex: 1 }}
            >
              {/* Circle indicator */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 mb-2
                  ${
                    isCompleted || isPast
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-card border-2 border-border text-muted-foreground"
                  }
                `}
              >
                {isCompleted || isPast ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-xs text-center max-w-[80px] transition-colors duration-300
                  hidden sm:block
                  ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
