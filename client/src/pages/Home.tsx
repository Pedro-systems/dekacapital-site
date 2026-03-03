// Design Philosophy: Minimalismo Financeiro
// Página principal com formulário de intake

import { IntakeForm } from "@/components/intake/IntakeForm";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-[60px]" />

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
