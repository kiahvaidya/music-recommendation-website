
import { useState, useEffect } from "react";
import { SongGrid } from "@/components/SongGrid";
import { getSongsByGenre } from "@/lib/mockData";
import { Song, Genre } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GenrePageProps {
  onLike: (songId: string) => void;
  likedSongs: string[];
}

const genres: Genre[] = [
  "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Classical", "Country"
];

export default function GenrePage({ onLike, likedSongs }: GenrePageProps) {
  const [activeGenre, setActiveGenre] = useState<Genre>("Pop");
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    setSongs(getSongsByGenre(activeGenre));
  }, [activeGenre]);

  return (
    <div>
      <Tabs defaultValue={activeGenre} onValueChange={(value) => setActiveGenre(value as Genre)}>
        <TabsList className="w-full flex flex-wrap justify-start mb-6 h-auto">
          {genres.map((genre) => (
            <TabsTrigger key={genre} value={genre} className="px-4 py-2">
              {genre}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {genres.map((genre) => (
          <TabsContent key={genre} value={genre}>
            <SongGrid
              songs={songs}
              title={`${genre} Music`}
              description={`Discover the best ${genre} tracks`}
              onLike={onLike}
              likedSongs={likedSongs}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
