import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Placeholder types - will be replaced with Supabase types when connected
interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage (placeholder for Supabase)
    const storedSession = localStorage.getItem('catandary-session');
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        setSession(parsed);
        setUser(parsed.user);
      } catch {
        localStorage.removeItem('catandary-session');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    // Placeholder implementation - will be replaced with Supabase
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo: accept any valid email format with password length >= 6
      if (password.length < 6) {
        return { error: new Error('Invalid credentials') };
      }

      const mockUser: User = { id: crypto.randomUUID(), email };
      const mockSession: Session = { user: mockUser, access_token: 'mock-token' };
      
      setUser(mockUser);
      setSession(mockSession);
      localStorage.setItem('catandary-session', JSON.stringify(mockSession));
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string): Promise<{ error: Error | null }> => {
    // Placeholder implementation - will be replaced with Supabase
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (password.length < 6) {
        return { error: new Error('Password must be at least 6 characters') };
      }

      const mockUser: User = { id: crypto.randomUUID(), email };
      const mockSession: Session = { user: mockUser, access_token: 'mock-token' };
      
      setUser(mockUser);
      setSession(mockSession);
      localStorage.setItem('catandary-session', JSON.stringify(mockSession));
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async (): Promise<void> => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('catandary-session');
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
