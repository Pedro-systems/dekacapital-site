# DekaCapital Partners - Lead Qualification Portal

Professional intake form portal for Real Estate Lending lead qualification with dynamic multi-step form and advanced conditional logic.

## 📋 Overview

This portal was developed for DekaCapital Partners with the goal of filtering high-ticket deals and automatically segmenting them based on business type. The system implements an intelligent form that dynamically adapts its fields based on user choices.

## ✨ Key Features

### 🎯 Multi-Step Form
- **4 sequential steps** with visual progress bar
- **Smooth navigation** with Back/Next buttons
- **Data persistence** via localStorage (automatic recovery)
- **Real-time validation** with visual feedback

### 🔀 Advanced Conditional Logic

#### 1. Gatekeeper Question
First mandatory question: **"What is the transaction type?"**
- 6 deal types available
- Card-based interface with icons and descriptions
- Visual selection with immediate feedback

#### 2. Deal Type Specific Flows

**Double Close**
- Capital requested
- Title/Escrow information
- A-B and B-C contract uploads
- Proof of funds required

**Earnest Money Deposit (EMD)**
- Deposit amount
- EMD requirement proof

**Fix and Flip**
- Purchase details (price, down payment, loan)
- Rehab budget with uploads
- **Conditional ARV logic**: If "3 Comparables" selected → opens 3 cards with 5 fields each
- Holding costs (taxes, insurance, utilities)
- Financing structure (Loan/JV)

**Buy and Hold**
- Rental strategy (STR, LTR, MTR, etc.)
- **Conditional Subject-To logic**: If "Yes" → current lender fields appear
- Automatic NOI and DSCR calculations
- Income and operating expense details

**Gap Funding**
- Gap amount
- **Conditional logic**: If has primary lender → requests Term Sheet

**Land Funding**
- APN, Acreage, Zoning
- **Conditional multi-parcel logic**: If parcels > 1 → displays template download button + required upload field

### 📊 GoHighLevel Integration

#### Automatic Tag System
Each deal type generates a specific tag:
- `Deal_DoubleClose`
- `Deal_EMD`
- `Deal_FixFlip`
- `Deal_BuyHold`
- `Deal_GapFunding`
- `Deal_Land`

#### Webhook
- Automatic submission via FormData (supports files)
- Configurable via `VITE_GHL_WEBHOOK_URL` environment variable
- Fallback to development mode (console logging)

### 🎨 Professional Design

#### Design Philosophy: Financial Minimalism
Inspired by Japanese design with focus on credibility and professionalism:

**Color Palette**
- Off-white (`#FAFAF9`) for backgrounds
- Graphite gray (`#1C1C1C`) for main text
- Moss green (`#4A5D4E`) as primary color
- Subtle earthy tone accents

**Typography**
- **Display**: Sohne (semibold, 600)
- **Body**: Inter (regular, 400)
- Clear hierarchy with weight contrast

**Layout**
- Floating cards with soft shadows
- Maximum 3-4 visible fields at a time
- Generous spacing (reduces cognitive load)
- Responsive 2-column grid (desktop)

**Micro-interactions**
- Smooth transitions (300ms)
- Slide-in-up animations
- Hover states with elevation
- Visible focus rings for accessibility

### 📱 Responsiveness

- **Mobile-first**: Optimized for smartphones
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Adaptations**:
  - Progress labels hidden on mobile
  - 1-column grid on mobile, 2 on tablet, 3 on desktop
  - Reduced padding and spacing on small screens
  - Scalable typography

### 🔐 Common Sections

#### Title/Escrow Information (Step 3)
Present in **all flows**:
- Company name
- Contact person
- Phone
- Email

#### Experience and Credit (Step 4)
Present in **all flows**:
- Years of experience in niche
- Number of completed deals
- Credit Score Range dropdown (Under 600, 600-649, 650-699, 700-749, 750+)
- Default history question (yes/no + required explanation)

### 📤 File Upload

Unified component with:
- Drag & drop visual
- Format validation (PDF, DOC, DOCX, XLS, XLSX)
- 10MB limit
- File name preview
- Remove button

### ✅ Confirmation Messages

Personalized by deal type:
- **Land Funding**: Mentions specific APN analysis (48h)
- **Other types**: Standard message (24h)

## 🛠️ Technologies Used

- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling with design tokens
- **Zod** - Schema validation
- **React Hook Form** - Form management
- **shadcn/ui** - Base components
- **Wouter** - Lightweight routing
- **Lucide React** - Icons

## 🚀 How to Use

### 1. Configure Webhook (Required for production)

See detailed instructions in [`WEBHOOK_SETUP.md`](./WEBHOOK_SETUP.md)

**Quick summary**:
1. Create a webhook in GoHighLevel
2. Add the `VITE_GHL_WEBHOOK_URL` secret in Settings → Secrets panel
3. Paste the GHL webhook URL

### 2. Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### 3. Test the Form

1. Access the portal
2. Select a deal type
3. Fill in deal-specific fields
4. Observe conditional logic in action:
   - **Fix & Flip**: Select "3 Comparables" for ARV
   - **Buy & Hold**: Mark "Subject-To" as Yes
   - **Land**: Enter number > 1 for "Number of Parcels"
5. Complete Title and Experience sections
6. Submit the form

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── intake/
│   │   │   ├── IntakeForm.tsx          # Main component
│   │   │   ├── ProgressBar.tsx         # Progress bar
│   │   │   ├── DealTypeSelector.tsx    # Deal type selection
│   │   │   ├── FileUpload.tsx          # File upload
│   │   │   ├── CurrencyInput.tsx       # Currency input
│   │   │   └── sections/               # Deal-specific sections
│   │   │       ├── DoubleCloseSection.tsx
│   │   │       ├── EMDSection.tsx
│   │   │       ├── FixFlipSection.tsx
│   │   │       ├── BuyHoldSection.tsx
│   │   │       ├── GapFundingSection.tsx
│   │   │       ├── LandSection.tsx
│   │   │       ├── TitleInfoSection.tsx
│   │   │       └── ExperienceSection.tsx
│   │   └── ui/                         # shadcn/ui components
│   ├── lib/
│   │   ├── validations.ts              # Zod schemas + helpers
│   │   └── webhook.ts                  # Webhook integration
│   ├── types/
│   │   └── intake.ts                   # TypeScript types
│   ├── pages/
│   │   └── Home.tsx                    # Main page
│   └── index.css                       # Design tokens
├── public/
│   └── images/                         # Static assets
└── index.html
```

## 🎯 Tested Features

✅ Deal type selection with visual feedback  
✅ Multi-step navigation (forward and backward)  
✅ Data persistence in localStorage  
✅ Fix & Flip conditional logic (3 comparables)  
✅ Buy & Hold conditional logic (Subject-To)  
✅ Land conditional logic (multi-parcel)  
✅ File upload with drag & drop  
✅ Required field validation  
✅ Personalized confirmation messages  
✅ Mobile/tablet/desktop responsiveness  
✅ Webhook integration (complete structure)  

## 📝 Development Notes

### Validation
- Required fields marked with `*`
- Inline validation with visual feedback
- Contextual error messages
- Navigation blocked if fields invalid

### Performance
- Optimized components with React 19
- Lazy loading of conditional sections
- Debounced text inputs
- Memoized calculations (NOI, DSCR)

### Accessibility
- Semantic labels on all fields
- Visible focus rings
- Keyboard navigation
- ARIA labels on interactive components
- WCAG AA color contrast

### Security
- Client-side and server-side validation
- Input sanitization
- File size limits
- MIME type validation

## 🔄 Next Steps (Optional)

- [ ] Add CAPTCHA to prevent spam
- [ ] Implement conversion analytics by deal type
- [ ] Create submissions dashboard (requires web-db-user upgrade)
- [ ] Add multi-language support
- [ ] Implement autosave with visual indicator
- [ ] Create preview mode before submission

## 📞 Support

For questions about webhook configuration or GoHighLevel integration, see [`WEBHOOK_SETUP.md`](./WEBHOOK_SETUP.md).

---

**Built with attention to detail for DekaCapital Partners**  
Design Philosophy: Financial Minimalism | Credibility through Simplicity
