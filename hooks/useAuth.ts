import { useState, useEffect } from 'react';
import { firebaseAuth } from '../config/firebase';
import { router } from 'expo-router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';

interface User {
  uid: string | null;
  email: string | null;
  username: string | null;
  token: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, async (user) => {
      const token = await user?.getIdToken();

      localStorage.setItem('token', token || '');
      setUser({
        uid: user?.uid || null,
        email: user?.email || null,
        username: user?.displayName || null,
        token: token || null,
      });
      setLoading(false);
      if (user) {
        router.replace('/(tabs)');
      }
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(userCredential.user, {
        displayName: username
      });


    } catch (error) {
      throw error;
    }
  };

  const Logout = async () => {
    try {
      await signOut(firebaseAuth);
      router.replace('/');
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    Logout,
  };
} 