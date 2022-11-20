import axios from "axios";
import { Artist, Song, Album } from "./index";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Skeleton from "@mui/material/Skeleton";
import { SelectChangeEvent } from "@mui/material/Select";
import { Selector } from "./Selector";
import { toast } from "react-toastify";

export const AddArtist = () => {
  const [artist, setArtist] = useState<Artist>({
    id: "",
    name: "",
    nacionality: "",
    image: "",
    age: "",
    numbers: "",
    albums: [],
    songs: [],
    isBand: false,
  });
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get(`https://${process.env.NEXT_PUBLIC_SERVER}/songs`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`https://${process.env.NEXT_PUBLIC_SERVER}/albums`)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleBand = () => {
    artist.isBand = !artist.isBand;
    console.log(artist);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setArtist({
      ...artist,
      [target.name]: target.value,
    });
    console.log(artist);
  };

  const handleChangeSong = (e: SelectChangeEvent<Song[]>) => {
    e.preventDefault();
    const value = e.target.value;
    setArtist({
      ...artist,
      songs: value as Song[],
    });
  };

  const handleChangeAlbum = (e: SelectChangeEvent<Album[]>) => {
    e.preventDefault();
    const value = e.target.value;
    setArtist({
      ...artist,
      albums: value as Album[],
    });
  };

  const handleAdd = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`https://${process.env.NEXT_PUBLIC_SERVER}/addArtist`, artist)
      .then((res) => {
        console.log(res);
        toast.success("Album added!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something fails!");
      });
  };

  return (
    <>
      <div className="grid grid-flow-col gap-2 grid-rows-5 grid-cols-3">
        <div className="row-span-5">
          {artist.image == "" ? (
            <Skeleton
              sx={{ bgcolor: "grey.820" }}
              variant="rounded"
              width={413}
              height={413}
            />
          ) : (
            <img
              src={artist.image}
              alt="image"
              className="w-fit rounded-md object-cover"
            />
          )}
          <input
            name="image"
            type="text"
            placeholder="image"
            className="mt-2 p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded w-full"
            onChange={handleChange}
          />
        </div>
        <input
          name="name"
          type="text"
          placeholder="name"
          className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded col-span-2"
          onChange={handleChange}
        />
        <input
          name="nacionality"
          type="text"
          placeholder="nacionality"
          className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded col-span-2"
          onChange={handleChange}
        />
        <input
          name="age"
          type="text"
          placeholder="age"
          className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded col-span-2"
          onChange={handleChange}
        />
        <div className="inline-flex gap-4 col-span-2">
          <Selector
            artist={artist.songs}
            iter={songs}
            callback={handleChangeSong}
            title="Songs"
          />
          <Selector
            artist={artist.albums}
            iter={albums}
            callback={handleChangeAlbum}
            title="Albums"
          />
        </div>
        <div className="inline-flex content-center items-center">
          <Checkbox onClick={handleBand} />
          <label htmlFor="isBand" className="ml-2">
            Is a band?
          </label>
        </div>
      </div>
      <button
        className="mt-2 px-4 py-2 rounded-sm bg-sky-500 hover:bg-sky-600 w-full"
        onClick={handleAdd}
      >
        Add
      </button>
    </>
  );
};
