
export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  coverUrl: string;
  likes: number;
  dislikes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  likedSongs: string[];
  history: string[];
}

export type Mood = 'Happy' | 'Sad' | 'Energetic' | 'Relaxed' | 'Romantic' | 'Focused';
export type Genre = 'Pop' | 'Rock' | 'Hip Hop' | 'R&B' | 'Electronic' | 'Jazz' | 'Classical' | 'Country';
