import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiFillPlayCircle,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { BsVolumeUpFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectState } from "../store/authSlice";
import { Song } from "./index";
import { format } from "../utils/format";
import { toast } from "react-toastify";

interface Props {
  children: ReactJSXElement;
  song: Song;
  handleMute: any;
  handlePlayPause: any;
  elapsed: number;
  remaining: number;
}

export const Player = ({
  children,
  song,
  handleMute,
  handlePlayPause,
  elapsed,
  remaining,
}: Props) => {
  const user = useSelector(selectState);
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    const found = user.playlist.find((element) => element.id === song.id);
    if (found) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, []);

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      toast.success(`${song.name} added to the playlist!`);
    } else {
      toast.warning(`${song.name} removed from the playlist!`);
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0">
      <div className="">{children}</div>
      <div className="bg-[#161616b3] py-2 flex flex-row justify-between content-center items-center justify-items-center px-2">
        <div className="song-info w-1/6 flex flex-row justify-between content-center items-center gap-4">
          <img
            src={song.cover}
            alt={song.name}
            className="w-16 rounded-sm"
            layout="fill"
          />
          <div className="info">
            <p className="text-ellipsis overflow-hidden">{song.name}</p>
            <Link href={`/music/artist/${song.artist_id}`}>
              <p className="text-sm cursor-pointer">{song.artist}</p>
            </Link>
          </div>
          {favorite ? (
            <AiFillHeart
              className="text-2xl text-red-400 hover:text-gray-50"
              onClick={handleFavorite}
            />
          ) : (
            <AiOutlineHeart
              className="text-2xl hover:text-red-400"
              onClick={handleFavorite}
            />
          )}
        </div>
        <div className="inline-flex gap-7 items-center content-center">
          <div className="text-1xl">
            <time dateTime={`P${Math.round(elapsed)}S`}>{format(elapsed)}</time>
          </div>
          <div className="text-3xl hover:text-stone-400">
            <AiFillCaretLeft className="cursor-not-allowed" />
          </div>
          <div className="text-3xl hover:text-stone-400">
            <AiFillPlayCircle
              onClick={handlePlayPause}
              className="cursor-pointer"
            />
          </div>
          <div className="text-3xl hover:text-stone-400">
            <AiFillCaretRight className="cursor-not-allowed" />
          </div>
          <div className="text-1xl">
            <time dateTime={`P${Math.round(remaining)}S`}>
              {format(remaining)}
            </time>
          </div>
        </div>
        <div className="options text-1xl inline-flex gap-4">
          <div className="hover:text-stone-400">
            <FaMicrophone />
          </div>
          <div className="hover:text-stone-400">
            <BsVolumeUpFill onClick={handleMute} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
