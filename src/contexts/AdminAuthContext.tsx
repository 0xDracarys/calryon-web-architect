import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client'; // Adjust path as necessary
import type { AuthChangeEvent, Session, User, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // Import for programmatic navigation

interface AdminAuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // No navigate here, navigation should be handled by components consuming the context or by ProtectedRoute

  useEffect(() => {
    setIsLoading(true);
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch(error => {
      console.error("Error getting initial session:", error);
      setIsLoading(false);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('AdminAuthContext: Auth state changed', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false); // Ensure loading is false after initial check and changes
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const login = async (credentials: SignInWithPasswordCredentials) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      // Session and user will be updated by onAuthStateChange listener
      // No navigation here, let the component handle it.
    } catch (error) {
      console.error('Login error:', error);
      // Let the calling component handle error display
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // User and session will be set to null by onAuthStateChange listener
      // No navigation here, let the component handle it.
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      // While onAuthStateChange will set loading to false, ensure it's reset if an error occurs before that.
      // However, onAuthStateChange is the primary mechanism for isLoading after successful operations.
      // For logout, user becomes null, usually triggering redirect in ProtectedRoute.
      // If user is already on login page, no redirect needed.
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ user, session, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
