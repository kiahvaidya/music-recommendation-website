import { useState, useEffect } from "react";
import { SongGrid } from "@/components/SongGrid";
import { getTrendingSongs } from "@/lib/mockData";
import { Song } from "@/lib/types";
import { SongDetailView } from "@/components/SongDetailView";

interface TrendingPageProps {
  onLike: (songId: string) => void;
  likedSongs: string[];
}

export default function TrendingPage({ onLike, likedSongs }: TrendingPageProps) {
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    setTrendingSongs(getTrendingSongs());
  }, []);

  const handleSongClick = (song: Song) => {
    setSelectedSong(song);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div>
      <SongGrid
        songs={trendingSongs}
        title="Trending Songs"
        description="Most liked songs across all users"
        onLike={onLike}
        likedSongs={likedSongs}
        onSongClick={handleSongClick}
      />
      
      {selectedSong && (
        <SongDetailView
          song={selectedSong}
          isOpen={showDetail}
          onClose={handleCloseDetail}
          onLike={onLike}
          isLiked={likedSongs.includes(selectedSong.id)}
        />
      )}
    </div>
  );
}
