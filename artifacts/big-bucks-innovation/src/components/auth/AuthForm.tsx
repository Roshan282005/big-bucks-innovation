import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmailSignIn, useEmailSignUp } from "@/hooks/useEmailAuth";
import { useGoogleSignIn } from "@/hooks/useGoogleAuth";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface AuthFormProps {
  defaultTab?: "login" | "signup";
}

export function AuthForm({ defaultTab = "login" }: AuthFormProps) {
  const { mutate: googleSignIn, isPending: isGoogleLoading } = useGoogleSignIn();
  const { mutate: emailSignIn, isPending: isLoginLoading } = useEmailSignIn();
  const { mutate: emailSignUp, isPending: isRegisterLoading } = useEmailSignUp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isLoading = isGoogleLoading || isLoginLoading || isRegisterLoading;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    emailSignIn({ email, password }, { onSuccess: () => navigate({ to: "/" }) });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    emailSignUp({ email, password, name }, { onSuccess: () => navigate({ to: "/" }) });
  };

  return (
    <div className="w-full max-w-md mx-auto relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elevated"
        >
          <ShieldCheck className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="font-display font-bold text-3xl text-foreground mb-2">
          {activeTab === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {activeTab === "login"
            ? "Sign in to access your enterprise dashboard"
            : "Join Big Bucks Innovation and scale your enterprise"}
        </p>
      </div>

      <Tabs
        defaultValue={defaultTab}
        onValueChange={(v) => setActiveTab(v as "login" | "signup")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1 h-11">
          <TabsTrigger value="login" className="font-semibold">Login</TabsTrigger>
          <TabsTrigger value="signup" className="font-semibold">Register</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      placeholder="name@company.com"
                      className="pl-10 h-11"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <button type="button" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      className="pl-10 h-11"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 font-semibold shadow-md hover:shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoginLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="John Doe"
                    className="h-11"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input
                    id="signup-email"
                    placeholder="name@company.com"
                    className="h-11"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Create Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    className="h-11"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 font-semibold shadow-md hover:shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isRegisterLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground font-semibold">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => googleSignIn()}
        disabled={isLoading}
        className="w-full h-12 font-semibold border-border hover:bg-muted/50 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary animate-spin rounded-full" />
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <title>Google Logo</title>
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" style={{ fill: "#4285F4" }} />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" style={{ fill: "#34A853" }} />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" style={{ fill: "#FBBC05" }} />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" style={{ fill: "#EA4335" }} />
            </svg>
            Google Account
          </>
        )}
      </Button>

      <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed">
        By continuing, you agree to our{" "}
        <button type="button" className="text-primary hover:underline">Terms of Service</button>{" "}
        and{" "}
        <button type="button" className="text-primary hover:underline">Privacy Policy</button>.
      </p>
    </div>
  );
}