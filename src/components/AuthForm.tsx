import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { signIn, signInWithGoogle, signUp } from "@/lib/auth";

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    
    try {
      if (isSignUp) {
        await signUp({
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          fullName: formData.get('fullName') as string,
          phoneNumber: formData.get('phoneNumber') as string,
        });
        toast.success("Account created successfully!");
      } else {
        await signIn({
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        });
        toast.success("Logged in successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h1>
        <p className="text-gray-500">
          {isSignUp ? 'Enter your details to get started' : 'Enter your credentials to continue'}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                disabled={loading}
              />
            </div>
          </>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            disabled={loading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        Continue with Google
      </Button>

      <div className="text-center text-sm">
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}