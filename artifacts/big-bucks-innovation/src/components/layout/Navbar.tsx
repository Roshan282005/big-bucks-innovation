import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { MegaMenu } from "./MegaMenu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { label: "About CEO", href: "/about#ceo" }, 
    { label: "Offices", href: "/offices" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass shadow-[0_4px_24px_rgba(0,0,0,0.06)]" : "nav-glass"
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-ocid="nav.logo_link">
            <img
              src="/assets/logo.jpg"
              alt="Big Bucks Innovation"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div>
              <p className="font-display font-bold text-foreground text-sm leading-tight tracking-tight">BIG BUCKS</p>
              <p className="font-display font-bold text-primary text-sm leading-tight tracking-tight">INNOVATION</p>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 ml-1">
              <span className="w-px h-5 bg-border" />
              <span className="text-[10px] text-muted-foreground leading-tight font-body">
                Pre-incubated at<br />IIT Delhi
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            <MegaMenu onNavigate={closeMobile} />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <Link to="/register">
              <Button
                data-ocid="nav.cta_button"
                size="sm"
                className="hidden sm:flex items-center gap-1.5 bg-primary text-primary-foreground hover:opacity-90 shadow-subtle transition-all duration-200 font-display font-semibold rounded-lg"
              >
                Get Started
              </Button>
            </Link>

            <div className="flex items-center">
              <ThemeToggle />
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              data-ocid="nav.mobile_menu_button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
            data-ocid="nav.mobile_menu"
          >
            <div className="container mx-auto px-6 py-4 space-y-0.5">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href as "/"}
                  onClick={closeMobile}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-3">
                <Link to="/register" onClick={closeMobile}>
                  <Button
                    data-ocid="nav.mobile_cta_button"
                    className="w-full bg-primary text-white hover:bg-[#1D4ED8] font-display font-semibold"
                    size="sm"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}