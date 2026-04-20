import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { MegaMenu } from "./MegaMenu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const mobileLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/products#services" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "nav-glass shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          : "nav-glass"
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-ocid="nav.logo_link"
          >
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_2px_12px_rgba(37,99,235,0.35)] group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.45)] transition-all duration-200">
              <span className="text-white font-display font-bold text-sm tracking-tight">
                B
              </span>
            </div>
            <div>
              <p className="font-display font-bold text-[#111827] text-sm leading-tight tracking-tight">
                BIG BUCKS
              </p>
              <p className="font-display font-bold text-primary text-sm leading-tight tracking-tight">
                INNOVATION
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 ml-1">
              <span className="w-px h-5 bg-[#E5E7EB]" />
              <span className="text-[10px] text-[#9CA3AF] leading-tight font-body">
                Pre-incubated at
                <br />
                IIT Delhi
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            <MegaMenu onNavigate={closeMobile} />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  data-ocid="nav.dashboard_button"
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 bg-primary text-white hover:bg-[#1D4ED8] shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.4)] transition-all duration-200 font-display font-semibold rounded-lg"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    data-ocid="nav.login_button"
                    size="sm"
                    variant="outline"
                    className="hidden sm:flex items-center gap-1.5 border-primary text-primary hover:bg-primary/8 transition-all duration-200 font-display font-semibold rounded-lg"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Login
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    data-ocid="nav.cta_button"
                    size="sm"
                    className="hidden sm:flex items-center gap-1.5 bg-primary text-white hover:bg-[#1D4ED8] shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.4)] transition-all duration-200 font-display font-semibold rounded-lg"
                  >
                    Dashboard
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              data-ocid="nav.mobile_menu_button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden border-t border-[#E5E7EB] bg-white/95 backdrop-blur-md overflow-hidden"
            data-ocid="nav.mobile_menu"
          >
            <div className="container mx-auto px-6 py-4 space-y-0.5">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href as "/"}
                  onClick={closeMobile}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-[#374151] hover:text-primary hover:bg-[#EFF6FF] transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#E5E7EB] mt-3 flex flex-col gap-2">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={closeMobile}>
                    <Button
                      data-ocid="nav.mobile_dashboard_button"
                      className="w-full bg-primary text-white hover:bg-[#1D4ED8] font-display font-semibold"
                      size="sm"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={closeMobile}>
                      <Button
                        data-ocid="nav.mobile_login_button"
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/8 font-display font-semibold"
                        size="sm"
                      >
                        <LogIn className="w-4 h-4 mr-2" /> Login
                      </Button>
                    </Link>
                    <Link to="/dashboard" onClick={closeMobile}>
                      <Button
                        data-ocid="nav.mobile_cta_button"
                        className="w-full bg-primary text-white hover:bg-[#1D4ED8] font-display font-semibold"
                        size="sm"
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
