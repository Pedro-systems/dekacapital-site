// Design Philosophy: Financial Minimalism
// Fix and Flip specific section with conditional logic

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyInput } from "../CurrencyInput";
import { FileUpload } from "../FileUpload";
import type { ARVJustification, Comparable } from "@/types/intake";

interface FixFlipSectionProps {
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  totalRehabBudget: number;
  scopeOfWork: File | null;
  contractorEstimates: File | null;
  arvJustification: ARVJustification | "";
  comparables: Comparable[];
  holdingPeriod: number;
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  otherCosts: number;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function FixFlipSection(props: FixFlipSectionProps) {
  const handleComparableChange = (index: number, field: keyof Comparable, value: any) => {
    const newComparables = [...props.comparables];
    newComparables[index] = { ...newComparables[index], [field]: value };
    props.onChange("comparables", newComparables);
  };

  return (
    <div className="space-y-10 animate-slide-in-up">
      {/* Section: Purchase */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Purchase Details
          </h3>
          <p className="text-sm text-muted-foreground">
            Information about the property acquisition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CurrencyInput
            label="Purchase Price"
            value={props.purchasePrice}
            onChange={(val) => props.onChange("purchasePrice", val)}
            required
            error={props.errors?.purchasePrice}
          />

          <CurrencyInput
            label="Down Payment"
            value={props.downPayment}
            onChange={(val) => props.onChange("downPayment", val)}
            required
            error={props.errors?.downPayment}
          />

          <CurrencyInput
            label="Loan Amount"
            value={props.loanAmount}
            onChange={(val) => props.onChange("loanAmount", val)}
            required
            error={props.errors?.loanAmount}
          />
        </div>
      </div>

      {/* Section: Rehab Budget */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Rehab Budget
          </h3>
          <p className="text-sm text-muted-foreground">
            Details about the renovation investment
          </p>
        </div>

        <CurrencyInput
          label="Total Rehab Budget"
          value={props.totalRehabBudget}
          onChange={(val) => props.onChange("totalRehabBudget", val)}
          required
          error={props.errors?.totalRehabBudget}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Scope of Work"
            value={props.scopeOfWork}
            onChange={(file) => props.onChange("scopeOfWork", file)}
            error={props.errors?.scopeOfWork}
          />

          <FileUpload
            label="Contractor Estimates (Optional)"
            value={props.contractorEstimates}
            onChange={(file) => props.onChange("contractorEstimates", file)}
          />
        </div>
      </div>

      {/* Section: ARV */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            After Repair Value (ARV)
          </h3>
          <p className="text-sm text-muted-foreground">
            Method to justify the value after renovation
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Justification Method <span className="text-destructive">*</span>
          </Label>
          <Select
            value={props.arvJustification}
            onValueChange={(val) => props.onChange("arvJustification", val)}
          >
            <SelectTrigger className={props.errors?.arvJustification ? "border-destructive" : ""}>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="appraisal">Professional Appraisal</SelectItem>
              <SelectItem value="comparables">3 Comparable Sales</SelectItem>
              <SelectItem value="bpo">Broker Price Opinion (BPO)</SelectItem>
            </SelectContent>
          </Select>
          {props.errors?.arvJustification && (
            <p className="text-xs text-destructive animate-fade-in">
              {props.errors.arvJustification}
            </p>
          )}
        </div>

        {/* Conditional comparables */}
        {props.arvJustification === "comparables" && (
          <div className="space-y-8 animate-slide-in-up">
            {[0, 1, 2].map((index) => (
              <div key={index} className="card-elevated p-6 space-y-4">
                <h4 className="font-semibold text-foreground">
                  Comparable {index + 1}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      value={props.comparables[index]?.address || ""}
                      onChange={(e) =>
                        handleComparableChange(index, "address", e.target.value)
                      }
                      placeholder="123 Main St, City, State"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Zillow Link <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="url"
                      value={props.comparables[index]?.zillowLink || ""}
                      onChange={(e) =>
                        handleComparableChange(index, "zillowLink", e.target.value)
                      }
                      placeholder="https://zillow.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Sold Price <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        className="pl-7"
                        value={props.comparables[index]?.soldPrice || ""}
                        onChange={(e) =>
                          handleComparableChange(
                            index,
                            "soldPrice",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="250000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Sale Date <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={props.comparables[index]?.soldDate || ""}
                      onChange={(e) =>
                        handleComparableChange(index, "soldDate", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium">
                      Square Footage (sq ft) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="number"
                      value={props.comparables[index]?.squareFootage || ""}
                      onChange={(e) =>
                        handleComparableChange(
                          index,
                          "squareFootage",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="1500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section: Holding Costs */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Holding Costs
          </h3>
          <p className="text-sm text-muted-foreground">
            Expenses during renovation and sale period
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Holding Period (months) <span className="text-destructive">*</span>
            </Label>
            <Input
              type="number"
              min="1"
              value={props.holdingPeriod || ""}
              onChange={(e) =>
                props.onChange("holdingPeriod", parseInt(e.target.value) || 0)
              }
              placeholder="6"
            />
          </div>

          <CurrencyInput
            label="Property Taxes (annual)"
            value={props.propertyTaxes}
            onChange={(val) => props.onChange("propertyTaxes", val)}
            required
            error={props.errors?.propertyTaxes}
          />

          <CurrencyInput
            label="Insurance (annual)"
            value={props.insurance}
            onChange={(val) => props.onChange("insurance", val)}
            required
            error={props.errors?.insurance}
          />

          <CurrencyInput
            label="Utilities (monthly)"
            value={props.utilities}
            onChange={(val) => props.onChange("utilities", val)}
            required
            error={props.errors?.utilities}
          />

          <CurrencyInput
            label="Other Costs (monthly)"
            value={props.otherCosts}
            onChange={(val) => props.onChange("otherCosts", val)}
            required
            error={props.errors?.otherCosts}
          />
        </div>
      </div>
    </div>
  );
}
