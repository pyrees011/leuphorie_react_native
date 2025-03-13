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

export interface User {
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
      console.log(firebaseUser);
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        console.log(token);
        // Save token in AsyncStorage
        await AsyncStorage.setItem('token', token);

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName,
          token: token,
        });

        // // Navigate to (tabs) only if a user exists
        // router.replace('/(tabs)');
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
      router.replace('/(tabs)');
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        // Update profile with display name
        await updateProfile(user, { displayName: username });

        // 🔥 Reload user to get updated `displayName`
        await user.reload();

        // 🔥 Fetch updated user object after reload
        const updatedUser = firebaseAuth.currentUser;

        if (updatedUser) {
            // Save token and update state
            const token = await updatedUser.getIdToken();
            await AsyncStorage.setItem('token', token);

            setUser({
                uid: updatedUser.uid,
                email: updatedUser.email,
                username: updatedUser.displayName,
                token: token,
            });

            // Navigate to the questionnaire page
            router.replace('/questionnaire');
        }

    } catch (error) {
        console.error("Signup Error:", error);
        throw error;
    }
};


  const Logout = async () => {
    try {
      await signOut(firebaseAuth);
      await AsyncStorage.removeItem('token');
      router.replace('/LoginScreen');
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
