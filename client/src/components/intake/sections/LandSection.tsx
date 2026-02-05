// Design Philosophy: Financial Minimalism
// Land Funding specific section with multi-parcel logic

import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileUpload } from "../FileUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { LandZoning, RoadAccess, LandUtilities } from "@/types/intake";

const ZONING_OPTIONS: { value: LandZoning; label: string }[] = [
  { value: "agricultural", label: "Agricultural (AG)" },
  { value: "residential_rural", label: "Residential – Rural (RR)" },
  { value: "residential_single_family", label: "Residential – Single Family (R1)" },
  { value: "residential_multi_family", label: "Residential – Multi-Family (R2/R3/RM)" },
  { value: "commercial", label: "Commercial (C)" },
  { value: "industrial", label: "Industrial (I)" },
  { value: "recreational", label: "Recreational (REC)" },
  { value: "timber", label: "Timber (T)" },
  { value: "vacant_unzoned", label: "Vacant / Unzoned" },
  { value: "mixed_use", label: "Mixed Use (MU)" },
  { value: "mobile_home", label: "Mobile Home / Manufactured Housing" },
  { value: "conservation", label: "Conservation / Protected Land" },
  { value: "planned_development", label: "Planned Development (PD)" },
  { value: "other", label: "Other (please specify)" },
];

const ROAD_ACCESS_OPTIONS: { value: RoadAccess; label: string }[] = [
  { value: "paved", label: "Paved" },
  { value: "dirt", label: "Dirt" },
  { value: "easement", label: "Easement" },
  { value: "none", label: "None" },
  { value: "unknown", label: "Unknown" },
];

const UTILITIES_OPTIONS: { key: keyof LandUtilities; label: string }[] = [
  { key: "water", label: "Water" },
  { key: "electric", label: "Electric" },
  { key: "sewer", label: "Sewer" },
  { key: "septic", label: "Septic" },
  { key: "none", label: "None" },
  { key: "unknown", label: "Unknown" },
];

interface LandSectionProps {
  apn: string;
  acreage: number;
  zoning: LandZoning | "";
  zoningOther?: string;
  roadAccess: RoadAccess | "";
  landUtilities: LandUtilities;
  numberOfParcels: number;
  multiParcelSpreadsheet: File | null;
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
          <Select
            value={props.zoning}
            onValueChange={(val) => props.onChange("zoning", val)}
          >
            <SelectTrigger className={props.errors?.zoning ? "border-destructive" : ""}>
              <SelectValue placeholder="Select zoning type" />
            </SelectTrigger>
            <SelectContent>
              {ZONING_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.errors?.zoning && (
            <p className="text-xs text-destructive animate-fade-in">
              {props.errors.zoning}
            </p>
          )}
        </div>

        {props.zoning === "other" && (
          <div className="space-y-2 animate-fade-in">
            <Label className="text-sm font-medium">
              Please specify zoning <span className="text-destructive">*</span>
            </Label>
            <Input
              value={props.zoningOther || ""}
              onChange={(e) => props.onChange("zoningOther", e.target.value)}
              placeholder="Specify zoning type"
              className={props.errors?.zoningOther ? "border-destructive" : ""}
            />
            {props.errors?.zoningOther && (
              <p className="text-xs text-destructive animate-fade-in">
                {props.errors.zoningOther}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Road Access <span className="text-destructive">*</span>
          </Label>
          <Select
            value={props.roadAccess}
            onValueChange={(val) => props.onChange("roadAccess", val)}
          >
            <SelectTrigger className={props.errors?.roadAccess ? "border-destructive" : ""}>
              <SelectValue placeholder="Select road access type" />
            </SelectTrigger>
            <SelectContent>
              {ROAD_ACCESS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.errors?.roadAccess && (
            <p className="text-xs text-destructive animate-fade-in">
              {props.errors.roadAccess}
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

      {/* Utilities Section */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">
          Utilities <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {UTILITIES_OPTIONS.map((option) => (
            <div key={option.key} className="flex items-center space-x-2">
              <Checkbox
                id={`utility-${option.key}`}
                checked={props.landUtilities?.[option.key] || false}
                onCheckedChange={(checked) => {
                  const currentUtilities = props.landUtilities || {
                    water: false,
                    electric: false,
                    sewer: false,
                    septic: false,
                    none: false,
                    unknown: false,
                  };
                  const newUtilities = { ...currentUtilities, [option.key]: !!checked };
                  // If "none" is checked, uncheck all others
                  if (option.key === "none" && checked) {
                    Object.keys(newUtilities).forEach((key) => {
                      if (key !== "none") newUtilities[key as keyof LandUtilities] = false;
                    });
                  }
                  // If "unknown" is checked, uncheck all others
                  if (option.key === "unknown" && checked) {
                    Object.keys(newUtilities).forEach((key) => {
                      if (key !== "unknown") newUtilities[key as keyof LandUtilities] = false;
                    });
                  }
                  // If any utility is checked, uncheck "none" and "unknown"
                  if (option.key !== "none" && option.key !== "unknown" && checked) {
                    newUtilities.none = false;
                    newUtilities.unknown = false;
                  }
                  props.onChange("landUtilities", newUtilities);
                }}
              />
              <Label htmlFor={`utility-${option.key}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {props.errors?.landUtilities && (
          <p className="text-xs text-destructive animate-fade-in">
            {props.errors.landUtilities}
          </p>
        )}
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
    </div>
  );
}
