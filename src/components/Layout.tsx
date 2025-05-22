
import { SearchBar } from "./SearchBar";
import { Navigation } from "./Navigation";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { searchSongs } from "@/lib/mockData";
import { Song } from "@/lib/types";

type Section = "genre" | "mood" | "trending" | "history";

interface LayoutProps {
  children: React.ReactNode;
  onSearch: (results: Song[]) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

export function Layout({ 
  children, 
  onSearch, 
  isAuthenticated, 
  onLogout, 
  onLoginClick 
}: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<Section>("genre");

  useEffect(() => {
    const path = location.pathname.split("/")[1] || "genre";
    setCurrentSection(path as Section);
  }, [location]);

  const handleSearch = (query: string) => {
    const results = searchSongs(query);
    onSearch(results);
    navigate("/search-results", { state: { query } });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6 text-primary"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span className="text-xl font-semibold">TuneSuggestor</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button 
                onClick={onLogout}
                className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <SearchBar onSearch={handleSearch} />
          <Navigation currentSection={currentSection} />
          <div className="mt-8">
            {children}
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TuneSuggestor. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
