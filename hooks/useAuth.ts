import { useState, useEffect } from 'react';
import { router } from 'expo-router';

// firebase
import { firebaseAuth } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut
} from 'firebase/auth';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();

        // Save token in AsyncStorage
        await AsyncStorage.setItem('token', token);

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName,
          token: token,
        });

        // Navigate to (tabs) only if a user exists
        router.replace('/(tabs)');
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in:", email, password);
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
    } catch (error) {
      throw error;
    }
  };

  const Logout = async () => {
    try {
      await signOut(firebaseAuth);
      await AsyncStorage.removeItem('token');
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
