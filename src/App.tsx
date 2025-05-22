import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { Song } from "@/lib/types";

import GenrePage from "./pages/GenrePage";
import MoodPage from "./pages/MoodPage";
import TrendingPage from "./pages/TrendingPage";
import HistoryPage from "./pages/HistoryPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, login, signup, logout, likedSongs, toggleLikeSong } = useAuth();
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [showAuthPage, setShowAuthPage] = useState(false);

  const handleLogin = (email: string, password: string) => {
    login(email, password).then(success => {
      if (success) {
        setShowAuthPage(false);
      }
    });
  };

  const handleSignup = (name: string, email: string, password: string) => {
    signup(name, email, password).then(success => {
      if (success) {
        setShowAuthPage(false);
      }
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handleLoginClick = () => {
    setShowAuthPage(true);
  };

  if (showAuthPage) {
    return <AuthPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <Layout 
      onSearch={setSearchResults} 
      isAuthenticated={isAuthenticated} 
      onLogout={handleLogout}
      onLoginClick={handleLoginClick}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/genre" replace />} />
        <Route path="/genre" element={<GenrePage onLike={toggleLikeSong} likedSongs={likedSongs} />} />
        <Route path="/mood" element={<MoodPage onLike={toggleLikeSong} likedSongs={likedSongs} />} />
        <Route path="/trending" element={<TrendingPage onLike={toggleLikeSong} likedSongs={likedSongs} />} />
        <Route 
          path="/history" 
          element={<HistoryPage isAuthenticated={isAuthenticated} onLike={toggleLikeSong} likedSongs={likedSongs} />} 
        />
        <Route 
          path="/search-results" 
          element={<SearchResultsPage searchResults={searchResults} onLike={toggleLikeSong} likedSongs={likedSongs} />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
