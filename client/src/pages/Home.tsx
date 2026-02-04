// Design Philosophy: Minimalismo Financeiro
// Página principal com formulário de intake

import { IntakeForm } from "@/components/intake/IntakeForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                DekaCapital Partners
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Real Estate Lending Qualification Portal
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <IntakeForm />

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container py-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} DekaCapital Partners. All information is confidential.
          </p>
        </div>
      </footer>
    </div>
  );
}
