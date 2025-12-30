import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getStoredSession, signIn as signInService, signOut as signOutService, signUp as signUpService } from '@/services/authService';
import type { AuthSession, AuthUser } from '@/services/authService';

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = getStoredSession();
    if (storedSession) {
      setSession(storedSession);
      setUser(storedSession.user);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    const { session: nextSession, error } = await signInService(email, password);
    if (nextSession) {
      setSession(nextSession);
      setUser(nextSession.user);
    }
    return { error };
  };

  const signUp = async (email: string, password: string): Promise<{ error: Error | null }> => {
    const { session: nextSession, error } = await signUpService(email, password);
    if (nextSession) {
      setSession(nextSession);
      setUser(nextSession.user);
    }
    return { error };
  };

  const signOut = async (): Promise<void> => {
    setUser(null);
    setSession(null);
    await signOutService();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
