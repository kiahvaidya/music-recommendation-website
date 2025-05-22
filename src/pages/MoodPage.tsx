
import { useState, useEffect } from "react";
import { SongGrid } from "@/components/SongGrid";
import { getSongsByMood } from "@/lib/mockData";
import { Song, Mood } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface MoodPageProps {
  onLike: (songId: string) => void;
  likedSongs: string[];
}

const moods: Mood[] = [
  "Happy", "Sad", "Energetic", "Relaxed", "Romantic", "Focused"
];

// Mood icons or emoji representations
const moodIcons: Record<Mood, string> = {
  "Happy": "😊",
  "Sad": "😢",
  "Energetic": "⚡",
  "Relaxed": "😌",
  "Romantic": "❤️",
  "Focused": "🧠"
};

export default function MoodPage({ onLike, likedSongs }: MoodPageProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (selectedMood) {
      setSongs(getSongsByMood(selectedMood));
    } else {
      setSongs([]);
    }
  }, [selectedMood]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {moods.map((mood) => (
            <Card 
              key={mood}
              className={`cursor-pointer transition-all hover:scale-105 ${selectedMood === mood ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedMood(mood)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <span className="text-4xl mb-2">{moodIcons[mood]}</span>
                <span className="font-medium">{mood}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedMood && (
        <SongGrid
          songs={songs}
          title={`${selectedMood} Music`}
          description={`Songs to match your ${selectedMood.toLowerCase()} mood`}
          onLike={onLike}
          likedSongs={likedSongs}
        />
      )}
    </div>
  );
}
