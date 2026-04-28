import { CSRSection } from "@/components/about/CSRSection";
import { CompanyStats } from "@/components/about/CompanyStats";
import { FounderSection } from "@/components/about/FounderSection";
import { MissionVision } from "@/components/about/MissionVision";
import { TeamSection } from "@/components/about/TeamSection";
import { Timeline } from "@/components/about/Timeline";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Camera,
  Cpu,
  FlaskConical,
  GraduationCap,
  Handshake,
  Landmark,
  MapPin,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const mouColleges = [
  {
    name: "ST JOSEPHS INSTITUTE OF TECHNOLOGY, CHENNAI",
    location: "Chennai, Tamil Nadu",
    type: "Institution",
  },
  {
    name: "ST JOSEPHS COLLEGE OF ENGINEERING, CHENNAI",
    location: "Chennai, Tamil Nadu",
    type: "Institution",
  },
  {
    name: "CHENNAI INSTITUTE OF TECHNOLOGY, CHENNAI",
    location: "Chennai, Tamil Nadu",
    type: "Institution",
  },
  {
    name: "SRI SAIRAM ENGINEERING COLLEGE, CHENNAI",
    location: "Chennai, Tamil Nadu",
    type: "Institution",
  },
  {
    name: "SRI SAIRAM INSTITUTE OF TECHNOLOGY, CHENNAI",
    location: "Chennai, Tamil Nadu",
    type: "Institution",
  },
  {
    name: "AARUPADAI VEEDU INSTITUTE OF TECHNOLOGY, CHENNAI",
    location: "Chennai, Tamil Nadu",
    type: "Institution",
  },
  {
    name: "GLOBAL INSTITUTE OF ENGINEERING & TECHNOLOGY, RANIPET",
    location: "Ranipet, Tamil Nadu",
    type: "Institution",
  },
  {
    name: "ADHIPARASKATHI COLLEGE OF ENGINEERING & TECHNOLOGY, RANIPET",
    location: "Ranipet, Tamil Nadu",
    type: "Institution",
  },
  {
    name: "ARM COLLEGE OF ENGINEERING & TECHNOLOGY",
    location: "Tamil Nadu",
    type: "Institution",
  },
  {
    name: "THANGAVELU ENGINEERING COLLEGE",
    location: "Tamil Nadu",
    type: "Institution",
  },
];

const partners = [
  {
    name: "IIT Delhi",
    type: "Academic Partner",
    icon: BookOpen,
    highlight: true,
  },
  {
    name: "Ministry of Corporate Affairs",
    type: "Government",
    icon: Landmark,
    highlight: false,
  },
  { name: "DPIIT", type: "Government", icon: Shield, highlight: false },
  { name: "AICTE", type: "Government", icon: Award, highlight: false },
  {
    name: "Ministry of MSME",
    type: "Government",
    icon: Building2,
    highlight: false,
  },
  {
    name: "Ministry of Commerce Affairs",
    type: "Government",
    icon: Landmark,
    highlight: false,
  },
  { name: "StartupTN", type: "Government", icon: FlaskConical, highlight: false },
  {
    name: "Startup India",
    type: "Government",
    icon: FlaskConical,
    highlight: false,
  },
  {
    name: "EDII TN",
    type: "Government",
    icon: Handshake,
    highlight: false,
  },
];



const grantLogos = [
  "IIT Delhi IHFC",
  "EDII TN, Government of Tamil Nadu",
  "Maharashtra Pollution Control Board",
  "Anna Incubator",
  "NIT Srinagar",
  "GITAM University Vizag",
  "Veltech University",
  "Chennai Institute of Technology",
];

const mouEvents = [
  {
    id: 1,
    photo: "/assets/mou-1.jpg",
    institution: "Sairam SDG Solveathon 4.0",
    description:
      "MOU signing ceremony on stage during the national-level SDG hackathon",
    location: "Chennai, Tamil Nadu",
    attendees: 2,
    gradientFrom: "#92400e",
    gradientTo: "#b45309",
    accentColor: "#fbbf24",
    icon: Award,
    tall: true,
  },
  {
    id: 2,
    photo: "/assets/mou-2.jpg",
    institution: "Gojan School of Business & Technology",
    description:
      "Group MOU signing in conference hall with faculty and leadership",
    location: "Chennai, Tamil Nadu",
    attendees: 13,
    gradientFrom: "#1e3a5f",
    gradientTo: "#1d4ed8",
    accentColor: "#93c5fd",
    icon: Users,
    tall: false,
  },
  {
    id: 3,
    photo: "/assets/mou-3.jpg",
    institution: "Aarupadaiveedu Institute of Technology",
    description:
      "Formal MOU exchange on the main auditorium stage with dignitaries",
    location: "Tamil Nadu",
    attendees: 8,
    gradientFrom: "#3b0764",
    gradientTo: "#7e22ce",
    accentColor: "#c4b5fd",
    icon: GraduationCap,
    tall: false,
  },
  {
    id: 4,
    photo: "/assets/mou-4.jpg",
    institution: "Sri Sairam Engineering College",
    description:
      "Official document signing with stamped MOU, executive team present",
    location: "Chennai, Tamil Nadu",
    attendees: 5,
    gradientFrom: "#064e3b",
    gradientTo: "#059669",
    accentColor: "#6ee7b7",
    icon: Handshake,
    tall: true,
  },
  {
    id: 5,
    photo: "/assets/mou-5.jpg",
    institution: "ARM CET",
    description: "Bilateral MOU exchange between institutional representatives",
    location: "Chennai, Tamil Nadu",
    attendees: 2,
    gradientFrom: "#831843",
    gradientTo: "#be185d",
    accentColor: "#f9a8d4",
    icon: Building2,
    tall: false,
  },
  {
    id: 6,
    photo: "/assets/mou-6.jpg",
    institution: "Thangavelu Engineering College",
    description:
      "Branded MOU signing ceremony with Big Bucks Innovation signage",
    location: "Chennai, Tamil Nadu",
    attendees: 6,
    gradientFrom: "#7c2d12",
    gradientTo: "#c2410c",
    accentColor: "#fdba74",
    icon: FlaskConical,
    tall: false,
  },
  {
    id: 7,
    photo: "/assets/mou-7.jpg",
    institution: "Chennai Institute of Technology",
    description: "MOU signing in front of CIT wall logo with core team members",
    location: "Chennai, Tamil Nadu",
    attendees: 3,
    gradientFrom: "#172554",
    gradientTo: "#1e40af",
    accentColor: "#bfdbfe",
    icon: Cpu,
    tall: false,
  },
];

function MouPhotoCard({
  event,
  index,
}: {
  event: (typeof mouEvents)[0];
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const Icon = event.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: "easeOut" }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
        event.tall ? "row-span-2" : ""
      }`}
      style={{
        boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)",
        minHeight: event.tall ? "360px" : "220px",
      }}
      data-ocid={`about.mou_photo.${event.id}`}
    >
      {!imgError && (
        <img
          src={event.photo}
          alt={`MOU signing ceremony — ${event.institution}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      )}

      {imgError && (
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`grad-${event.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={event.gradientFrom} stopOpacity="1" />
              <stop offset="100%" stopColor={event.gradientTo} stopOpacity="1" />
            </linearGradient>
            <filter id={`grain-${event.id}`} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
              <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
              <feComposite in="blend" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grad-${event.id})`} />
          <rect width="100%" height="100%" fill="white" opacity="0.03" filter={`url(#grain-${event.id})`} />
          <circle cx="20%" cy="30%" r="80" fill={event.accentColor} opacity="0.08" />
          <circle cx="75%" cy="65%" r="100" fill={event.accentColor} opacity="0.06" />
          <circle cx="50%" cy="15%" r="60" fill="white" opacity="0.05" />
          <line x1="-10%" y1="120%" x2="110%" y2="-20%" stroke={event.accentColor} strokeWidth="1" opacity="0.15" />
          <circle cx="50%" cy="42%" r="28" fill="white" opacity="0.1" />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="white" opacity="0.5" fontFamily="sans-serif">📷</text>
          <defs>
            <linearGradient id={`scrim-${event.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="60%" stopColor="rgba(0,0,0,0.5)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#scrim-${event.id})`} />
        </svg>
      )}

      {!imgError && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      )}

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(220,38,38,0.08) 100%)",
        }}
      />

      <div className="absolute top-3 left-3">
        <span
          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full backdrop-blur-sm"
          style={{
            background: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Camera className="w-2.5 h-2.5" />
          MOU {event.id.toString().padStart(2, "0")}
        </span>
      </div>

      <div className="absolute top-3 right-3">
        <span
          className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full backdrop-blur-sm"
          style={{
            background: "rgba(0,0,0,0.35)",
            color: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Users className="w-2.5 h-2.5" />
          {event.attendees}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <Icon className="w-3 h-3 flex-shrink-0" style={{ color: event.accentColor }} />
          <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: event.accentColor }}>
            MOU Signing
          </span>
        </div>
        <h3 className="font-display font-bold text-white text-sm leading-tight mb-0.5 line-clamp-1">
          {event.institution}
        </h3>
        <p className="text-white/70 text-[11px] leading-snug line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {event.description}
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          <MapPin className="w-2.5 h-2.5 text-white/50 flex-shrink-0" />
          <span className="text-white/50 text-[10px]">{event.location}</span>
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1.5px ${event.accentColor}40` }}
      />
    </motion.div>
  );
}

export function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative py-24 md:py-32 overflow-hidden gradient-hero border-b border-border"
        data-ocid="about.hero_section"
      >
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary bg-primary/5 text-xs uppercase tracking-widest"
            >
              About Big Bucks Innovation
            </Badge>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
              <span className="text-gradient-accent">Innovating</span> India's
              Technology Future
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Big Bucks Innovation Pvt Ltd is a pre-incubated enterprise
              technology company born from IIT Delhi's innovation ecosystem —
              delivering world-class IoT, web, mobile, and digital
              transformation solutions backed by government trust.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                data-ocid="about.hero_cta_primary"
              >
                <Link to="/contact">
                  Partner With Us <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-primary/40 transition-smooth"
                data-ocid="about.hero_cta_secondary"
              >
                <Link to="/products">Explore Solutions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IIT Delhi Pre-Incubation */}
      <section
        className="py-14 bg-white border-b border-border"
        data-ocid="about.iit_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <Badge
                variant="outline"
                className="mb-4 border-accent/40 text-accent bg-accent/5 text-xs uppercase tracking-widest"
              >
                Pre-Incubation Partner
              </Badge>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Backed by{" "}
                <span className="text-gradient-accent">IIT Delhi</span>'s
                Innovation Ecosystem
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
                Big Bucks Innovation holds official pre-incubation status with
                IIT Delhi — India's premier technical institute. This gives us
                direct access to research labs, faculty mentorship, and a
                pipeline of top engineering talent.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: FlaskConical,
                  title: "Pre-Incubated",
                  desc: "Official status with IIT Delhi Innovation Lab",
                  isAccent: true,
                },
                {
                  icon: GraduationCap,
                  title: "Research Access",
                  desc: "World-class facilities and faculty collaboration",
                  isAccent: false,
                },
                {
                  icon: Award,
                  title: "53 Funding Grants",
                  desc: "Government-backed national tech initiatives",
                  isAccent: true,
                },
                {
                  icon: Building2,
                  title: "2 Branch Offices",
                  desc: "Chennai head office + St. Josephs campus branch",
                  isAccent: false,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="bg-white rounded-xl px-5 py-5 border flex items-start gap-4 transition-smooth"
                    style={{
                      borderColor: item.isAccent
                        ? "rgba(245,158,11,0.3)"
                        : "rgba(37,99,235,0.2)",
                      borderLeftWidth: "3px",
                      borderLeftColor: item.isAccent ? "#F59E0B" : "#2563EB",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: item.isAccent
                          ? "rgba(245,158,11,0.1)"
                          : "rgba(37,99,235,0.1)",
                      }}
                    >
                      <Icon
                        style={{
                          color: item.isAccent ? "#F59E0B" : "#2563EB",
                          width: "18px",
                          height: "18px",
                        }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-display font-bold text-sm mb-1"
                        style={{ color: item.isAccent ? "#F59E0B" : "#2563EB" }}
                      >
                        {item.title}
                      </div>
                      <div className="text-muted-foreground text-xs leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <CompanyStats />

      {/* Mission & Vision + Values */}
      <MissionVision />

      {/* Timeline */}
      <Timeline />

      {/* Team */}
      <TeamSection />

      {/* ✅ FOUNDER SECTION — placed here between Team and MOU Gallery */}
      <FounderSection />

      {/* MOU Signing Gallery */}
      <section
        className="py-20 border-b border-border"
        style={{
          background:
            "linear-gradient(180deg, #0f172a 0%, #1e1b2e 50%, #0f172a 100%)",
        }}
        data-ocid="about.mou_gallery_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <Badge
              variant="outline"
              className="mb-4 text-xs uppercase tracking-widest"
              style={{
                borderColor: "rgba(251,191,36,0.35)",
                color: "#fbbf24",
                background: "rgba(251,191,36,0.08)",
              }}
            >
              Partnership Milestones
            </Badge>
            <h2
              className="font-display font-bold text-3xl md:text-4xl mb-4 leading-tight"
              style={{ color: "#f1f5f9" }}
            >
              MOU Signing{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Gallery
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto text-base leading-relaxed"
              style={{ color: "#94a3b8" }}
            >
              Real moments from our MOU signing ceremonies across India —
              building lasting academic and industry partnerships that fuel
              innovation, training, and research collaboration.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { value: "10+", label: "Partner Institutions" },
                { value: "7", label: "Signing Ceremonies" },
                { value: "5000+", label: "Students Impacted" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-display font-bold text-2xl"
                    style={{
                      background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "#64748b" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div
            className="hidden md:grid gap-4 max-w-6xl mx-auto"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "180px",
            }}
            data-ocid="about.mou_gallery_grid"
          >
            {mouEvents.map((event, i) => (
              <MouPhotoCard key={event.id} event={event} index={i} />
            ))}
          </div>

          <div className="md:hidden flex flex-col gap-4 max-w-sm mx-auto">
            {mouEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                style={{ height: "220px" }}
                data-ocid={`about.mou_photo_mobile.${event.id}`}
              >
                <MouPhotoCard event={{ ...event, tall: false }} index={i} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-sm mb-4" style={{ color: "#64748b" }}>
              Interested in partnering with Big Bucks Innovation?
            </p>
            <Button
              asChild
              size="sm"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#fff",
                border: "none",
              }}
              className="hover:opacity-90 transition-smooth"
              data-ocid="about.mou_gallery_cta"
            >
              <Link to="/contact">
                Sign an MOU With Us{" "}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* MOU Colleges Text Grid */}
      <section
        className="py-20 bg-white border-y border-border"
        data-ocid="about.mou_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
            >
              MOU Colleges
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              10 Colleges in Our{" "}
              <span className="text-gradient-accent">MOU Network</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Formal Memoranda of Understanding with leading engineering
              institutions across India — enabling training programs, R&D
              collaboration, and internship pipelines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {mouColleges.map((college, i) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="bg-white border border-border hover:border-primary/30 rounded-xl p-4 flex flex-col gap-2 transition-smooth group"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                data-ocid={`about.mou_college.${i + 1}`}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-xs leading-snug group-hover:text-primary transition-colors duration-200">
                    {college.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <p className="text-muted-foreground text-[11px] truncate">
                      {college.location}
                    </p>
                  </div>
                  <span
                    className="inline-block mt-1.5 text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(245,158,11,0.1)",
                      color: "#F59E0B",
                    }}
                  >
                    {college.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-muted-foreground text-sm mt-8"
          >
            Interested in an MOU with Big Bucks Innovation?{" "}
            <Link
              to="/contact"
              className="text-primary font-medium hover:underline transition-smooth"
              data-ocid="about.mou_contact_link"
            >
              Reach out to us →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Funding Grants */}
      <section
        className="py-16 bg-muted/20 border-b border-border"
        data-ocid="about.funding_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge
              variant="outline"
              className="mb-4 border-accent/30 text-accent bg-accent/5 text-xs uppercase tracking-widest"
            >
              Government Funded
            </Badge>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
              53+ Funding Grants &{" "}
              <span className="text-gradient-primary">Recognition</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Validated by government bodies and research institutions through
              competitive grants and fellowships.
            </p>
          </motion.div>

          <div className="overflow-hidden mb-8 relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />
            <div
              className="flex gap-4 w-max"
              style={{ animation: "marquee 22s linear infinite" }}
            >
              {grantLogos.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/25 bg-accent/5 text-accent text-xs font-semibold whitespace-nowrap"
                >
                  <Award className="w-3 h-3" />
                  {name}
                </span>
              ))}
              {grantLogos.map((name) => (
                <span
                  key={`${name}-dup`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/25 bg-accent/5 text-accent text-xs font-semibold whitespace-nowrap"
                >
                  <Award className="w-3 h-3" />
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {fundingGrants.map((grant, i) => (
              <motion.div
                key={grant.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="bg-white border border-border rounded-xl px-5 py-4 flex items-start gap-3 transition-smooth hover:border-accent/30"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                data-ocid={`about.funding_grant.${i + 1}`}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground leading-snug mb-0.5">
                    {grant.title}
                  </p>
                  <p className="text-muted-foreground text-xs">{grant.body}</p>
                  <span
                    className="inline-block mt-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(37,99,235,0.08)",
                      color: "#2563EB",
                    }}
                  >
                    {grant.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Ecosystem */}
      <section
        className="py-16 bg-background border-b border-border"
        data-ocid="about.partners_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge
              variant="outline"
              className="mb-4 border-border text-muted-foreground text-xs uppercase tracking-widest"
            >
              Partner Ecosystem
            </Badge>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
              Trusted by{" "}
              <span className="text-gradient-accent">
                government &amp; industry
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`bg-white border rounded-xl px-5 py-4 flex items-center gap-3 transition-smooth
                  ${
                    p.highlight
                      ? "border-accent/30 hover:border-accent/50"
                      : "border-border hover:border-primary/25"
                  }`}
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                data-ocid={`about.partner.${i + 1}`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                  ${p.highlight ? "bg-accent/10 border border-accent/20" : "bg-primary/8 border border-primary/15"}`}
                >
                  <p.icon
                    className={`w-4 h-4 ${p.highlight ? "text-accent" : "text-primary"}`}
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className={`font-display font-semibold text-sm truncate ${p.highlight ? "text-accent" : "text-foreground"}`}
                  >
                    {p.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{p.type}</p>
                </div>
                {p.highlight && (
                  <Badge className="ml-auto flex-shrink-0 bg-accent/15 text-accent border-accent/30 text-xs">
                    Key Partner
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR */}
      <CSRSection />

      {/* CTA */}
      <section
        className="py-20 bg-white border-t border-border relative overflow-hidden"
        data-ocid="about.cta_section"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Cpu className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Ready to build the future{" "}
              <span className="text-gradient-accent">together?</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Whether you're a government body, enterprise, or educational
              institution — we'd love to explore how Big Bucks Innovation can
              accelerate your digital transformation journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                data-ocid="about.cta_contact_button"
              >
                <Link to="/contact">
                  Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-primary/40 transition-smooth"
                data-ocid="about.cta_careers_button"
              >
                <Link to="/careers">Join Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}