import axios from "axios";
import { useEffect, useState } from "react";
import { Cover } from "./Cover";
import { Album } from "./index";
import { SectionHeader } from "./SectionHeader";

export const Carousell = (): any => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get(`http://${process.env.NEXT_PUBLIC_SERVER}/albums`)
      .then((res) => {
        setAlbums(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mb-5">
      <SectionHeader title="TDE Presents" subtitle="Know More" />
      <div className="carousell flex flex-row justify-center content-center">
        {albums.map((album, i) => {
          return (
            <Cover
              id={album.id}
              image={album.image}
              name={album.name}
              artist={album.artist}
              duration={album.duration}
              key={i}
              songs={[]}
              artist_id={undefined}
            />
          );
        })}
      </div>
    </div>
  );
};
