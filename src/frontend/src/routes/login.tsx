import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Lock, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { setAuthenticated, setPrincipal, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Sync II identity with Zustand
  useEffect(() => {
    if (identity && loginStatus === "success") {
      const principal = identity.getPrincipal().toText();
      setPrincipal(principal);
      setAuthenticated(true);
    }
  }, [identity, loginStatus, setPrincipal, setAuthenticated]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await login();
      toast.success("Authenticated successfully!");
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  const isLoading = loginStatus === "logging-in";

  return (
    <PublicLayout>
      <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-20">
        <div className="w-full max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-elevated"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <Badge
                variant="outline"
                className="mb-3 border-primary/30 text-primary bg-primary/5 text-xs"
              >
                Secure Login
              </Badge>
              <h1 className="font-display font-bold text-2xl text-foreground mb-2">
                Access CRM Dashboard
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Sign in with Internet Identity — the secure, passwordless
                authentication built on the Internet Computer.
              </p>
            </div>

            {/* Login button */}
            <Button
              type="button"
              data-ocid="login.submit_button"
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-semibold text-base mb-5"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Login with Internet Identity
                </span>
              )}
            </Button>

            {/* Trust signals */}
            <div className="space-y-2.5 pt-5 border-t border-border">
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>
                  No passwords stored — cryptographic keypair authentication
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>Powered by Internet Computer blockchain identity</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <Lock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>
                  Privacy-preserving — no personal data leaves your device
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
