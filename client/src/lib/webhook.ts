// Design Philosophy: Financial Minimalism
// Webhook integration service for N8N endpoint

import type { WebhookPayload } from "@/types/intake";
import { uploadFiles } from "./supabase";

// Use local proxy endpoint to avoid CORS issues
const WEBHOOK_URL = "/api/webhook";

export async function sendToWebhook(payload: WebhookPayload): Promise<boolean> {
  try {
    // Collect all files from the form data
    const files: Record<string, File> = {};
    
    if ("contractAB" in payload.formData && payload.formData.contractAB) {
      files.contractAB = payload.formData.contractAB;
    }
    if ("contractBC" in payload.formData && payload.formData.contractBC) {
      files.contractBC = payload.formData.contractBC;
    }
    if ("proofOfFunds" in payload.formData && payload.formData.proofOfFunds) {
      files.proofOfFunds = payload.formData.proofOfFunds;
    }
    if ("proofOfEMD" in payload.formData && payload.formData.proofOfEMD) {
      files.proofOfEMD = payload.formData.proofOfEMD;
    }
    if ("scopeOfWork" in payload.formData && payload.formData.scopeOfWork) {
      files.scopeOfWork = payload.formData.scopeOfWork;
    }
    if ("contractorEstimates" in payload.formData && payload.formData.contractorEstimates) {
      files.contractorEstimates = payload.formData.contractorEstimates;
    }
    if ("mortgageStatement" in payload.formData && payload.formData.mortgageStatement) {
      files.mortgageStatement = payload.formData.mortgageStatement;
    }
    if ("primaryLenderTermSheet" in payload.formData && payload.formData.primaryLenderTermSheet) {
      files.primaryLenderTermSheet = payload.formData.primaryLenderTermSheet;
    }
    if ("multiParcelSpreadsheet" in payload.formData && payload.formData.multiParcelSpreadsheet) {
      files.multiParcelSpreadsheet = payload.formData.multiParcelSpreadsheet;
    }

    // Upload files to Supabase and get URLs
    let fileUrls: Record<string, string> = {};
    if (Object.keys(files).length > 0) {
      console.log("Uploading files to Supabase Storage...");
      fileUrls = await uploadFiles(files);
      console.log("Files uploaded successfully:", fileUrls);
    }

    // Prepare JSON data (excluding file objects)
    const dealSpecificData = { ...payload.formData };
    delete (dealSpecificData as any).contractAB;
    delete (dealSpecificData as any).contractBC;
    delete (dealSpecificData as any).proofOfFunds;
    delete (dealSpecificData as any).proofOfEMD;
    delete (dealSpecificData as any).scopeOfWork;
    delete (dealSpecificData as any).contractorEstimates;
    delete (dealSpecificData as any).mortgageStatement;
    delete (dealSpecificData as any).primaryLenderTermSheet;
    delete (dealSpecificData as any).multiParcelSpreadsheet;

    // Build final payload with file URLs instead of files
    const jsonPayload = {
      dealType: payload.formData.dealType,
      titleInfo: payload.formData.titleInfo,
      experienceInfo: payload.formData.experienceInfo,
      tags: payload.tags,
      submittedAt: payload.submittedAt,
      ...dealSpecificData,
      // Add file URLs
      files: fileUrls,
    };

    // Send JSON to N8N webhook via proxy
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonPayload),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.statusText}`);
    }

    console.log("Form data successfully sent to N8N webhook");
    return true;
  } catch (error) {
    console.error("Webhook error:", error);
    throw error;
  }
}

// Helper to prepare payload before sending
export function preparePayload(formData: any, dealType: string): WebhookPayload {
  return {
    formData,
    tags: generateTags(dealType),
    submittedAt: new Date().toISOString(),
  };
}

function generateTags(dealType: string): string[] {
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
