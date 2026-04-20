import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Phone, Twitter } from "lucide-react";

const footerNav = [
  {
    title: "Products",
    links: [
      { label: "Networking", href: "/products#networking" },
      { label: "Security", href: "/products#security" },
      { label: "AI Solutions", href: "/products#ai" },
      { label: "Cloud", href: "/products#cloud" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Impact", href: "/about#impact" },
      { label: "Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Documentation", href: "/contact" },
      { label: "Privacy Policy", href: "/contact" },
      { label: "Terms of Service", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-cyan">
                <span className="text-primary-foreground font-display font-bold text-sm">
                  B
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-sm leading-tight">
                  BIG BUCKS
                </p>
                <p className="font-display font-bold text-primary text-sm leading-tight">
                  INNOVATION
                </p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed max-w-xs">
              Enterprise-grade AI, networking, and business solutions.
              Pre-incubated at IIT Delhi.
            </p>
            <div className="space-y-2">
              <a
                href="tel:8667858430"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                <Phone className="w-4 h-4" />
                <span>+91 86678 58430</span>
              </a>
              <a
                href="mailto:bigbucksinnovation@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                <Mail className="w-4 h-4" />
                <span>bigbucksinnovation@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-foreground text-sm mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href as "/"}
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-border/60" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <p className="text-xs text-muted-foreground">
            © {year} Big Bucks Innovation Pvt Ltd. All rights reserved.
            Pre-incubated & IIT Delhi.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-smooth"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
