// Design Philosophy: Financial Minimalism
// Deal type selector as gatekeeper question

import { Building2, Home, Hammer, Key, TrendingUp, Mountain, DollarSign } from "lucide-react";
import type { DealType } from "@/types/intake";
import type { LucideIcon } from "lucide-react";

interface DealOption {
  value: DealType;
  label: string;
  description: string;
  icon: LucideIcon;
}

const dealOptions: DealOption[] = [
  {
    value: "double_close",
    label: "Double Close",
    description: "Simultaneous buy and sell transaction",
    icon: Building2,
  },
  {
    value: "emd",
    label: "Earnest Money Deposit",
    description: "Deposit guarantee for transaction",
    icon: DollarSign,
  },
  {
    value: "fix_flip",
    label: "Fix and Flip",
    description: "Buy, renovate, and resell",
    icon: Hammer,
  },
  {
    value: "buy_hold",
    label: "Buy and Hold",
    description: "Acquisition for long-term rental",
    icon: Home,
  },
  {
    value: "gap_funding",
    label: "Gap Funding",
    description: "Supplemental financing",
    icon: TrendingUp,
  },
  {
    value: "land",
    label: "Land Funding",
    description: "Land financing",
    icon: Mountain,
  },
];

interface DealTypeSelectorProps {
  value: DealType | null;
  onChange: (value: DealType) => void;
}

export function DealTypeSelector({ value, onChange }: DealTypeSelectorProps) {
  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          What is the transaction type?
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Select the deal type to start your application
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
        {dealOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              card-elevated p-6 text-left transition-all duration-300
              hover:scale-[1.02] hover:shadow-md
              ${
                value === option.value
                  ? "ring-2 ring-primary bg-accent/50"
                  : "hover:bg-accent/30"
              }
            `}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`
                  p-3 rounded-lg transition-colors duration-300
                  ${
                    value === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }
                `}
              >
                <option.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">
                  {option.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
