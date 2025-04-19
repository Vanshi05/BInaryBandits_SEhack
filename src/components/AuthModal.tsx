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
import { emailSignIn, emailSignUp } from "@/Backend/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await emailSignIn(form.loginEmail, form.loginPassword);
      onClose();
      navigate('/channel'); // Changed from '/dashboard' to '/channel'
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await emailSignUp(form.signupEmail, form.signupPassword);
      onClose();
      navigate('/dashboard'); // Changed from '/dashboard' to '/channel'
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
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
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
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
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;