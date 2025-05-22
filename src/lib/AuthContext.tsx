
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "./types";
import { currentUser as mockUser } from "./mockData";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  likedSongs: string[];
  toggleLikeSong: (songId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);

  // Check if user is already logged in (from localStorage in this mock version)
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      setUser(mockUser);
      setLikedSongs(mockUser.likedSongs);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app this would call the backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock validation - in a real app this would verify credentials with backend
      if (email === "user@example.com" && password === "password") {
        setIsAuthenticated(true);
        setUser(mockUser);
        setLikedSongs(mockUser.likedSongs);
        localStorage.setItem("isAuthenticated", "true");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in a real app this would call the backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock success - in a real app this would create a user in the database
      const newUser = {
        ...mockUser,
        name,
        email,
        likedSongs: [],
        history: [],
      };
      
      setIsAuthenticated(true);
      setUser(newUser);
      setLikedSongs([]);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setLikedSongs([]);
    localStorage.removeItem("isAuthenticated");
  };

  const toggleLikeSong = (songId: string) => {
    if (!isAuthenticated) return;
    
    setLikedSongs(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
    
    // In a real app, this would also update the user's liked songs in the database
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      signup,
      logout,
      likedSongs,
      toggleLikeSong,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
