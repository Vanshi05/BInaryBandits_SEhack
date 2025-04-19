import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, initialTab }: AuthModalProps) => {
  const [tab, setTab] = useState<string>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    loginEmail: "",
    loginPassword: "",
    signupName: "",
    signupEmail: "",
    signupPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Login Email:", form.loginEmail);
    console.log("Login Password:", form.loginPassword);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Signup Name:", form.signupName);
    console.log("Signup Email:", form.signupEmail);
    console.log("Signup Password:", form.signupPassword);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {tab === "login" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {tab === "login"
              ? "Enter your details to continue"
              : "Join our community to start borrowing and lending"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={initialTab}
          value={tab}
          onValueChange={setTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="loginEmail"
                    placeholder="you@example.com"
                    value={form.loginEmail}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-8"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="loginPassword">Password</Label>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs"
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="loginPassword"
                    type="password"
                    placeholder="••••••••"
                    value={form.loginPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-8"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                Continue with Google
              </Button>

              <div className="text-center mt-4 text-sm text-muted-foreground">
                <div className="flex justify-center items-center gap-1 text-xs">
                  <Lock className="h-3 w-3" />
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signupName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupName"
                    placeholder="John Doe"
                    value={form.signupName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-8"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupEmail"
                    placeholder="you@example.com"
                    type="email"
                    value={form.signupEmail}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-8"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="••••••••"
                    value={form.signupPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-8"
                    required
                  />
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-2/5 bg-primary rounded-full" />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-2 text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                Continue with Google
              </Button>

              <div className="text-center mt-4 flex flex-col gap-1">
                <div className="flex justify-center items-center gap-1 text-xs">
                  <Lock className="h-3 w-3" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ✓ We never share your data
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
