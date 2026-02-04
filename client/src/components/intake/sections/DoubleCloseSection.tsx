// Design Philosophy: Financial Minimalism
// Double Close specific section

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "../CurrencyInput";
import { FileUpload } from "../FileUpload";

interface DoubleCloseSectionProps {
  capitalRequested: number;
  escrowCompanyName: string;
  escrowCompanyContact: string;
  contractAB: File | null;
  contractBC: File | null;
  proofOfFunds: File | null;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function DoubleCloseSection({
  capitalRequested,
  escrowCompanyName,
  escrowCompanyContact,
  contractAB,
  contractBC,
  proofOfFunds,
  onChange,
  errors = {},
}: DoubleCloseSectionProps) {
  return (
    <div className="space-y-8 animate-slide-in-up">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Double Close Transaction Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Information about the simultaneous buy and sell transaction
        </p>
      </div>

      <CurrencyInput
        label="Capital Requested"
        value={capitalRequested}
        onChange={(val) => onChange("capitalRequested", val)}
        required
        error={errors.capitalRequested}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="escrowCompanyName" className="text-sm font-medium">
            Escrow Company Name (Optional)
          </Label>
          <Input
            id="escrowCompanyName"
            value={escrowCompanyName}
            onChange={(e) => onChange("escrowCompanyName", e.target.value)}
            placeholder="Ex: Chicago Title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="escrowCompanyContact" className="text-sm font-medium">
            Escrow Company Contact (Optional)
          </Label>
          <Input
            id="escrowCompanyContact"
            value={escrowCompanyContact}
            onChange={(e) => onChange("escrowCompanyContact", e.target.value)}
            placeholder="Ex: Jane Doe"
          />
        </div>
      </div>

      <div className="space-y-6">
        <FileUpload
          label="Contract A-B (Purchase)"
          value={contractAB}
          onChange={(file) => onChange("contractAB", file)}
          required
          error={errors.contractAB}
        />

        <FileUpload
          label="Contract B-C (Sale)"
          value={contractBC}
          onChange={(file) => onChange("contractBC", file)}
          error={errors.contractBC}
        />

        <FileUpload
          label="Proof of Funds"
          value={proofOfFunds}
          onChange={(file) => onChange("proofOfFunds", file)}
          error={errors.proofOfFunds}
        />
      </div>
    </div>
  );
}
