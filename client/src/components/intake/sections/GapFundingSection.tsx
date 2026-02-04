// Design Philosophy: Financial Minimalism
// Gap Funding specific section

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CurrencyInput } from "../CurrencyInput";
import { FileUpload } from "../FileUpload";

interface GapFundingSectionProps {
  gapAmount: number;
  hasPrimaryLender: boolean;
  primaryLenderName: string;
  primaryLenderTermSheet: File | null;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function GapFundingSection(props: GapFundingSectionProps) {
  return (
    <div className="space-y-8 animate-slide-in-up">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Gap Funding Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Information about the supplemental financing needed
        </p>
      </div>

      <CurrencyInput
        label="Gap Amount Requested"
        value={props.gapAmount}
        onChange={(val) => props.onChange("gapAmount", val)}
        required
        error={props.errors?.gapAmount}
      />

      <div className="space-y-4">
        <Label className="text-sm font-medium">
          Is there an existing primary lender? <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={props.hasPrimaryLender ? "yes" : "no"}
          onValueChange={(val) => props.onChange("hasPrimaryLender", val === "yes")}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="primary-lender-no" />
            <Label htmlFor="primary-lender-no" className="font-normal cursor-pointer">
              No
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="primary-lender-yes" />
            <Label htmlFor="primary-lender-yes" className="font-normal cursor-pointer">
              Yes
            </Label>
          </div>
        </RadioGroup>
      </div>

      {props.hasPrimaryLender && (
        <div className="space-y-6 animate-slide-in-up card-elevated p-6">
          <h4 className="font-semibold text-foreground">
            Primary Lender Information
          </h4>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Primary Lender Name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={props.primaryLenderName}
              onChange={(e) => props.onChange("primaryLenderName", e.target.value)}
              placeholder="Ex: Bank of America"
              className={props.errors?.primaryLenderName ? "border-destructive" : ""}
            />
            {props.errors?.primaryLenderName && (
              <p className="text-xs text-destructive animate-fade-in">
                {props.errors.primaryLenderName}
              </p>
            )}
          </div>

          <FileUpload
            label="Primary Lender Term Sheet"
            value={props.primaryLenderTermSheet}
            onChange={(file) => props.onChange("primaryLenderTermSheet", file)}
            error={props.errors?.primaryLenderTermSheet}
          />
        </div>
      )}
    </div>
  );
}
