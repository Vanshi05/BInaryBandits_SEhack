// src/pages/Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '@/Backend/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-sage/20 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy">Sign In</h1>
          <p className="mt-2 text-sm text-sage">
            Enter your email and password to access your account
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-sage">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-sage">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-sage hover:bg-navy text-cream"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center text-sm text-sage">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-navy hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};