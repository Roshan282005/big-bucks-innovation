import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { useThemeStore } from "@/store/theme";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { MegaMenu } from "./MegaMenu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const mobileLinks = [
    { label: "Home", href: "/" },
    { label: "Products & Services", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 nav-blur border-b border-border shadow-subtle"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.logo_link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-cyan group-hover:scale-105 transition-smooth">
              <span className="text-primary-foreground font-display font-bold text-sm">
                B
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-foreground text-xs leading-tight">
                BIG BUCKS
              </p>
              <p className="font-display font-bold text-primary text-xs leading-tight">
                INNOVATION
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 ml-1">
              <span className="w-px h-6 bg-border" />
              <span className="text-[10px] text-muted-foreground leading-tight">
                Pre-incubated &<br />
                IIT Delhi
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            <MegaMenu onNavigate={closeMobile} />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-ocid="nav.theme_toggle"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  data-ocid="nav.dashboard_button"
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  data-ocid="nav.login_button"
                  size="sm"
                  variant="outline"
                  className="hidden sm:flex items-center gap-1.5 border-primary/40 text-primary hover:bg-primary/10"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              data-ocid="nav.mobile_menu_button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
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
            transition={{ duration: 0.25 }}
            className="md:hidden bg-card/95 nav-blur border-b border-border overflow-hidden"
            data-ocid="nav.mobile_menu"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href as "/"}
                  onClick={closeMobile}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-smooth"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-2">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={closeMobile}>
                    <Button
                      data-ocid="nav.mobile_dashboard_button"
                      className="w-full bg-primary text-primary-foreground"
                      size="sm"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login" onClick={closeMobile}>
                    <Button
                      data-ocid="nav.mobile_login_button"
                      variant="outline"
                      className="w-full border-primary/40 text-primary"
                      size="sm"
                    >
                      <LogIn className="w-4 h-4 mr-2" /> Login with Internet
                      Identity
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
