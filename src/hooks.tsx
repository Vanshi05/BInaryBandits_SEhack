// hooks.ts (updated version)
import { useState, useEffect, useCallback } from 'react';
import { Query, DocumentData, onSnapshot } from 'firebase/firestore';
import { User, onAuthStateChanged, Auth } from 'firebase/auth';

// Enhanced Firestore Query Hook with error handling
export const useFirestoreQuery = (query: Query<DocumentData>) => {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query,
      (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocs(data);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore error:', err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [query]);

  return { docs, error, loading };
};

// Type-safe Auth State Hook
export const useAuthState = (auth: Auth) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
      },
      (err) => {
        console.error('Auth error:', err);
        setError(err);
        setInitializing(false);
      }
    );

    return unsubscribe;
  }, [auth, initializing]);

  return { user, initializing, error };
};

// Local Storage Hook
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Media Query Hook
export const useMedia = (queries: string[], values: any[], defaultValue: any) => {
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  const getValue = useCallback(() => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  }, [mediaQueryLists, values, defaultValue]);

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  }, [getValue, mediaQueryLists]);

  return value;
};

// Dark Mode Hook
export const useDarkMode = (): [boolean, (value: boolean | ((val: boolean) => boolean)) => void] => {
  const prefersDarkMode = useMedia(
    ['(prefers-color-scheme: dark)'],
    [true],
    false
  );

  const [enabled, setEnabled] = useLocalStorage<boolean>(
    'dark-mode-enabled',
    prefersDarkMode
  );

  useEffect(() => {
    const className = 'dark';
    const element = window.document.body;
    if (enabled) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);

  return [enabled, setEnabled];
};