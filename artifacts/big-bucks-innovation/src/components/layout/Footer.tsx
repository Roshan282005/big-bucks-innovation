import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const footerNav = [
  {
    title: "Products",
    links: [
      { label: "RENEWA LED Street Light", href: "/products#renewa" },
      { label: "ANNAM SaaS App", href: "/products#annam" },
      { label: "SEYAL SaaS App", href: "/products#seyal" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "IoT Home Automation", href: "/products#iot" },
      { label: "Website Development", href: "/products#web" },
      { label: "Mobile App Development", href: "/products#mobile" },
      { label: "Digital Marketing", href: "/products#marketing" },
      { label: "Trainings & Internships", href: "/products#training" },
      { label: "R&D Support", href: "/products#rnd" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-muted/10 border-t border-border">
      {/* IIT Delhi badge strip */}
      <div className="bg-primary/5 border-b border-primary/10 py-3">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs text-foreground font-medium">
            🏛️ Pre-incubated at{" "}
            <span className="text-primary font-semibold">IIT Delhi</span> •
            Supported by{" "}
            <span className="text-accent font-semibold">
              Government Funded Programs
            </span>{" "}
            • Empowering 5000+ Students Across India
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-14">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_2px_12px_rgba(37,99,235,0.3)] group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-all duration-200">
                <span className="text-white font-display font-bold text-sm">
                  B
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-[#111827] text-sm leading-tight">
                  BIG BUCKS
                </p>
                <p className="font-display font-bold text-primary text-sm leading-tight">
                  INNOVATION
                </p>
              </div>
            </Link>
            <p className="text-[#6B7280] text-sm mb-5 leading-relaxed max-w-xs">
              A technology-driven startup solving real-world challenges through
              IoT, SaaS platforms, and innovation services. Pre-incubated at IIT
              Delhi.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-5">
              <a
                href="tel:8667858430"
                className="flex items-center gap-2.5 text-sm text-[#6B7280] hover:text-primary transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-primary/60 flex-shrink-0" />
                <span>+91 86678 58430</span>
              </a>
              <a
                href="mailto:bigbucksinnovation@gmail.com"
                className="flex items-center gap-2.5 text-sm text-[#6B7280] hover:text-primary transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-primary/60 flex-shrink-0" />
                <span>bigbucksinnovation@gmail.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-[#6B7280]">
                <MapPin className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                <span>No.14, Prabhu Nagar,  Neelankarai Link Road,  Thoraipakkam,  Chennai-600097</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {[
                {
                  href: "https://linkedin.com/company/big-bucks-innovation",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                { href: "https://twitter.com/bigbucksinnov", icon: Twitter, label: "X" },
                { href: "https://github.com/big-bucks-innovation", icon: Github, label: "GitHub" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-subtle transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <h4 className="font-display font-semibold text-[#111827] text-sm mb-4 tracking-tight">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href as "/"}
                      className="text-sm text-[#6B7280] hover:text-primary transition-all duration-200 leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-border" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <p className="text-xs text-[#9CA3AF]">
            © {year} Big Bucks Innovation Pvt Ltd. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
