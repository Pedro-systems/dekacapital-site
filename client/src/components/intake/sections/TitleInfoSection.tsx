// Design Philosophy: Financial Minimalism
// Title company information section (common to all types)

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TitleInfo } from "@/types/intake";

interface TitleInfoSectionProps {
  value: TitleInfo;
  onChange: (value: TitleInfo) => void;
  errors?: Partial<Record<keyof TitleInfo, string>>;
}

export function TitleInfoSection({
  value,
  onChange,
  errors = {},
}: TitleInfoSectionProps) {
  const handleChange = (field: keyof TitleInfo, val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Title Company Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Information for the company responsible for closing the transaction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="titleCompanyName" className="text-sm font-medium">
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="titleCompanyName"
            value={value.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            placeholder="Ex: First American Title"
            className={errors.companyName ? "border-destructive" : ""}
          />
          {errors.companyName && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors.companyName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="titleContactPerson" className="text-sm font-medium">
            Contact Person <span className="text-destructive">*</span>
          </Label>
          <Input
            id="titleContactPerson"
            value={value.contactPerson}
            onChange={(e) => handleChange("contactPerson", e.target.value)}
            placeholder="Ex: John Smith"
            className={errors.contactPerson ? "border-destructive" : ""}
          />
          {errors.contactPerson && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors.contactPerson}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="titlePhone" className="text-sm font-medium">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="titlePhone"
            type="tel"
            value={value.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="titleEmail" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="titleEmail"
            type="email"
            value={value.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="contact@titlecompany.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive animate-fade-in">
              {errors.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
