// Design Philosophy: Financial Minimalism
// Earnest Money Deposit specific section

import { CurrencyInput } from "../CurrencyInput";
import { FileUpload } from "../FileUpload";

interface EMDSectionProps {
  emdAmount: number;
  proofOfEMD: File | null;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function EMDSection({
  emdAmount,
  proofOfEMD,
  onChange,
  errors = {},
}: EMDSectionProps) {
  return (
    <div className="space-y-8 animate-slide-in-up">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Earnest Money Deposit Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Information about the required deposit guarantee
        </p>
      </div>

      <CurrencyInput
        label="EMD Amount Requested"
        value={emdAmount}
        onChange={(val) => onChange("emdAmount", val)}
        required
        error={errors.emdAmount}
      />

      <FileUpload
        label="EMD Requirement Proof"
        value={proofOfEMD}
        onChange={(file) => onChange("proofOfEMD", file)}
        error={errors.proofOfEMD}
      />
    </div>
  );
}
