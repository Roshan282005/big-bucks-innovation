import { Link } from "@tanstack/react-router";
import { Brain, ChevronDown, Cloud, Network, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface MegaMenuGroup {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

const productsMenu: MegaMenuGroup[] = [
  {
    label: "Networking",
    href: "/products#networking",
    icon: <Network className="w-5 h-5" />,
    description:
      "Enterprise-grade network infrastructure and connectivity solutions",
  },
  {
    label: "Security",
    href: "/products#security",
    icon: <ShieldCheck className="w-5 h-5" />,
    description: "Comprehensive cybersecurity protection for modern businesses",
  },
  {
    label: "AI Solutions",
    href: "/products#ai",
    icon: <Brain className="w-5 h-5" />,
    description: "Intelligent automation and machine learning implementations",
  },
  {
    label: "Cloud",
    href: "/products#cloud",
    icon: <Cloud className="w-5 h-5" />,
    description: "Scalable cloud infrastructure and managed services",
  },
];

const companyMenu = [
  { label: "About Us", href: "/about", description: "Our story and mission" },
  {
    label: "Impact",
    href: "/about#impact",
    description: "5000+ students trained, 10 MOUs",
  },
  {
    label: "Team",
    href: "/about#team",
    description: "Founders and leadership",
  },
];

interface MegaMenuProps {
  onNavigate?: () => void;
}

export function MegaMenu({ onNavigate }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (name: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMenu(name);
  };

  const closeMenu = () => {
    timerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div ref={menuRef} className="flex items-center gap-1">
      {/* Products & Services */}
      <div
        className="relative"
        onMouseEnter={() => openMenu("products")}
        onMouseLeave={closeMenu}
      >
        <button
          type="button"
          data-ocid="nav.products_menu"
          className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-smooth"
        >
          Products & Services
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "products" ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {activeMenu === "products" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => openMenu("products")}
              onMouseLeave={closeMenu}
              className="absolute left-0 top-full mt-1 w-[480px] bg-card border border-border rounded-xl shadow-elevated p-4 z-50 nav-blur"
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
                Solutions
              </p>
              <div className="grid grid-cols-2 gap-2">
                {productsMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href as "/"}
                    onClick={onNavigate}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-smooth group"
                  >
                    <div className="mt-0.5 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-smooth flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Company */}
      <div
        className="relative"
        onMouseEnter={() => openMenu("company")}
        onMouseLeave={closeMenu}
      >
        <button
          type="button"
          data-ocid="nav.company_menu"
          className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-smooth"
        >
          Company
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "company" ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {activeMenu === "company" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => openMenu("company")}
              onMouseLeave={closeMenu}
              className="absolute left-0 top-full mt-1 w-64 bg-card border border-border rounded-xl shadow-elevated p-2 z-50 nav-blur"
            >
              {companyMenu.map((item) => (
                <Link
                  key={item.label}
                  to={item.href as "/"}
                  onClick={onNavigate}
                  className="flex flex-col p-3 rounded-lg hover:bg-muted transition-smooth"
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link
        to="/careers"
        data-ocid="nav.careers_link"
        onClick={onNavigate}
        className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-smooth"
      >
        Careers
      </Link>

      <Link
        to="/contact"
        data-ocid="nav.contact_link"
        onClick={onNavigate}
        className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-smooth"
      >
        Contact
      </Link>
    </div>
  );
}
