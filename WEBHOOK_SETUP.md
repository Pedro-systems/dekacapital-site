# GoHighLevel Webhook Configuration

## Overview

This portal automatically sends form data to GoHighLevel (GHL) via webhook. To configure the integration:

## Step 1: Create Webhook in GHL

1. Access your GoHighLevel account
2. Navigate to **Settings** → **Workflows** → **Create Workflow**
3. Add a webhook type trigger
4. Copy the generated webhook URL (format: `https://services.leadconnectorhq.com/hooks/[ID]`)

## Step 2: Configure Environment Variable

### Option A: Via Manus Interface (Recommended)
1. Open the project management panel
2. Go to **Settings** → **Secrets**
3. Add a new secret:
   - **Key**: `VITE_GHL_WEBHOOK_URL`
   - **Value**: Paste the webhook URL copied from GHL

### Option B: Via Local File (Development)
1. Create a `.env.local` file in the project root
2. Add: `VITE_GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/[YOUR_ID]`

## Payload Structure

The webhook receives data in the following format:

```json
{
  "data": {
    "dealType": "fix_flip",
    "titleInfo": {
      "companyName": "First American Title",
      "contactPerson": "John Smith",
      "phone": "(555) 123-4567",
      "email": "john@titlecompany.com"
    },
    "experienceInfo": {
      "yearsOfExperience": 5,
      "dealsCompleted": 12,
      "creditScoreRange": "700_749",
      "hasDefaulted": false
    },
    "tags": ["Deal_FixFlip"],
    "submittedAt": "2026-01-20T20:00:00.000Z"
  }
}
```

### Attached Files

The following files can be sent as attachments (when applicable):

- `contractAB` - A-B Contract (Double Close)
- `contractBC` - B-C Contract (Double Close)
- `proofOfFunds` - Proof of Funds (Double Close)
- `proofOfEMD` - EMD Requirement Proof
- `scopeOfWork` - Scope of Work (Fix and Flip)
- `contractorEstimates` - Contractor Estimates
- `mortgageStatement` - Mortgage Statement (Buy and Hold Subject-To)
- `primaryLenderTermSheet` - Primary Lender Term Sheet (Gap Funding)
- `multiParcelSpreadsheet` - Multi-Parcel Spreadsheet (Land, when > 1 parcel)

## Automatic Tags

Each deal type automatically generates a specific tag:

| Deal Type | GHL Tag |
|-----------|---------|
| Double Close | `Deal_DoubleClose` |
| Earnest Money Deposit | `Deal_EMD` |
| Fix and Flip | `Deal_FixFlip` |
| Buy and Hold | `Deal_BuyHold` |
| Gap Funding | `Deal_GapFunding` |
| Land Funding | `Deal_Land` |

## GHL Workflow Configuration

Recommendations for the workflow in GHL:

1. **Trigger**: Webhook
2. **Filter**: Use tags to automatically segment
3. **Suggested actions**:
   - Create/update contact
   - Add deal type specific tags
   - Send notification to team
   - Create opportunity in pipeline
   - Schedule automatic follow-up

## Personalized Confirmation Messages

The system displays different messages based on deal type:

- **Land Funding**: Mentions specific APN analysis (48h)
- **Other types**: Standard message (24h)

## Local Development

During development, if `VITE_GHL_WEBHOOK_URL` is not configured:
- The form will work normally
- Data will be logged to the browser console
- No error will be shown to the user
- Useful for testing the flow without sending real data

## Security

⚠️ **Important**: Since this is a client-side variable (`VITE_` prefix), the webhook URL will be visible in browser code.

**Recommendations**:
1. Configure validation in GHL webhook (ex: secret token)
2. Set rate limiting in GHL
3. Monitor logs for suspicious submissions
4. Consider adding CAPTCHA if needed

## Troubleshooting

### Webhook not receiving data
- Verify the URL is correct
- Confirm the workflow is active in GHL
- Check browser logs (F12 → Console)

### Files not being sent
- Confirm GHL webhook accepts multipart/form-data
- Check maximum file size (default: 10MB)

### Tags not being applied
- Verify tags exist in GHL
- Confirm workflow configuration to process tags
