import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

import { auth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
  signInwithGoogle: () => Promise<void>;
  signOutwithGoogle: () => Promise<void>;
};

type AuthContextProviderType = { children: React.ReactNode };

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderType) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function signOutwithGoogle() {
    await signOut(auth).then((result) => {
      alert('signOut');
    });
  }

  async function signInwithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider).then((result) => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
  }
  return (
    <AuthContext.Provider value={{ user, setUser, signInwithGoogle, signOutwithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
