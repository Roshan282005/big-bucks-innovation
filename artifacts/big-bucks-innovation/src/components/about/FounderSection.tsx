// ─── Founder Section ──────────────────────────────────────────────────────────
// Drop this section into AboutPage BETWEEN <TeamSection /> and the MOU Gallery.
//
// PHOTO SETUP:
//   • Copy your founder photo to:  src/frontend/public/assets/found2.jpg
//   • The <img> tag will auto-load it; a graceful gradient placeholder shows
//     if the file is missing (same pattern used in MouPhotoCard).
// ──────────────────────────────────────────────────────────────────────────────

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Milestone chips shown beneath the body copy ──────────────────────────────
const founderMilestones = [
  { icon: Lightbulb, label: "Started at 19" },
  { icon: Rocket,    label: "Early Grant Funding" },
  { icon: TrendingUp,label: "Multi-Initiative Expansion" },
  { icon: Users,     label: "Leading at 23" },
  { icon: Zap,       label: "Scalable Impact" },
];

export function FounderSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      className="py-20 border-b border-border relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8faff 0%, #fffbf0 50%, #f8faff 100%)",
      }}
      data-ocid="about.founder_section"
    >
      {/* ── Decorative background blobs ── */}
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <Badge
            variant="outline"
            className="mb-4 border-accent/40 text-accent bg-accent/5 text-xs uppercase tracking-widest"
          >
            Founder's Journey
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3 leading-tight">
            The Vision Behind{" "}
            <span className="text-gradient-accent">Big Bucks Innovation</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            A story of choosing impact over convention — from a single idea at
            19 to leading a technology company at 23.
          </p>
        </motion.div>

        {/* ── Main two-column layout ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT — text content ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex flex-col gap-7"
          >
            {/* Decorative quote bar */}
            <div
              className="w-12 h-1 rounded-full"
              style={{
                background: "linear-gradient(90deg, #F59E0B, #2563EB)",
              }}
            />

            {/* Body copy */}
            <p
              className="text-foreground text-base md:text-lg leading-relaxed font-medium"
              style={{ letterSpacing: "-0.01em" }}
            >
              At 19, he chose to{" "}
              <span
                className="font-semibold"
                style={{ color: "#F59E0B" }}
              >
                build instead of following a conventional path.
              </span>{" "}
              What began as a simple idea evolved into Big Bucks Innovation,
              driven by a clear focus on solving real-world problems through
              technology and innovation.
            </p>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              From securing early grant funding to establishing operations and
              expanding into multiple initiatives, his journey reflects{" "}
              <span className="text-foreground font-semibold">
                execution, resilience, and a strong commitment to impact.
              </span>
            </p>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Today, at{" "}
              <span className="text-foreground font-semibold">23</span>, he
              leads with a mission to create scalable solutions, empower young
              innovators, and build technology that delivers{" "}
              <span
                className="font-semibold"
                style={{ color: "#2563EB" }}
              >
                meaningful, real-world change.
              </span>
            </p>

            {/* Milestone chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {founderMilestones.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.span
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
                    style={{
                      background:
                        i % 2 === 0
                          ? "rgba(245,158,11,0.08)"
                          : "rgba(37,99,235,0.07)",
                      borderColor:
                        i % 2 === 0
                          ? "rgba(245,158,11,0.3)"
                          : "rgba(37,99,235,0.25)",
                      color: i % 2 === 0 ? "#B45309" : "#1D4ED8",
                    }}
                  >
                    <Icon className="w-3 h-3" />
                    {m.label}
                  </motion.span>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                data-ocid="about.founder_cta"
              >
                <Link to="/contact">
                  Connect With Us <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* ── RIGHT — founder photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
            data-ocid="about.founder_photo_wrapper"
          >
            <div className="relative">
              {/* Decorative ring behind photo */}
              <div
                className="absolute -inset-3 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(37,99,235,0.12) 100%)",
                  filter: "blur(1px)",
                }}
              />

              {/* Dot-grid accent (top-right offset) */}
              <div
                className="absolute -top-5 -right-5 w-24 h-24 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              />

              {/* Photo frame */}
              <div
                className="relative w-72 sm:w-80 md:w-96 aspect-[3/4] rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                {/* Real photo */}
                {!imgError && (
                  <img
                    src="/assets/found2.jpg"
                    alt="Founder of Big Bucks Innovation"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                )}

                {/* Graceful placeholder when image is missing */}
                {imgError && (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-4"
                    style={{
                      background:
                        "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)",
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      <Users className="w-9 h-9 text-white/60" />
                    </div>
                    <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
                      found2.jpg
                    </p>
                  </div>
                )}

                {/* Bottom scrim + name tag */}
                {!imgError && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(245,158,11,0.25)",
                        color: "#fbbf24",
                        border: "1px solid rgba(245,158,11,0.35)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <Zap className="w-2.5 h-2.5" />
                      Founder &amp; CEO
                    </span>
                    <p className="text-white font-display font-bold text-lg mt-1 leading-tight">
                      Big Bucks Innovation
                    </p>
                  </div>
                )}
              </div>

              {/* Floating stat pill — bottom-left of card */}
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="absolute -bottom-4 -left-6 rounded-xl px-4 py-2.5 flex items-center gap-2.5"
                style={{
                  background: "#fff",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(245,158,11,0.25)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(245,158,11,0.1)" }}
                >
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-foreground leading-none mb-0.5">
                    53+ Grants
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Secured &amp; counting
                  </p>
                </div>
              </motion.div>

              {/* Floating stat pill — top-right */}
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.45 }}
                className="absolute -top-4 -right-4 rounded-xl px-4 py-2.5 flex items-center gap-2.5"
                style={{
                  background: "#fff",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(37,99,235,0.2)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(37,99,235,0.08)" }}
                >
                  <Rocket className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-foreground leading-none mb-0.5">
                    Age 19 → 23
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Built from scratch
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}