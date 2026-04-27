import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Clock,
  HandshakeIcon,
  HeadphonesIcon,
  Mail,
  MapPin,
  Phone,
  Presentation,
} from "lucide-react";
import { motion } from "motion/react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "bigbucksinnovation@gmail.com",
    href: "mailto:bigbucksinnovation@gmail.com",
    description: "Responses within 24 hours",
  },
  {
    icon: Phone,
    label: "Mobile",
    value: "+91 86678 58430",
    href: "tel:8667858430",
    description: "Mon–Fri, 9 AM–6 PM IST",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "No.14, Prabhu Nagar, Neelankarai Link Road",
    href: undefined,
    description: "Thoraipakkam, Chennai – 600097",
  },
  {
    icon: Building2,
    label: "Branch Office",
    value: "3rd Floor, Lab Block 1, St Josephs Institute of Technology",
    href: undefined,
    description: "Semmancherry, Chennai – 600119",
  },
];

const officeHours = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM IST" },
  { day: "Saturday", hours: "10:00 AM – 2:00 PM IST" },
  { day: "Sunday", hours: "Closed" },
];

const quickLinks = [
  {
    icon: Presentation,
    label: "Request a Demo",
    description: "See our platform in action",
    href: "/contact?subject=demo-request",
    ocid: "contact.demo_request_link",
  },
  {
    icon: HandshakeIcon,
    label: "Partnership Inquiry",
    description: "Explore strategic collaboration",
    href: "/contact?subject=partnership-inquiry",
    ocid: "contact.partnership_link",
  },
  {
    icon: HeadphonesIcon,
    label: "Technical Support",
    description: "Get help from our team",
    href: "/contact?subject=technical-support",
    ocid: "contact.support_link",
  },
  {
    icon: BookOpen,
    label: "Enterprise Solutions",
    description: "Custom deployments at scale",
    href: "/contact?subject=enterprise-solutions",
    ocid: "contact.enterprise_link",
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <Badge
          variant="outline"
          className="mb-4 border-primary/40 text-primary bg-primary/5 px-3 py-1"
        >
          <Building2 className="w-3.5 h-3.5 mr-1.5" />
          BIG BUCKS INNOVATION
        </Badge>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Let's Build Something Great
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Pre-incubated at IIT Delhi. 4+ years of enterprise innovation. Trusted
          by government, academia, and industry leaders.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        {contactItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 + 0.15 }}
            className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-border hover:border-primary/30 transition-colors duration-200"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-wide">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-foreground text-sm font-medium hover:text-primary transition-colors duration-200 break-all"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-foreground text-sm font-medium leading-snug">
                  {item.value}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Separator className="bg-border/60" />

      {/* Office Hours */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-sm text-foreground">
            Office Hours
          </h3>
        </div>
        <div className="space-y-2">
          {officeHours.map((item) => (
            <div
              key={item.day}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-muted-foreground">{item.day}</span>
              <span
                className={`font-medium tabular-nums ${item.hours === "Closed" ? "text-muted-foreground" : "text-foreground"}`}
              >
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/60" />

      {/* Quick Links */}
      <div>
        <h3 className="font-display font-semibold text-sm text-foreground mb-3">
          Quick Inquiries
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 + 0.3 }}
            >
              <Link
                to={link.href}
                data-ocid={link.ocid}
                className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/40 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-200 group"
              >
                <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <link.icon className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                    {link.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
