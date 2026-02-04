// Design Philosophy: Minimalismo Financeiro
// Tipos para formulário multi-etapas com validação Zod

export type DealType =
  | "double_close"
  | "emd"
  | "fix_flip"
  | "buy_hold"
  | "gap_funding"
  | "land";

export type FinancingStructure = "loan" | "joint_venture";

export type RentalStrategy = "str" | "ltr" | "mtr" | "mixed";

export type ARVJustification = "appraisal" | "comparables" | "bpo";

export type CreditScoreRange =
  | "under_600"
  | "600_649"
  | "650_699"
  | "700_749"
  | "750_plus";

export type LandZoning =
  | "agricultural"
  | "residential_rural"
  | "residential_single_family"
  | "residential_multi_family"
  | "commercial"
  | "industrial"
  | "recreational"
  | "timber"
  | "vacant_unzoned"
  | "mixed_use"
  | "mobile_home"
  | "conservation"
  | "planned_development"
  | "other";

export type RoadAccess =
  | "paved"
  | "dirt"
  | "easement"
  | "none"
  | "unknown";

export interface LandUtilities {
  water: boolean;
  electric: boolean;
  sewer: boolean;
  septic: boolean;
  none: boolean;
  unknown: boolean;
}

export interface Comparable {
  address: string;
  zillowLink: string;
  soldPrice: number;
  soldDate: string;
  squareFootage: number;
}

export interface TitleInfo {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
}

export interface ExperienceInfo {
  yearsOfExperience: number;
  dealsCompleted: number;
  creditScoreRange: CreditScoreRange;
  hasDefaulted: boolean;
  defaultExplanation?: string;
}

// Base form data comum a todos os tipos
export interface BaseFormData {
  dealType: DealType;
  titleInfo: TitleInfo;
  experienceInfo: ExperienceInfo;
}

// Double Close específico
export interface DoubleCloseData extends BaseFormData {
  dealType: "double_close";
  capitalRequested: number;
  escrowCompanyName?: string;
  escrowCompanyContact?: string;
  contractAB: File | null;
  contractBC: File | null;
  proofOfFunds: File | null;
}

// EMD específico
export interface EMDData extends BaseFormData {
  dealType: "emd";
  emdAmount: number;
  proofOfEMD: File | null;
}

// Fix and Flip específico
export interface FixFlipData extends BaseFormData {
  dealType: "fix_flip";
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  totalRehabBudget: number;
  scopeOfWork: File | null;
  contractorEstimates: File | null;
  arvJustification: ARVJustification;
  comparables?: Comparable[];
  holdingPeriod: number;
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  otherCosts: number;
  financingStructure: FinancingStructure;
}

// Buy and Hold específico
export interface BuyHoldData extends BaseFormData {
  dealType: "buy_hold";
  rentalStrategy: RentalStrategy;
  isSubjectTo: boolean;
  currentLenderName?: string;
  currentLoanBalance?: number;
  currentMonthlyPayment?: number;
  currentInterestRate?: number;
  mortgageStatement?: File | null;
  estimatedMonthlyRent: number;
  operatingExpenses: number;
  propertyTaxes: number;
  insurance: number;
  hoaFees: number;
  calculatedNOI: number;
  calculatedDSCR: number;
  financingStructure: FinancingStructure;
}

// Gap Funding específico
export interface GapFundingData extends BaseFormData {
  dealType: "gap_funding";
  gapAmount: number;
  hasPrimaryLender: boolean;
  primaryLenderName?: string;
  primaryLenderTermSheet?: File | null;
}

// Land Funding específico
export interface LandData extends BaseFormData {
  dealType: "land";
  apn: string;
  acreage: number;
  zoning: LandZoning | "";
  zoningOther?: string;
  roadAccess: RoadAccess | "";
  utilities: LandUtilities;
  numberOfParcels: number;
  multiParcelSpreadsheet?: File | null;
  financingStructure: FinancingStructure;
}

// Union type de todos os dados possíveis
export type IntakeFormData =
  | DoubleCloseData
  | EMDData
  | FixFlipData
  | BuyHoldData
  | GapFundingData
  | LandData;

// Webhook payload
export interface WebhookPayload {
  formData: IntakeFormData;
  tags: string[];
  submittedAt: string;
}
