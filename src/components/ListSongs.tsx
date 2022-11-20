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
    <div className="list mb-3">
      <div className="flex flex-row gap-4">
        <div className="top-songs w-9/12">
          <SectionHeader title="Top Songs" subtitle="See All" />
          <div className="w-full inline-flex gap-4 overflow-x-scroll">
            {shuffled.slice(0, 12).map((song, i) => {
              return <SongCard song={song} key={i} show={true} />;
            })}
          </div>
        </div>
        <div className="top-aritst grow">
          <SectionHeader title="Top Artist" subtitle="See All" />
          <div className="bg-[#161616] rounded-md mt-2 w-full h-[82%] px-10 py-2">
            <div className="flex flex-col justify-start content-start items-start">
              {artists.map((artist, i) => {
                return (
                  <Link href={`/music/artist/${artist.id}`} key={i}>
                    <div className="font-bold inline-flex py-2 cursor-pointer">
                      <div className="number mr-5 self-center">{i + 1}</div>
                      <div className="data">
                        <div className="flex items-center content-center gap-2">
                          <div>{artist.name}</div>
                          {i == 0 ? (
                            <div className="text-orange-300 gap-1 inline-flex content-center items-center">
                              <AiFillFire />
                              <span className="text-sm">Hot</span>
                            </div>
                          ) : (
                            <div className=" gap-1 inline-flex content-center items-center">
                              {Math.floor(Math.random() * (i + 1)) % 2 ? (
                                <div className="text-green-300 inline-flex content-center items-center">
                                  <FiArrowUp />
                                  {Math.floor(Math.random() * (i * 2))}
                                </div>
                              ) : (
                                <div className="text-red-400 inline-flex content-center items-center">
                                  <FiArrowDown />
                                  {Math.floor(Math.random() * (i * 2))}
                                </div>
                              )}
                            </div>
                          )}
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
