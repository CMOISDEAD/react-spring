import Skeleton from "@mui/material/Skeleton";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { Artist } from "./index";

export const AddAlbum = () => {
  const [album, setAlbum] = useState({
    name: "",
    artist: "",
    artist_id: "",
    image: "",
    duration: "",
  });
  const [artists, setArtist] = useState<Artist[]>([]);
  const [sArtist, setSArtist] = useState<Artist>();

  useEffect(() => {
    axios
      .get(`http://${process.env.NEXT_PUBLIC_SERVER}/artist`)
      .then((res) => setArtist(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setAlbum({
      ...album,
      [target.name]: target.value,
    });
  };

  const handleArtist = (e: SelectChangeEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setAlbum({
      ...album,
      [target.name]: target.value as string,
    });
    setSArtist(artists.find((artist) => artist.name == target.value));
  };

  const handleAdd = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAlbum({
      ...album,
      artist_id: sArtist.id, // FIX: undefined???
    });
    axios
      .post(`http://${process.env.NEXT_PUBLIC_SERVER}/addAlbum`, album)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="grid grid-flow-col gap-2 grid-rows-5 grid-cols-4">
        <div className="row-span-5">
          {!sArtist ? (
            <Skeleton
              sx={{ bgcolor: "grey.820" }}
              variant="rounded"
              width={308}
              height={308}
            />
          ) : (
            <img
              src={sArtist && sArtist.image}
              alt="image"
              className="w-fit rounded-md object-cover"
            />
          )}
          <InputLabel id="album-select-label" className="text-white">
            Artist
          </InputLabel>
          <Select
            labelId="album-select-label"
            id="album-select"
            label="artist"
            onChange={handleArtist}
            className="w-full text-white border-white"
          >
            {artists.map((artist, i) => {
              return (
                <MenuItem value={artist.name} key={i}>
                  {artist.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <input
          name="name"
          type="text"
          placeholder="title"
          className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded col-span-2"
          onChange={handleChange}
        />
        <input
          name="duration"
          type="text"
          placeholder="duration"
          className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded col-span-2"
          onChange={handleChange}
        />
        <div className="row-span-5">
          {album.image == "" ? (
            <Skeleton
              sx={{ bgcolor: "grey.820" }}
              variant="rounded"
              width={308}
              height={308}
            />
          ) : (
            <img
              src={album.image}
              alt="image"
              className="rounded-md object-cover"
            />
          )}
          <input
            name="image"
            type="text"
            placeholder="image url"
            className="mt-2 p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded w-full"
            onChange={handleChange}
          />
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
