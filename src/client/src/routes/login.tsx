import { PublicLayout } from "@/components/layout/PublicLayout";
import { AuthForm } from "@/components/auth/AuthForm";
import { motion } from "motion/react";

export function LoginPage() {
  return (
    <PublicLayout>
      <section className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center py-20 overflow-hidden">
        <img
          src="/assets/ihfc-iitdelhi.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none mou-white"
          style={{ opacity: 0.13 }}
        />
        <div className="w-full max-w-md px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-elevated"
          >
            <AuthForm defaultTab="login" />
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

