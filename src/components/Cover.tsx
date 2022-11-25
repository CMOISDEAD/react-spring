import Link from "next/link";
import { Album } from "./index";

export const Cover = ({ id, image, name, artist }: Album): any => {
  return (
    <Link href={`/music/album/${id}`} key={id}>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="card rounded-md w-full h-[30vh] bg-cover bg-center mx-3 border border-zinc-900 hover:border-zinc-500 cursor-pointer responsive-album"
      >
        <div className="info">
          <p className="title font-bold">{name}</p>
          <p className="artist italic">{artist}</p>
        </div>
      </div>
    </Link>
  );
};
