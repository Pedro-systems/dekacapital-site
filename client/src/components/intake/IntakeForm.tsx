// Design Philosophy: Minimalismo Financeiro
// Main multi-step form component with conditional logic

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import { ProgressBar } from "./ProgressBar";
import { DealTypeSelector } from "./DealTypeSelector";
import { DoubleCloseSection } from "./sections/DoubleCloseSection";
import { EMDSection } from "./sections/EMDSection";
import { FixFlipSection } from "./sections/FixFlipSection";
import { BuyHoldSection } from "./sections/BuyHoldSection";
import { GapFundingSection } from "./sections/GapFundingSection";
import { LandSection } from "./sections/LandSection";
import { TitleInfoSection } from "./sections/TitleInfoSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import type { DealType, TitleInfo, ExperienceInfo, Comparable } from "@/types/intake";
import { generateGHLTags, getConfirmationMessage } from "@/lib/validations";
import { sendToWebhook } from "@/lib/webhook";

const DEAL_TYPE_LABELS: Record<DealType, string> = {
  double_close: "Double Close",
  emd: "Earnest Money Deposit",
  fix_flip: "Fix and Flip",
  buy_hold: "Buy and Hold",
  gap_funding: "Gap Funding",
  land: "Land Funding",
};

export function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Common state
  const [dealType, setDealType] = useState<DealType | null>(null);
  const [titleInfo, setTitleInfo] = useState<TitleInfo>({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
  });
  const [experienceInfo, setExperienceInfo] = useState<ExperienceInfo>({
    yearsOfExperience: 0,
    dealsCompleted: 0,
    creditScoreRange: "under_600",
    hasDefaulted: false,
    defaultExplanation: "",
  });

  // Deal type specific state
  const [formData, setFormData] = useState<Record<string, any>>({
    // Double Close
    capitalRequested: 0,
    escrowCompanyName: "",
    escrowCompanyContact: "",
    contractAB: null,
    contractBC: null,
    proofOfFunds: null,
    // EMD
    emdAmount: 0,
    proofOfEMD: null,
    // Fix and Flip
    purchasePrice: 0,
    downPayment: 0,
    loanAmount: 0,
    totalRehabBudget: 0,
    scopeOfWork: null,
    contractorEstimates: null,
    arvJustification: "",
    comparables: [
      { address: "", zillowLink: "", soldPrice: 0, soldDate: "", squareFootage: 0 },
      { address: "", zillowLink: "", soldPrice: 0, soldDate: "", squareFootage: 0 },
      { address: "", zillowLink: "", soldPrice: 0, soldDate: "", squareFootage: 0 },
    ] as Comparable[],
    holdingPeriod: 0,
    propertyTaxes: 0,
    insurance: 0,
    utilities: 0,
    otherCosts: 0,
    // Buy and Hold
    rentalStrategy: "",
    isSubjectTo: false,
    currentLenderName: "",
    currentLoanBalance: 0,
    currentMonthlyPayment: 0,
    currentInterestRate: 0,
    mortgageStatement: null,
    estimatedMonthlyRent: 0,
    operatingExpenses: 0,
    hoaFees: 0,
    calculatedNOI: 0,
    calculatedDSCR: 0,
    // Gap Funding
    gapAmount: 0,
    hasPrimaryLender: false,
    primaryLenderName: "",
    primaryLenderTermSheet: null,
    // Land
    apn: "",
    acreage: 0,
    zoning: "",
    numberOfParcels: 1,
    multiParcelSpreadsheet: null,
    // Comum
    financingStructure: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Persistir no localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dekacapital-intake-form");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.dealType) setDealType(parsed.dealType);
        if (parsed.titleInfo) setTitleInfo(parsed.titleInfo);
        if (parsed.experienceInfo) setExperienceInfo(parsed.experienceInfo);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      } catch (e) {
        console.error("Failed to load saved form data", e);
      }
    }
  }, []);

  useEffect(() => {
    if (dealType) {
      localStorage.setItem(
        "dekacapital-intake-form",
        JSON.stringify({ dealType, titleInfo, experienceInfo, formData, currentStep })
      );
    }
  }, [dealType, titleInfo, experienceInfo, formData, currentStep]);

  const handleFormDataChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpar erro do campo
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!dealType) {
        toast.error("Please select a transaction type");
        return false;
      }
    }

    if (step === 2) {
      // Validar campos específicos do deal type
      if (dealType === "double_close") {
        if (formData.capitalRequested <= 0) newErrors.capitalRequested = "Required field";
        if (!formData.contractAB) newErrors.contractAB = "File required";
      } else if (dealType === "emd") {
        if (formData.emdAmount <= 0) newErrors.emdAmount = "Required field";
      } else if (dealType === "fix_flip") {
        if (formData.purchasePrice <= 0) newErrors.purchasePrice = "Required field";
        if (formData.downPayment <= 0) newErrors.downPayment = "Required field";
        if (formData.loanAmount <= 0) newErrors.loanAmount = "Required field";
        if (formData.totalRehabBudget <= 0) newErrors.totalRehabBudget = "Required field";
        if (!formData.arvJustification) newErrors.arvJustification = "Required field";
        if (!formData.financingStructure) newErrors.financingStructure = "Required field";
      } else if (dealType === "buy_hold") {
        if (!formData.rentalStrategy) newErrors.rentalStrategy = "Required field";
        if (formData.estimatedMonthlyRent <= 0) newErrors.estimatedMonthlyRent = "Required field";
        if (!formData.financingStructure) newErrors.financingStructure = "Required field";
        if (formData.isSubjectTo && !formData.currentLenderName) {
          newErrors.currentLenderName = "Required field for Subject-To";
        }
      } else if (dealType === "gap_funding") {
        if (formData.gapAmount <= 0) newErrors.gapAmount = "Required field";
        if (formData.hasPrimaryLender && !formData.primaryLenderName) {
          newErrors.primaryLenderName = "Required field";
        }
      } else if (dealType === "land") {
        if (!formData.apn) newErrors.apn = "Required field";
        if (formData.acreage <= 0) newErrors.acreage = "Required field";
        if (!formData.zoning) newErrors.zoning = "Required field";
        if (!formData.financingStructure) newErrors.financingStructure = "Required field";
      }
    }

    if (step === 3) {
      if (!titleInfo.companyName) newErrors.companyName = "Required field";
      if (!titleInfo.contactPerson) newErrors.contactPerson = "Required field";
      if (!titleInfo.phone) newErrors.phone = "Required field";
      if (!titleInfo.email) newErrors.email = "Required field";
    }

    if (step === 4) {
      if (experienceInfo.yearsOfExperience < 0) newErrors.yearsOfExperience = "Required field";
      if (experienceInfo.dealsCompleted < 0) newErrors.dealsCompleted = "Required field";
      if (experienceInfo.hasDefaulted && !experienceInfo.defaultExplanation) {
        newErrors.defaultExplanation = "Explanation required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      // Preparar payload
      const payload = {
        formData: {
          dealType,
          ...formData,
          titleInfo,
          experienceInfo,
        } as any,
        tags: generateGHLTags(dealType!),
        submittedAt: new Date().toISOString(),
      };

      // Enviar para webhook GHL
      await sendToWebhook(payload);

      // Limpar localStorage
      localStorage.removeItem("dekacapital-intake-form");

      // Mostrar mensagem de sucesso
      setIsSuccess(true);
      toast.success(getConfirmationMessage(dealType!));
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, label: "Deal Type", completed: currentStep > 1 },
    { id: 2, label: "Details", completed: currentStep > 2 },
    { id: 3, label: "Title", completed: currentStep > 3 },
    { id: 4, label: "Experience", completed: currentStep > 4 },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card-elevated max-w-2xl w-full p-6 md:p-8 text-center space-y-4 md:space-y-6 animate-slide-in-up">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Application Submitted Successfully!
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            {getConfirmationMessage(dealType!)}
          </p>
          <Button
            onClick={() => {
              setIsSuccess(false);
              setCurrentStep(1);
              setDealType(null);
              setFormData({});
              setTitleInfo({ companyName: "", contactPerson: "", phone: "", email: "" });
              setExperienceInfo({
                yearsOfExperience: 0,
                dealsCompleted: 0,
                creditScoreRange: "under_600",
                hasDefaulted: false,
              });
            }}
            variant="outline"
          >
            Submit New Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-6 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ProgressBar steps={steps} currentStep={currentStep} />

        <div className="card-elevated p-4 md:p-6 lg:p-8 mt-6 md:mt-8">
          {/* Step 1: Deal Type Selection */}
          {currentStep === 1 && (
            <DealTypeSelector value={dealType} onChange={setDealType} />
          )}

          {/* Step 2: Deal-Specific Details */}
          {currentStep === 2 && dealType === "double_close" && (
            <DoubleCloseSection
              capitalRequested={formData.capitalRequested}
              escrowCompanyName={formData.escrowCompanyName}
              escrowCompanyContact={formData.escrowCompanyContact}
              contractAB={formData.contractAB}
              contractBC={formData.contractBC}
              proofOfFunds={formData.proofOfFunds}
              onChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && dealType === "emd" && (
            <EMDSection
              emdAmount={formData.emdAmount}
              proofOfEMD={formData.proofOfEMD}
              onChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && dealType === "fix_flip" && (
            <FixFlipSection
              purchasePrice={formData.purchasePrice}
              downPayment={formData.downPayment}
              loanAmount={formData.loanAmount}
              totalRehabBudget={formData.totalRehabBudget}
              scopeOfWork={formData.scopeOfWork}
              contractorEstimates={formData.contractorEstimates}
              arvJustification={formData.arvJustification}
              comparables={formData.comparables}
              holdingPeriod={formData.holdingPeriod}
              propertyTaxes={formData.propertyTaxes}
              insurance={formData.insurance}
              utilities={formData.utilities}
              otherCosts={formData.otherCosts}
              financingStructure={formData.financingStructure}
              onChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && dealType === "buy_hold" && (
            <BuyHoldSection
              rentalStrategy={formData.rentalStrategy}
              isSubjectTo={formData.isSubjectTo}
              currentLenderName={formData.currentLenderName}
              currentLoanBalance={formData.currentLoanBalance}
              currentMonthlyPayment={formData.currentMonthlyPayment}
              currentInterestRate={formData.currentInterestRate}
              mortgageStatement={formData.mortgageStatement}
              estimatedMonthlyRent={formData.estimatedMonthlyRent}
              operatingExpenses={formData.operatingExpenses}
              propertyTaxes={formData.propertyTaxes}
              insurance={formData.insurance}
              hoaFees={formData.hoaFees}
              calculatedNOI={formData.calculatedNOI}
              calculatedDSCR={formData.calculatedDSCR}
              financingStructure={formData.financingStructure}
              onChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && dealType === "gap_funding" && (
            <GapFundingSection
              gapAmount={formData.gapAmount}
              hasPrimaryLender={formData.hasPrimaryLender}
              primaryLenderName={formData.primaryLenderName}
              primaryLenderTermSheet={formData.primaryLenderTermSheet}
              onChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && dealType === "land" && (
            <LandSection
              apn={formData.apn}
              acreage={formData.acreage}
              zoning={formData.zoning}
              numberOfParcels={formData.numberOfParcels}
              multiParcelSpreadsheet={formData.multiParcelSpreadsheet}
              financingStructure={formData.financingStructure}
              onChange={handleFormDataChange}
              errors={errors}
            />
          )}

          {/* Step 3: Title Info */}
          {currentStep === 3 && (
            <TitleInfoSection value={titleInfo} onChange={setTitleInfo} errors={errors} />
          )}

          {/* Step 4: Experience */}
          {currentStep === 4 && dealType && (
            <ExperienceSection
              value={experienceInfo}
              onChange={setExperienceInfo}
              dealTypeLabel={DEAL_TYPE_LABELS[dealType]}
              errors={errors}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border gap-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {currentStep < 4 && (
              <Button onClick={handleNext} className="ml-auto">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {currentStep === 4 && (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="ml-auto">
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
