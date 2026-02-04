# Arquitetura do Formulário - DekaCapital Intake

## Estrutura de Dados

### Deal Types (Pergunta Gatekeeper)
1. Double Close
2. Earnest Money Deposit (EMD)
3. Fix and Flip
4. Buy and Hold
5. Gap Funding
6. Land Funding

### Fluxo de Campos Condicionais

#### 1. Double Close
- Capital Requested (número)
- Title Company Name
- Title Company Contact
- Title Company Phone
- Title Company Email
- Escrow Company Name (opcional)
- Escrow Company Contact (opcional)
- Upload: Contract A-B (obrigatório)
- Upload: Contract B-C (obrigatório)
- Upload: Proof of Funds (obrigatório)

#### 2. Earnest Money Deposit (EMD)
- EMD Amount Required (número)
- Upload: Proof of EMD Requirement (obrigatório)
- Title/Escrow Information (seção comum)

#### 3. Fix and Flip
**Seção: Purchase**
- Purchase Price
- Down Payment Amount
- Loan Amount Requested

**Seção: Rehab Budget**
- Total Rehab Budget
- Upload: Scope of Work (obrigatório)
- Upload: Contractor Estimates (opcional)

**Seção: After Repair Value (ARV)**
- ARV Justification Method (dropdown):
  - Professional Appraisal
  - 3 Comparable Sales
  - Broker Price Opinion (BPO)
  
**Se "3 Comparable Sales" selecionado:**
- Comparable 1: Address, Zillow Link, Sold Price, Sold Date, Square Footage
- Comparable 2: Address, Zillow Link, Sold Price, Sold Date, Square Footage
- Comparable 3: Address, Zillow Link, Sold Price, Sold Date, Square Footage

**Seção: Holding Costs**
- Estimated Holding Period (meses)
- Property Taxes (anual)
- Insurance (anual)
- Utilities (mensal)
- Other Costs (mensal)

**Seção: Financing Structure**
- Structure Type: Loan ou Joint Venture (radio)

#### 4. Buy and Hold
**Seção: Property Strategy**
- Rental Strategy (dropdown):
  - Short-Term Rental (STR)
  - Long-Term Rental (LTR)
  - Mid-Term Rental (MTR)
  - Mixed Use
  
- Is this a Subject-To transaction? (Yes/No)

**Se "Yes" para Subject-To:**
- Current Lender Name
- Current Loan Balance
- Current Monthly Payment
- Current Interest Rate
- Upload: Existing Mortgage Statement (obrigatório)

**Seção: Financial Projections**
- Estimated Monthly Rent
- Operating Expenses (mensal)
- Property Taxes (anual)
- Insurance (anual)
- HOA Fees (se aplicável)
- Calculated NOI (auto-calculado)
- Calculated DSCR (auto-calculado)

**Seção: Financing Structure**
- Structure Type: Loan ou Joint Venture (radio)

#### 5. Gap Funding
- Gap Amount Requested
- Primary Lender Exists? (Yes/No)
- Se Yes: Primary Lender Name
- Upload: Primary Lender Term Sheet (obrigatório se Yes)
- Title/Escrow Information (seção comum)

#### 6. Land Funding
- APN (Assessor's Parcel Number)
- Acreage
- Zoning
- Number of Parcels (número)

**Se Number of Parcels > 1:**
- Mostrar link para download: "Download Multi-Parcel Template"
- Campo de upload: "Upload Completed Multi-Parcel Spreadsheet" (obrigatório)

**Seção: Financing Structure**
- Structure Type: Loan ou Joint Venture (radio)

### Seção Comum (Todos os Deal Types)

#### Experience & Credit
- Years of Experience in [Deal Type] (número)
- Number of [Deal Type] Deals Completed (número)
- Credit Score Range (dropdown):
  - Under 600
  - 600-649
  - 650-699
  - 700-749
  - 750+
  
- Have you ever defaulted on a loan? (Yes/No) - OBRIGATÓRIO
- Se Yes: Explanation (textarea, obrigatório)

#### Title/Closing Information (Comum para todos)
- Title Company Name
- Title Company Contact Person
- Title Company Phone
- Title Company Email

## Sistema de Tags para GHL

Cada Deal Type gera uma tag específica:
- `Deal_DoubleClose`
- `Deal_EMD`
- `Deal_FixFlip`
- `Deal_BuyHold`
- `Deal_GapFunding`
- `Deal_Land`

## Mensagens de Confirmação Personalizadas

### Padrão
"Obrigado por submeter sua solicitação! Nossa equipe analisará os detalhes e entrará em contato em até 24 horas úteis."

### Land Deal (específico)
"Obrigado por submeter sua solicitação de Land Funding! Nossa equipe técnica analisará especificamente o APN fornecido e as características do terreno. Entraremos em contato em até 48 horas úteis."

## Estrutura de Componentes

```
/components
  /intake
    IntakeForm.tsx          # Container principal
    ProgressBar.tsx         # Barra de progresso
    DealTypeSelector.tsx    # Pergunta gatekeeper
    
    /sections
      DoubleCloseSection.tsx
      EMDSection.tsx
      FixFlipSection.tsx
      BuyHoldSection.tsx
      GapFundingSection.tsx
      LandSection.tsx
      ExperienceSection.tsx
      TitleInfoSection.tsx
    
    /fields
      FileUpload.tsx
      CurrencyInput.tsx
      ComparableFields.tsx
      
  /ui
    (shadcn components)
```

## Validação

- Campos obrigatórios marcados com asterisco (*)
- Validação inline ao sair do campo (onBlur)
- Validação final antes de submissão
- Mensagens de erro claras e específicas
- Uploads: validar tipo de arquivo (PDF, DOC, DOCX, XLS, XLSX) e tamanho máximo (10MB)

## Estado do Formulário

Usar React Hook Form + Zod para:
- Gerenciamento de estado
- Validação tipada
- Lógica condicional
- Persistência local (localStorage) para evitar perda de dados
