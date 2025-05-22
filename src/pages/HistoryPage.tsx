
import { useState, useEffect } from "react";
import { SongGrid } from "@/components/SongGrid";
import { getUserHistory, getUserLikedSongs } from "@/lib/mockData";
import { Song } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoryPageProps {
  isAuthenticated: boolean;
  onLike: (songId: string) => void;
  likedSongs: string[];
}

export default function HistoryPage({ isAuthenticated, onLike, likedSongs }: HistoryPageProps) {
  const [historySongs, setHistorySongs] = useState<Song[]>([]);
  const [likedSongsList, setLikedSongsList] = useState<Song[]>([]);
  const [activeTab, setActiveTab] = useState("history");

  useEffect(() => {
    if (isAuthenticated) {
      setHistorySongs(getUserHistory());
      setLikedSongsList(getUserLikedSongs());
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <div className="max-w-md">
          <p className="text-muted-foreground mb-4">
            You need to be logged in to view your history and liked songs.
          </p>
          <div className="p-8 border rounded-lg">
            <p className="text-muted-foreground">Please log in to continue</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="history" className="flex-1">
            Listening History
          </TabsTrigger>
          <TabsTrigger value="liked" className="flex-1">
            Liked Songs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <SongGrid
            songs={historySongs}
            title="Your Listening History"
            description="Songs you've recently played"
            onLike={onLike}
            likedSongs={likedSongs}
          />
        </TabsContent>
        
        <TabsContent value="liked">
          <SongGrid
            songs={likedSongsList}
            title="Your Liked Songs"
            description="Songs you've marked as favorites"
            onLike={onLike}
            likedSongs={likedSongs}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
