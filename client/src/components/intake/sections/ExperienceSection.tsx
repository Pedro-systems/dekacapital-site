// Design Philosophy: Financial Minimalism
// Experience and credit section (common to all types)

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ExperienceInfo, CreditScoreRange } from "@/types/intake";

interface ExperienceSectionProps {
  value: ExperienceInfo;
  onChange: (value: ExperienceInfo) => void;
  dealTypeLabel: string;
  errors?: Partial<Record<keyof ExperienceInfo, string>>;
}

const creditScoreOptions: { value: CreditScoreRange; label: string }[] = [
  { value: "under_600", label: "Under 600" },
  { value: "600_649", label: "600-649" },
  { value: "650_699", label: "650-699" },
  { value: "700_749", label: "700-749" },
  { value: "750_plus", label: "750+" },
];

export function ExperienceSection({
  value,
  onChange,
  dealTypeLabel,
  errors = {},
}: ExperienceSectionProps) {
  const handleChange = (field: keyof ExperienceInfo, val: any) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Experience and Credit
        </h3>
        <p className="text-sm text-muted-foreground">
          Information about your experience in {dealTypeLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience" className="text-sm font-medium">
            Years of Experience in {dealTypeLabel}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="yearsOfExperience"
            type="number"
            min="0"
            step="0.5"
            value={value.yearsOfExperience || ""}
            onChange={(e) =>
              handleChange("yearsOfExperience", parseFloat(e.target.value) || 0)
            }
            placeholder="Ex: 5"
            className={errors.yearsOfExperience ? "border-destructive" : ""}
          />
          {errors.yearsOfExperience && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors.yearsOfExperience}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dealsCompleted" className="text-sm font-medium">
            Number of Deals Completed{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dealsCompleted"
            type="number"
            min="0"
            value={value.dealsCompleted || ""}
            onChange={(e) =>
              handleChange("dealsCompleted", parseInt(e.target.value) || 0)
            }
            placeholder="Ex: 12"
            className={errors.dealsCompleted ? "border-destructive" : ""}
          />
          {errors.dealsCompleted && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors.dealsCompleted}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="creditScoreRange" className="text-sm font-medium">
            Credit Score Range <span className="text-destructive">*</span>
          </Label>
          <Select
            value={value.creditScoreRange}
            onValueChange={(val) =>
              handleChange("creditScoreRange", val as CreditScoreRange)
            }
          >
            <SelectTrigger
              className={errors.creditScoreRange ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              {creditScoreOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.creditScoreRange && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors.creditScoreRange}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Have you ever defaulted on a loan?{" "}
            <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={value.hasDefaulted ? "yes" : "no"}
            onValueChange={(val) => handleChange("hasDefaulted", val === "yes")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="defaulted-no" />
              <Label htmlFor="defaulted-no" className="font-normal cursor-pointer">
                No
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="defaulted-yes" />
              <Label htmlFor="defaulted-yes" className="font-normal cursor-pointer">
                Yes
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {value.hasDefaulted && (
        <div className="space-y-2 animate-slide-in-up">
          <Label htmlFor="defaultExplanation" className="text-sm font-medium">
            Default Explanation{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="defaultExplanation"
            value={value.defaultExplanation || ""}
            onChange={(e) => handleChange("defaultExplanation", e.target.value)}
            placeholder="Please provide a detailed explanation about the default..."
            rows={4}
            className={errors.defaultExplanation ? "border-destructive" : ""}
          />
          {errors.defaultExplanation && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors.defaultExplanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
