import { Heart, Play } from "lucide-react";
import { cn } from "../lib/utils"; 
import { Song } from "../lib/types"; 
import { useState } from "react";

interface SongCardProps {
  song: Song;
  onLike?: (songId: string) => void;
  isLiked?: boolean;
  className?: string;
  onClick?: () => void; // Added onClick prop
}

export function SongCard({ song, onLike, isLiked = false, className, onClick }: SongCardProps) {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) {
      onLike(song.id);
    }
  };

  return (
    <div className={cn("group relative rounded-lg p-2 transition-all hover:bg-accent", className)} onClick={onClick}>
      <div className="relative aspect-square overflow-hidden rounded-md">
        <img
          src={song.coverUrl}
          alt={`${song.title} by ${song.artist}`}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="ml-1 h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium leading-none line-clamp-1">{song.title}</h3>
          <button 
            onClick={handleLike}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              liked ? "text-red-500" : "text-muted-foreground hover:text-primary"
            )}
          >
            <Heart className={cn("h-4 w-4", liked ? "fill-current" : "")} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{song.artist}</p>
        <div className="mt-1 flex items-center text-xs">
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{song.genre}</span>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-muted-foreground"></span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{song.mood}</span>
        </div>
      </div>
    </div>
  );
}
