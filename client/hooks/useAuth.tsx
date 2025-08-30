import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  bio?: string;
  location?: string;
  joinedAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const createUserProfile = async (user: User, additionalData?: any) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const { email, displayName, photoURL, phoneNumber } = user;
      const userData: UserProfile = {
        uid: user.uid,
        email: email || '',
        displayName: displayName || '',
        photoURL: photoURL || undefined,
        phoneNumber: phoneNumber || undefined,
        bio: '',
        location: '',
        joinedAt: new Date(),
        lastLoginAt: new Date(),
        ...additionalData
      };

      try {
        await setDoc(userRef, userData);
        setUserProfile(userData);
      } catch (error) {
        console.error('Error creating user profile:', error);
      }
    } else {
      // Update last login time
      const userData = userDoc.data() as UserProfile;
      userData.lastLoginAt = new Date();
      await updateDoc(userRef, { lastLoginAt: userData.lastLoginAt });
      setUserProfile(userData);
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    await createUserProfile(userCredential.user, { displayName });
    return userCredential;
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await createUserProfile(userCredential.user);
    return userCredential;
  };

  const logout = async () => {
    setUserProfile(null);
    return signOut(auth);
  };

  const resetPassword = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await createUserProfile(userCredential.user);
    return userCredential;
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No user logged in');

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, data);
    
    if (userProfile) {
      setUserProfile({ ...userProfile, ...data });
    }

    // Update Firebase Auth profile if needed
    if (data.displayName || data.photoURL) {
      await updateProfile(currentUser, {
        displayName: data.displayName || currentUser.displayName,
        photoURL: data.photoURL || currentUser.photoURL
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await createUserProfile(user);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};