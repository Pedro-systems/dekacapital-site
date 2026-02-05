// Design Philosophy: Financial Minimalism
// Buy and Hold specific section with automatic calculations

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyInput } from "../CurrencyInput";
import { FileUpload } from "../FileUpload";
import type { RentalStrategy } from "@/types/intake";

interface BuyHoldSectionProps {
  rentalStrategy: RentalStrategy | "";
  isSubjectTo: boolean;
  currentLenderName: string;
  currentLoanBalance: number;
  currentMonthlyPayment: number;
  currentInterestRate: number;
  mortgageStatement: File | null;
  estimatedMonthlyRent: number;
  operatingExpenses: number;
  propertyTaxes: number;
  insurance: number;
  hoaFees: number;
  calculatedNOI: number;
  calculatedDSCR: number;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function BuyHoldSection(props: BuyHoldSectionProps) {
  // Calculate NOI automatically
  useEffect(() => {
    const annualRent = props.estimatedMonthlyRent * 12;
    const annualOperating = props.operatingExpenses * 12;
    const annualHOA = props.hoaFees * 12;
    
    const noi = annualRent - annualOperating - props.propertyTaxes - props.insurance - annualHOA;
    props.onChange("calculatedNOI", noi);
  }, [
    props.estimatedMonthlyRent,
    props.operatingExpenses,
    props.propertyTaxes,
    props.insurance,
    props.hoaFees,
  ]);

  // Calculate DSCR automatically
  useEffect(() => {
    if (props.currentMonthlyPayment > 0) {
      const annualDebtService = props.currentMonthlyPayment * 12;
      const dscr = props.calculatedNOI / annualDebtService;
      props.onChange("calculatedDSCR", dscr);
    } else {
      props.onChange("calculatedDSCR", 0);
    }
  }, [props.calculatedNOI, props.currentMonthlyPayment]);

  return (
    <div className="space-y-10 animate-slide-in-up">
      {/* Section: Property Strategy */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Rental Strategy
          </h3>
          <p className="text-sm text-muted-foreground">
            Type of rental planned for the property
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Rental Strategy <span className="text-destructive">*</span>
          </Label>
          <Select
            value={props.rentalStrategy}
            onValueChange={(val) => props.onChange("rentalStrategy", val)}
          >
            <SelectTrigger className={props.errors?.rentalStrategy ? "border-destructive" : ""}>
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="str">Short-Term Rental (STR)</SelectItem>
              <SelectItem value="ltr">Long-Term Rental (LTR)</SelectItem>
              <SelectItem value="mtr">Mid-Term Rental (MTR)</SelectItem>
              <SelectItem value="mixed">Mixed Use</SelectItem>
            </SelectContent>
          </Select>
          {props.errors?.rentalStrategy && (
            <p className="text-xs text-destructive animate-fade-in">
              {props.errors.rentalStrategy}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium">
            Is this a Subject-To transaction? <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={props.isSubjectTo ? "yes" : "no"}
            onValueChange={(val) => props.onChange("isSubjectTo", val === "yes")}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="subject-to-no" />
              <Label htmlFor="subject-to-no" className="font-normal cursor-pointer">
                No
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="subject-to-yes" />
              <Label htmlFor="subject-to-yes" className="font-normal cursor-pointer">
                Yes
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Subject-To Details */}
        {props.isSubjectTo && (
          <div className="space-y-6 animate-slide-in-up card-elevated p-6">
            <h4 className="font-semibold text-foreground">
              Current Lender Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Lender Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={props.currentLenderName}
                  onChange={(e) => props.onChange("currentLenderName", e.target.value)}
                  placeholder="Ex: Wells Fargo"
                  className={props.errors?.currentLenderName ? "border-destructive" : ""}
                />
                {props.errors?.currentLenderName && (
                  <p className="text-xs text-destructive animate-fade-in">
                    {props.errors.currentLenderName}
                  </p>
                )}
              </div>

              <CurrencyInput
                label="Current Loan Balance"
                value={props.currentLoanBalance}
                onChange={(val) => props.onChange("currentLoanBalance", val)}
                required
                error={props.errors?.currentLoanBalance}
              />

              <CurrencyInput
                label="Current Monthly Payment"
                value={props.currentMonthlyPayment}
                onChange={(val) => props.onChange("currentMonthlyPayment", val)}
                required
                error={props.errors?.currentMonthlyPayment}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Current Interest Rate (%) <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  value={props.currentInterestRate || ""}
                  onChange={(e) =>
                    props.onChange("currentInterestRate", parseFloat(e.target.value) || 0)
                  }
                  placeholder="4.5"
                  className={props.errors?.currentInterestRate ? "border-destructive" : ""}
                />
                {props.errors?.currentInterestRate && (
                  <p className="text-xs text-destructive animate-fade-in">
                    {props.errors.currentInterestRate}
                  </p>
                )}
              </div>
            </div>

            <FileUpload
              label="Current Mortgage Statement"
              value={props.mortgageStatement}
              onChange={(file) => props.onChange("mortgageStatement", file)}
              error={props.errors?.mortgageStatement}
            />
          </div>
        )}
      </div>

      {/* Section: Financial Projections */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Financial Projections
          </h3>
          <p className="text-sm text-muted-foreground">
            Estimated property income and expenses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CurrencyInput
            label="Estimated Monthly Rent"
            value={props.estimatedMonthlyRent}
            onChange={(val) => props.onChange("estimatedMonthlyRent", val)}
            required
            error={props.errors?.estimatedMonthlyRent}
          />

          <CurrencyInput
            label="Operating Expenses (monthly)"
            value={props.operatingExpenses}
            onChange={(val) => props.onChange("operatingExpenses", val)}
            required
            error={props.errors?.operatingExpenses}
          />

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
            label="HOA Fees (monthly, if applicable)"
            value={props.hoaFees}
            onChange={(val) => props.onChange("hoaFees", val)}
            error={props.errors?.hoaFees}
          />
        </div>

        {/* Automatic Calculations */}
        <div className="card-elevated p-6 space-y-4 bg-accent/30">
          <h4 className="font-semibold text-foreground">
            Automatic Calculations
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Net Operating Income (NOI) - Annual
              </Label>
              <div className="text-2xl font-semibold text-primary">
                ${props.calculatedNOI.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Debt Service Coverage Ratio (DSCR)
              </Label>
              <div className="text-2xl font-semibold text-primary">
                {props.calculatedDSCR > 0
                  ? props.calculatedDSCR.toFixed(2)
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
