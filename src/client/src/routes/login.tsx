import { AuthForm } from "@/components/auth/AuthForm";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { motion } from "motion/react";

export function LoginPage() {
  return (
    <PublicLayout>
      <section className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('/assets/ihfc-iitdelhi.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)",
          }}
        />
        <div className="w-full max-w-md px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-elevated"
          >
            <AuthForm defaultTab="login" />
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
