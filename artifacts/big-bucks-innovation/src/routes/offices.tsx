import React from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Clock,
  FlaskConical,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";

// ── Asset arrays ─────────────────────────────────────────────────────────────
const headOfficePhotos = [
  "/assets/hd1.jpg",
  "/assets/hd2.jpg",
  "/assets/hd3.jpg",
  "/assets/hd4.jpg",
  "/assets/hd5.jpg",
];

const branchPhotos = ["/assets/br1.jpg", "/assets/br2.jpg"];

// ── Photo Grid Component ──────────────────────────────────────────────────────
function PhotoMosaic({ photos, label }: { photos: string[]; label: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
      {photos.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className={`relative overflow-hidden rounded-xl bg-muted group
            ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"}
          `}
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
        >
          <img
            src={src}
            alt={`${label} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Graceful fallback to gradient placeholder
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
        </motion.div>
      ))}
    </div>
  );
}

// ── Info Card ─────────────────────────────────────────────────────────────────
function InfoRow({
  icon: Icon,
  label,
  value,
}: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
          {label}
        </p>
        <p className="text-sm text-foreground font-medium leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function OfficePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-background border-b border-border">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.45 0.16 264 / 0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge
            variant="outline"
            className="mb-5 border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
          >
            Our Locations
          </Badge>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-5 leading-tight">
            Where We <span className="text-gradient-accent">Operate</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Headquartered in Chennai with a growing network of branch offices —
            building India's next-gen enterprise tech from the ground up.
          </p>
        </div>
      </section>

      {/* Head Office */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* Left — Info */}
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-accent/40 text-accent bg-accent/5 text-xs uppercase tracking-widest"
              >
                Head Office · Chennai
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground mb-2 leading-tight">
                Thoraipakkam <span className="text-gradient-accent">HQ</span>
              </h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Our flagship office houses the core leadership team, the Mini
                R&D Lab, and serves as the hub for enterprise client
                engagements, government partnerships, and product development.
              </p>

              <div className="flex flex-col gap-4 mb-6">
                <InfoRow
                  icon={MapPin}
                  label="Address"
                  value="No.14, Prabhu Nagar, Neelankarai Link Road, Thoraipakkam, Chennai — 600097"
                />
                <InfoRow
                  icon={Clock}
                  label="Established"
                  value="2025 · With Mini R&D Lab"
                />
                <InfoRow
                  icon={FlaskConical}
                  label="Facilities"
                  value="Mini R&D Lab · Conference Rooms · Dev Workspace"
                />
              </div>

              {/* Google Maps embed */}
              <div
                className="rounded-xl overflow-hidden border border-border"
                style={{ height: "200px" }}
              >
                <iframe
                  title="BBI Head Office Map"
                  src="https://www.google.com/maps/place/Big+Bucks+Innovation/@12.9508994,80.2408363,15.16z/data=!4m6!3m5!1s0x3a525c31ed24b35d:0xa275424536ffc4cb!8m2!3d12.9495343!4d80.2462848!16s%2Fg%2F11w9hlk_83?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right — Photos */}
            <div>
              <PhotoMosaic photos={headOfficePhotos} label="Head Office" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Branch Office */}
      <section className="py-20 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* Left — Photos (reversed layout) */}
            <div className="order-2 md:order-1">
              <PhotoMosaic photos={branchPhotos} label="Branch Office" />
            </div>

            {/* Right — Info */}
            <div className="order-1 md:order-2">
              <Badge
                variant="outline"
                className="mb-4 border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
              >
                2nd Branch · St. Josephs
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground mb-2 leading-tight">
                St. Josephs{" "}
                <span className="text-gradient-primary">Campus</span>
              </h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Our campus branch inside St. Josephs Institute of Technology
                accelerates direct collaboration with students, faculty, and
                academic research — powering our internship and training
                programs.
              </p>

              <div className="flex flex-col gap-4">
                <InfoRow
                  icon={Building2}
                  label="Location"
                  value="St. Josephs Institute of Technology, Chennai, Tamil Nadu"
                />
                <InfoRow
                  icon={Clock}
                  label="Opened"
                  value="2025 · Active MOU Partner"
                />
                <InfoRow
                  icon={FlaskConical}
                  label="Focus"
                  value="Student Training · Internship Hub · R&D Collaboration"
                />
              </div>

              <div
                className="mt-6 rounded-xl p-4 border"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(245,158,11,0.05))",
                  borderColor: "rgba(37,99,235,0.15)",
                }}
              >
                <p className="text-xs font-semibold text-primary mb-1">
                  Why a campus office?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Proximity to students means faster talent pipelines,
                  real-world project deployments, and a feedback loop between
                  industry needs and academic output.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
            {[
              { value: "2", label: "Office Locations" },
              { value: "Chennai", label: "Headquarters City" },
              { value: "2025", label: "First Office Opened" },
              { value: "1 R&D Lab", label: "In-House Research" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-bold text-3xl text-foreground mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
