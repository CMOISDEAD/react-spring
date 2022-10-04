import Link from "next/link";
import { Song } from "./index";

export const SongCard = ({ id, cover, name, artist }: Song): any => {
  return (
    <>
      <Link href={`/music/song/${id}`}>
        <div className="song rounded-md bg-[#161616] p-2 my-2 h-full border border-zinc-900 hover:border-zinc-500">
          <img src={cover} alt="Album cover" className="rounded-sm" />
          <p className="text-ellipsis overflow-hidden font-bold">{name}</p>
          <p className="artist italic">{artist}</p>
        </div>
      </Link>
    </>
  );
};
