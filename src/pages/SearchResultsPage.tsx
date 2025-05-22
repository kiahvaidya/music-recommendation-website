
import { SongGrid } from "@/components/SongGrid";
import { Song } from "@/lib/types";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { SongDetailView } from "@/components/SongDetailView";

interface SearchResultsPageProps {
  searchResults: Song[];
  onLike: (songId: string) => void;
  likedSongs: string[];
}

export default function SearchResultsPage({ 
  searchResults, 
  onLike, 
  likedSongs 
}: SearchResultsPageProps) {
  const location = useLocation();
  const query = location.state?.query || "";
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleSongClick = (song: Song) => {
    setSelectedSong(song);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  // Log for debugging
  useEffect(() => {
    console.log("Search Results:", searchResults);
    console.log("Query:", query);
  }, [searchResults, query]);

  return (
    <div>
      <SongGrid
        songs={searchResults}
        title={`Search Results for "${query}"`}
        description={`${searchResults.length} songs found`}
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
