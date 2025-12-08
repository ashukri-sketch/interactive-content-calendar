/**
 * AUTHENTICATION CONTEXT
 * Manages user authentication state
 */

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, rememberMe: boolean) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: 'Jordan Smith',
      email: email,
      role: 'Content Manager'
    };
    
    setUser(mockUser);
    
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
