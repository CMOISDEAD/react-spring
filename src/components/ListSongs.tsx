import Link from "next/link";
import { SongCard } from "./Song";
import { Artist, Song } from "./index";
import { SectionHeader } from "./SectionHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillFire } from "react-icons/ai";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export const ListSongs = (): any => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtist] = useState<Artist[]>([]);
  const shuffled = songs.sort(() => 0.5 - Math.random());

  useEffect(() => {
    axios
      .get(`https://${process.env.NEXT_PUBLIC_SERVER}/songs`)
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://${process.env.NEXT_PUBLIC_SERVER}/artist`)
      .then((res) => setArtist(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="list">
      <div className="flex flex-row gap-4">
        <div className="top-songs w-full">
          <SectionHeader title="Top Songs" subtitle="See All" />
          <div className="w-full inline-flex gap-4 overflow-x-scroll">
            {shuffled.slice(0, 12).map((song, i) => {
              return <SongCard song={song} key={i} show={true} />;
            })}
          </div>
        </div>
      </div>
    </div >
  );
};
