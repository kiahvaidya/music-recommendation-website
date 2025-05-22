import { SongCard } from "./SongCard";
import { Song } from "../lib/types";

interface SongGridProps {
  songs: Song[];
  title: string;
  description?: string;
  onLike?: (songId: string) => void;
  likedSongs?: string[];
  onSongClick?: (song: Song) => void;
}

export function SongGrid({ 
  songs, 
  title, 
  description, 
  onLike,
  likedSongs = [],
  onSongClick
}: SongGridProps) {
  // Handle empty state
  if (!songs || !songs.length) {
    return (
      <div className="w-full p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        <div className="p-12 border rounded-lg">
          <p className="text-muted-foreground">No songs found</p>
        </div>
      </div>
    );
  }

  const handleSongClick = (song: Song) => {
    if (onSongClick) {
      onSongClick(song);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {songs.map((song) => (
          <SongCard 
            key={song.id} 
            song={song} 
            onLike={onLike}
            isLiked={likedSongs.includes(song.id)}
            onClick={onSongClick ? () => handleSongClick(song) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
