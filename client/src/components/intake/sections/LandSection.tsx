// Design Philosophy: Financial Minimalism
// Land Funding specific section with multi-parcel logic

import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { FileUpload } from "../FileUpload";
import type { FinancingStructure } from "@/types/intake";

interface LandSectionProps {
  apn: string;
  acreage: number;
  zoning: string;
  numberOfParcels: number;
  multiParcelSpreadsheet: File | null;
  financingStructure: FinancingStructure | "";
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function LandSection(props: LandSectionProps) {
  const handleDownloadTemplate = () => {
    // Create a simple CSV template
    const csvContent = `Parcel Number,APN,Acreage,Zoning,Purchase Price,Notes
1,,,,,
2,,,,,
3,,,,,`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "multi-parcel-template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-slide-in-up">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Land Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Information about the land for financing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            APN (Assessor's Parcel Number) <span className="text-destructive">*</span>
          </Label>
          <Input
            value={props.apn}
            onChange={(e) => props.onChange("apn", e.target.value)}
            placeholder="Ex: 123-456-789"
            className={props.errors?.apn ? "border-destructive" : ""}
          />
          {props.errors?.apn && (
            <p className="text-xs text-destructive animate-fade-in">
              {props.errors.apn}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Acreage (acres) <span className="text-destructive">*</span>
          </Label>
          <Input
            type="number"
            step="0.01"
            value={props.acreage || ""}
            onChange={(e) => props.onChange("acreage", parseFloat(e.target.value) || 0)}
            placeholder="Ex: 5.5"
            className={props.errors?.acreage ? "border-destructive" : ""}
          />
          {props.errors?.acreage && (
            <p className="text-xs text-destructive animate-fade-in">
              {props.errors.acreage}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Zoning <span className="text-destructive">*</span>
          </Label>
          <Input
            value={props.zoning}
            onChange={(e) => props.onChange("zoning", e.target.value)}
            placeholder="Ex: Residential, Commercial, Agricultural"
            className={props.errors?.zoning ? "border-destructive" : ""}
          />
          {props.errors?.zoning && (
            <p className="text-xs text-destructive animate-fade-in">
              {props.errors.zoning}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Number of Parcels <span className="text-destructive">*</span>
          </Label>
          <Input
            type="number"
            min="1"
            value={props.numberOfParcels || ""}
            onChange={(e) => props.onChange("numberOfParcels", parseInt(e.target.value) || 1)}
            placeholder="Ex: 1"
            className={props.errors?.numberOfParcels ? "border-destructive" : ""}
          />
          {props.errors?.numberOfParcels && (
            <p className="text-xs text-destructive animate-fade-in">
              {props.errors.numberOfParcels}
            </p>
          )}
        </div>
      </div>

      {/* Multi-Parcel Logic */}
      {props.numberOfParcels > 1 && (
        <div className="space-y-6 animate-slide-in-up card-elevated p-6 bg-accent/30">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">
              Multiple Parcels Detected
            </h4>
            <p className="text-sm text-muted-foreground">
              For transactions with multiple parcels, download the template,
              fill it with the data for each parcel, and upload it below.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadTemplate}
            className="w-full md:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Multi-Parcel Template
          </Button>

          <FileUpload
            label="Upload Completed Multi-Parcel Spreadsheet"
            value={props.multiParcelSpreadsheet}
            onChange={(file) => props.onChange("multiParcelSpreadsheet", file)}
            accept=".csv,.xls,.xlsx"
            error={props.errors?.multiParcelSpreadsheet}
          />
        </div>
      )}

      {/* Section: Financing Structure */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Financing Structure
          </h3>
          <p className="text-sm text-muted-foreground">
            Type of structure desired for the transaction
          </p>
        </div>

        <RadioGroup
          value={props.financingStructure}
          onValueChange={(val) => props.onChange("financingStructure", val)}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="loan" id="financing-loan-land" />
            <Label htmlFor="financing-loan-land" className="font-normal cursor-pointer">
              Loan
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="joint_venture" id="financing-jv-land" />
            <Label htmlFor="financing-jv-land" className="font-normal cursor-pointer">
              Joint Venture
            </Label>
          </div>
        </RadioGroup>
        {props.errors?.financingStructure && (
          <p className="text-xs text-destructive animate-fade-in">
            {props.errors.financingStructure}
          </p>
        )}
      </div>
    </div>
  );
}
