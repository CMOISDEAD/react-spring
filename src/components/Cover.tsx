import Link from "next/link";
import { Album } from "./index";

export const Cover = ({ id, image, name, artist }: Album): any => {
  return (
    <Link href={`/music/album/${id}`}>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="card rounded-md w-2/6 bg-cover bg-center mx-3 border border-zinc-900 hover:border-zinc-500 cursor-pointer"
      >
        <div className="info pt-36 pr-14 pl-2 pb-2">
          <p className="title font-bold">{name}</p>
          <p className="artist italic">{artist}</p>
        </div>
      </div>
    </Link>
  );
};
