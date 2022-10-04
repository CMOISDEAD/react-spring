export type Album = {
  id: string;
  image: string;
  name: string;
  artist: string;
  duration: int;
  songs: Song[];
};

export type Artist = {
  id: string;
  name: string;
  age: int;
  gender: string;
  description: string;
  numbers: int;
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
};
