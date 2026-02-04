// Design Philosophy: Financial Minimalism
// Zod validations for multi-step form

import { z } from "zod";

// Custom validations
const phoneRegex = /^[\d\s\-\(\)\+]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Base schemas
export const titleInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactPerson: z.string().min(1, "Contact person name is required"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  email: z.string().regex(emailRegex, "Invalid email address"),
});

export const experienceInfoSchema = z.object({
  yearsOfExperience: z.number().min(0, "Invalid years of experience"),
  dealsCompleted: z.number().min(0, "Invalid number of deals"),
  creditScoreRange: z.enum([
    "under_600",
    "600_649",
    "650_699",
    "700_749",
    "750_plus",
  ]),
  hasDefaulted: z.boolean(),
  defaultExplanation: z.string().optional(),
}).refine(
  (data) => {
    if (data.hasDefaulted) {
      return data.defaultExplanation && data.defaultExplanation.length > 10;
    }
    return true;
  },
  {
    message: "Detailed explanation is required if you have defaulted",
    path: ["defaultExplanation"],
  }
);

export const comparableSchema = z.object({
  address: z.string().min(1, "Address is required"),
  zillowLink: z.string().url("Invalid Zillow link"),
  soldPrice: z.number().positive("Sold price must be positive"),
  soldDate: z.string().min(1, "Sale date is required"),
  squareFootage: z.number().positive("Square footage must be positive"),
});

// Schemas by Deal Type
export const doubleCloseSchema = z.object({
  dealType: z.literal("double_close"),
  capitalRequested: z.number().positive("Capital requested must be positive"),
  escrowCompanyName: z.string().optional(),
  escrowCompanyContact: z.string().optional(),
  titleInfo: titleInfoSchema,
  experienceInfo: experienceInfoSchema,
  // Files will be validated separately in component
});

export const emdSchema = z.object({
  dealType: z.literal("emd"),
  emdAmount: z.number().positive("EMD amount must be positive"),
  titleInfo: titleInfoSchema,
  experienceInfo: experienceInfoSchema,
});

export const fixFlipSchema = z.object({
  dealType: z.literal("fix_flip"),
  purchasePrice: z.number().positive("Purchase price must be positive"),
  downPayment: z.number().positive("Down payment must be positive"),
  loanAmount: z.number().positive("Loan amount must be positive"),
  totalRehabBudget: z.number().positive("Rehab budget must be positive"),
  arvJustification: z.enum(["appraisal", "comparables", "bpo"]),
  comparables: z.array(comparableSchema).optional(),
  holdingPeriod: z.number().positive("Holding period must be positive"),
  propertyTaxes: z.number().min(0, "Property taxes cannot be negative"),
  insurance: z.number().min(0, "Insurance cannot be negative"),
  utilities: z.number().min(0, "Utilities cannot be negative"),
  otherCosts: z.number().min(0, "Other costs cannot be negative"),
  financingStructure: z.enum(["loan", "joint_venture"]),
  titleInfo: titleInfoSchema,
  experienceInfo: experienceInfoSchema,
}).refine(
  (data) => {
    if (data.arvJustification === "comparables") {
      return data.comparables && data.comparables.length === 3;
    }
    return true;
  },
  {
    message: "3 comparables are required when selected",
    path: ["comparables"],
  }
);

export const buyHoldSchema = z.object({
  dealType: z.literal("buy_hold"),
  rentalStrategy: z.enum(["str", "ltr", "mtr", "mixed"]),
  isSubjectTo: z.boolean(),
  currentLenderName: z.string().optional(),
  currentLoanBalance: z.number().optional(),
  currentMonthlyPayment: z.number().optional(),
  currentInterestRate: z.number().optional(),
  estimatedMonthlyRent: z.number().positive("Estimated rent must be positive"),
  operatingExpenses: z.number().min(0, "Operating expenses cannot be negative"),
  propertyTaxes: z.number().min(0, "Property taxes cannot be negative"),
  insurance: z.number().min(0, "Insurance cannot be negative"),
  hoaFees: z.number().min(0, "HOA fees cannot be negative"),
  calculatedNOI: z.number(),
  calculatedDSCR: z.number(),
  financingStructure: z.enum(["loan", "joint_venture"]),
  titleInfo: titleInfoSchema,
  experienceInfo: experienceInfoSchema,
}).refine(
  (data) => {
    if (data.isSubjectTo) {
      return (
        data.currentLenderName &&
        data.currentLoanBalance &&
        data.currentMonthlyPayment &&
        data.currentInterestRate
      );
    }
    return true;
  },
  {
    message: "Current lender information is required for Subject-To deals",
    path: ["currentLenderName"],
  }
);

export const gapFundingSchema = z.object({
  dealType: z.literal("gap_funding"),
  gapAmount: z.number().positive("Gap amount must be positive"),
  hasPrimaryLender: z.boolean(),
  primaryLenderName: z.string().optional(),
  titleInfo: titleInfoSchema,
  experienceInfo: experienceInfoSchema,
}).refine(
  (data) => {
    if (data.hasPrimaryLender) {
      return data.primaryLenderName && data.primaryLenderName.length > 0;
    }
    return true;
  },
  {
    message: "Primary lender name is required",
    path: ["primaryLenderName"],
  }
);

export const landSchema = z.object({
  dealType: z.literal("land"),
  apn: z.string().min(1, "APN is required"),
  acreage: z.number().positive("Acreage must be positive"),
  zoning: z.enum([
    "agricultural",
    "residential_rural",
    "residential_single_family",
    "residential_multi_family",
    "commercial",
    "industrial",
    "recreational",
    "timber",
    "vacant_unzoned",
    "mixed_use",
    "mobile_home",
    "conservation",
    "planned_development",
    "other",
  ]),
  zoningOther: z.string().optional(),
  roadAccess: z.enum(["paved", "dirt", "easement", "none", "unknown"]),
  landUtilities: z.object({
    water: z.boolean(),
    electric: z.boolean(),
    sewer: z.boolean(),
    septic: z.boolean(),
    none: z.boolean(),
    unknown: z.boolean(),
  }),
  numberOfParcels: z.number().int().positive("Number of parcels must be positive"),
  financingStructure: z.enum(["loan", "joint_venture"]),
  titleInfo: titleInfoSchema,
  experienceInfo: experienceInfoSchema,
});

// Union schema
export const intakeFormSchema = z.discriminatedUnion("dealType", [
  doubleCloseSchema,
  emdSchema,
  fixFlipSchema,
  buyHoldSchema,
  gapFundingSchema,
  landSchema,
]);

// Helper to generate GHL tags
export function generateGHLTags(dealType: string): string[] {
  const tagMap: Record<string, string> = {
    double_close: "Deal_DoubleClose",
    emd: "Deal_EMD",
    fix_flip: "Deal_FixFlip",
    buy_hold: "Deal_BuyHold",
    gap_funding: "Deal_GapFunding",
    land: "Deal_Land",
  };

  return [tagMap[dealType] || "Deal_Unknown"];
}

// Helper for confirmation message
export function getConfirmationMessage(dealType: string): string {
  if (dealType === "land") {
    return "Thank you for submitting your Land Funding application! Our technical team will specifically analyze the APN and land characteristics you provided. We will contact you within 48 business hours.";
  }

  return "Thank you for submitting your application! Our team will review the details and contact you within 24 business hours.";
}
