import Link from "next/link";
import { SongCard } from "./Song";
import { Song } from "./index";
// import { songs } from "../utils/songs";
import { SectionHeader } from "./SectionHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export const ListSongs = (): any => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/songs")
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="list mb-10">
      <div className="flex flex-row gap-4">
        <div className="top-songs w-9/12">
          <SectionHeader title="Top Songs" subtitle="See All" />
          <div className="songs grid grid-cols-5 gap-4">
            {songs.map((song, i) => {
              return (
                <SongCard
                  id={song.id}
                  name={song.name}
                  artist={song.artist}
                  cover={song.cover}
                  key={i}
                  album={song.album}
                  duration={song.duration}
                  year={song.year}
                  yt_url={song.yt_url}
                />
              );
            })}
          </div>
        </div>
        <div className="top-aritst grow">
          <SectionHeader title="Top Artist" subtitle="See All" />
          <div className="bg-[#161616] rounded-md mt-2 w-full h-fit px-10 py-2">
            <div className="flex flex-col justify-start content-start items-start">
              {songs.map((song, i) => {
                return (
                  <Link href={`/music/artist/${song.artist}`} key={i}>
                    <div className="font-bold inline-flex py-2">
                      <div className="number mr-5 self-center">{i + 1}</div>
                      <div className="data">
                        <div className="name">{song.artist}</div>
                        <div className="description text-sm text-gray-500">
                          {song.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
