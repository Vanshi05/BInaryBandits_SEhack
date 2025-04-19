// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { auth } from '@/Backend/firebase';
import { User, onAuthStateChanged } from 'firebase/auth'; // Add onAuthStateChanged to imports

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Correct cleanup
  }, []);

  return { user, loading };
};