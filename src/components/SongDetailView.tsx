
import { Heart, Share2, ListMusic, Play, Clock } from "lucide-react";
import { Song } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Reliable image placeholders
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=250",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=250",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=250"
];

interface SongDetailViewProps {
  song: Song | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (songId: string) => void;
  isLiked: boolean;
}

export function SongDetailView({ 
  song, 
  isOpen, 
  onClose, 
  onLike, 
  isLiked 
}: SongDetailViewProps) {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    if (!song) return;
    setLiked(!liked);
    onLike(song.id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Use a reliable placeholder image
    e.currentTarget.src = PLACEHOLDER_IMAGES[0];
  };

  if (!song) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative h-64 w-full">
          <img 
            src={song.coverUrl} 
            alt={`${song.title} by ${song.artist}`}
            className="h-full w-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="absolute right-2 top-2 rounded-full bg-background/20 text-white hover:bg-background/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </Button>
        </div>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{song.title}</DialogTitle>
            <p className="text-lg text-muted-foreground">{song.artist}</p>
          </DialogHeader>
          <div className="flex items-center gap-2 mt-4">
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">{song.genre}</span>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">{song.mood}</span>
          </div>
          <div className="flex items-center justify-between mt-6">
            <Button className="flex-1 gap-2">
              <Play className="h-5 w-5" />
              Play Now
            </Button>
            <div className="flex gap-2 ml-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleLike}
                className={liked ? "text-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <ListMusic className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">3:45</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{song.likes}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Similar Songs</h3>
              <div className="grid grid-cols-3 gap-2">
                {PLACEHOLDER_IMAGES.map((imgSrc, i) => (
                  <div key={i} className="rounded-md overflow-hidden">
                    <div className="relative aspect-square">
                      <img 
                        src={imgSrc} 
                        alt="Recommendation"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
