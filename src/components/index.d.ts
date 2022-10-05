export type Album = {
  id: string;
  image: string;
  name: string;
  artist: string;
  duration: int;
  songs: Song[];
  artist_id: int;
};

export type Artist = {
  id: string;
  name: string;
  nacionality: string;
  image: string;
  age: int;
  numbers: int;
  albums: Album[];
  songs: Song[];
  isBand: boolean;
};

export type Song = {
  id: string;
  name: string;
  album: string;
  artist: string;
  cover: string;
  duration: int;
  year: int;
  yt_url: string;
  artist_id: int;
};
