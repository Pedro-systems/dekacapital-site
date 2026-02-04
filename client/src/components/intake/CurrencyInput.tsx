// Design Philosophy: Financial Minimalism
// Currency input with automatic formatting

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CurrencyInputProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

export function CurrencyInput({
  label,
  value,
  onChange,
  required = false,
  error,
  placeholder = "0.00",
}: CurrencyInputProps) {
  const formatCurrency = (val: string) => {
    // Remove everything except numbers
    const numbers = val.replace(/\D/g, "");
    
    if (!numbers) return "";
    
    // Convert to number and format
    const amount = parseInt(numbers) / 100;
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    const numericValue = parseFloat(formatted.replace(/,/g, "")) || 0;
    onChange(numericValue);
  };

  const displayValue = typeof value === "number" && value > 0
    ? value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "";

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          $
        </span>
        <Input
          id={label}
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`pl-7 ${error ? "border-destructive" : ""}`}
        />
      </div>
      {error && (
        <p className="text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
}
