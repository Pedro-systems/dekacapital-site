import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";

// Import logo - você pode alterar o caminho depois
import logo from "@/images/dekacapital logo.png";

const navItems = [
  { label: "Home", href: "https://dekacapitalpartners.com/", external: true },
  { label: "Lender Partners", href: "https://dekacapitalpartners.com/lender-partners/", external: true },
  { label: "Borrowers", href: "https://dekacapitalpartners.com/borrowers/", external: true },
  { label: "Case Studies", href: "https://dekacapitalpartners.com/case-studies/", external: true },
  { label: "About Us", href: "https://dekacapitalpartners.com/about-us/", external: true },
  { label: "Submit A Deal", href: "/", external: false },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#4a4a54]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <a href="https://dekacapitalpartners.com/" className="flex items-center shrink-0">
            <img 
              src={logo} 
              alt="DekaCapital Partners" 
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8 px-8">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[14px] font-medium transition-colors whitespace-nowrap text-white hover:text-white/80"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[14px] font-medium transition-colors whitespace-nowrap ${
                    location === item.href
                      ? "text-[#00D4D4]"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Contact Button - Desktop */}
          <div className="hidden lg:block shrink-0">
            <a
              href="https://dekacapitalpartners.com/contact-us/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9B4DFF] via-[#D64DFF] to-[#FF4D9B] text-white text-[13px] font-semibold tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-90"
            >
              CONTACT US
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white/90 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-[14px] font-medium transition-colors text-white hover:text-white/80"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 text-[14px] font-medium transition-colors ${
                      location === item.href
                        ? "text-[#00D4D4]"
                        : "text-white hover:text-white/80"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="mt-4 px-4">
                <a
                  href="https://dekacapitalpartners.com/contact-us/"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#9B4DFF] via-[#D64DFF] to-[#FF4D9B] text-white text-[13px] font-semibold tracking-wider px-5 py-2.5 rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CONTACT US
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

