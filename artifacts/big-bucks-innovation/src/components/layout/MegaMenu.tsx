import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Cpu,
  FlaskConical,
  Globe,
  Hammer,
  Laptop,
  Lightbulb,
  Megaphone,
  Mic2,
  MonitorSmartphone,
  Printer,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

const productsMenu: MenuItem[] = [
  {
    label: "RENEWA LED Street Light",
    href: "/products#renewa",
    icon: <Zap className="w-4 h-4" />,
    description: "Energy-efficient smart LED street lighting solutions",
  },
  {
    label: "ANNAM SaaS App",
    href: "/products#annam",
    icon: <MonitorSmartphone className="w-4 h-4" />,
    description: "Agricultural supply chain management platform",
  },
  {
    label: "SEYAL SaaS App",
    href: "/products#seyal",
    icon: <Globe className="w-4 h-4" />,
    description: "Smart enterprise yield & analytics layer",
  },
];

const servicesMenu: MenuItem[] = [
  {
    label: "IoT Home Automation",
    href: "/products#iot",
    icon: <Cpu className="w-4 h-4" />,
    description: "Connected home & building automation systems",
  },
  {
    label: "Website Development",
    href: "/products#web",
    icon: <Globe className="w-4 h-4" />,
    description: "Modern web apps and corporate portals",
  },
  {
    label: "Mobile App Development",
    href: "/products#mobile",
    icon: <Laptop className="w-4 h-4" />,
    description: "iOS & Android native and cross-platform apps",
  },
  {
    label: "Digital Marketing",
    href: "/products#marketing",
    icon: <Megaphone className="w-4 h-4" />,
    description: "SEO, social media, and growth campaigns",
  },
  {
    label: "Innovation & Patent",
    href: "/products#patent",
    icon: <Lightbulb className="w-4 h-4" />,
    description: "IP filing, product innovation consulting",
  },
  {
    label: "Trainings & Internships",
    href: "/products#training",
    icon: <Mic2 className="w-4 h-4" />,
    description: "Upskilling programs for students & professionals",
  },
  {
    label: "Hackathon & Funding",
    href: "/products#hackathon",
    icon: <Hammer className="w-4 h-4" />,
    description: "Startup challenges, grants, and mentorship",
  },
  {
    label: "PCB Designing",
    href: "/products#pcb",
    icon: <FlaskConical className="w-4 h-4" />,
    description: "Custom PCB layout and prototype manufacturing",
  },
  {
    label: "3D Printing",
    href: "/products#3d",
    icon: <Printer className="w-4 h-4" />,
    description: "Rapid prototyping and additive manufacturing",
  },
  {
    label: "R&D Support",
    href: "/products#rnd",
    icon: <FlaskConical className="w-4 h-4" />,
    description: "Research, testing, and product development",
  },
];

const companyMenu = [
  { label: "About Us", href: "/about", description: "Our story and mission" },
  { label: "Team", href: "/about#team", description: "8 innovation leaders" },
  { label: "About CEO", href: "/about#ceo",  description: "The vision behind Big Bucks" },
  {
    label: "Offices",
    href: "/offices",
    description: "Our locations & presence",
  },
  { label: "Careers", href: "/careers", description: "Join our team" },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch with us",
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
    timerRef.current = setTimeout(() => setActiveMenu(null), 130);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const dropdownBase =
    "absolute top-full mt-2 bg-card border border-border rounded-2xl shadow-elevated p-4 z-50";

  return (
    <div ref={menuRef} className="flex items-center gap-0.5">
      {/* Products */}
      <div
        className="relative"
        onMouseEnter={() => openMenu("products")}
        onMouseLeave={closeMenu}
      >
        <button
          type="button"
          data-ocid="nav.products_menu"
          className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeMenu === "products"
              ? "text-primary bg-primary/10"
              : "text-foreground/80 hover:text-primary hover:bg-muted/50"
          }`}
        >
          Products
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "products" ? "rotate-180 text-primary" : ""}`}
          />
        </button>
        <AnimatePresence>
          {activeMenu === "products" && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => openMenu("products")}
              onMouseLeave={closeMenu}
              className={`${dropdownBase} left-0 w-72`}
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">
                Our Products
              </p>
              <div className="space-y-0.5">
                {productsMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href as "/"}
                    onClick={onNavigate}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200 group"
                    data-ocid={`nav.product_${item.label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <div className="mt-0.5 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">
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

      {/* Services */}
      <div
        className="relative"
        onMouseEnter={() => openMenu("services")}
        onMouseLeave={closeMenu}
      >
        <button
          type="button"
          data-ocid="nav.services_menu"
          className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeMenu === "services"
              ? "text-primary bg-primary/10"
              : "text-foreground/80 hover:text-primary hover:bg-muted/50"
          }`}
        >
          Services
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "services" ? "rotate-180 text-primary" : ""}`}
          />
        </button>
        <AnimatePresence>
          {activeMenu === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={closeMenu}
              className={`${dropdownBase} left-0 w-[520px]`}
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">
                Our Services
              </p>
              <div className="grid grid-cols-2 gap-0.5">
                {servicesMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href as "/"}
                    onClick={onNavigate}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200 group"
                    data-ocid={`nav.service_${item.label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <div className="mt-0.5 w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-200 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-1">
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
          className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeMenu === "company"
              ? "text-primary bg-primary/10"
              : "text-foreground/80 hover:text-primary hover:bg-muted/50"
          }`}
        >
          Company
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "company" ? "rotate-180 text-primary" : ""}`}
          />
        </button>
        <AnimatePresence>
          {activeMenu === "company" && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => openMenu("company")}
              onMouseLeave={closeMenu}
              className={`${dropdownBase} left-0 w-56`}
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">
                Company
              </p>
              <div className="space-y-0.5">
                {companyMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href as "/"}
                    onClick={onNavigate}
                    className="flex flex-col p-2.5 rounded-xl hover:bg-primary/5 transition-all duration-200"
                    data-ocid={`nav.company_${item.label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link
        to="/about"
        data-ocid="nav.about_link"
        onClick={onNavigate}
        className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 transition-all duration-200"
      >
        About
      </Link>

      <Link
        to="/contact"
        data-ocid="nav.contact_link"
        onClick={onNavigate}
        className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 transition-all duration-200"
      >
        Contact
      </Link>
    </div>
  );
}
