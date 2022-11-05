import axios from "axios";
import { useEffect, useState } from "react";
import { Artist, Song, Album } from "./index";
import Skeleton from "@mui/material/Skeleton";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";

export const AddSong = () => {
  const [song, setSong] = useState<Song>({
    id: "",
    name: "",
    artist_id: "",
    artist: "",
    album: "",
    year: "",
    cover: "",
    yt_url: "",
    duration: 0,
  });
  const [artists, setArtist] = useState<Artist[]>([]);
  const [sArtist, setSArtist] = useState<Artist>();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get(`http://${process.env.NEXT_PUBLIC_SERVER}/artist`)
      .then((res) => setArtist(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`http://${process.env.NEXT_PUBLIC_SERVER}/albums`)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setSong({
      ...song,
      [target.name]: target.value,
    });
  };

  const handleArtist = (e: SelectChangeEvent<Artist>) => {
    e.preventDefault();
    const value: Artist = e.target.value as Artist;
    setSong({
      ...song,
      artist_id: value.id,
      [e.target.name]: value.name,
    });
    setSArtist(value);
  };

  const handleAlbum = (e: SelectChangeEvent<Album>) => {
    e.preventDefault();
    const value: Album = e.target.value as Album;
    setSong({
      ...song,
      cover: value.image,
      album: value.name,
    });
  };

  const handleAdd = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(song);
    axios
      .post(`http://${process.env.NEXT_PUBLIC_SERVER}/addSong`, song)
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
      <div className="grid grid-flow-col gap-2 grid-rows-6 grid-cols-4">
        <div className="row-span-5">
          {!sArtist ? (
            <Skeleton
              sx={{ bgcolor: "grey.820" }}
              variant="rounded"
              width={308}
              height={308}
            >
              <img src="" alt="" layout="fill" />
            </Skeleton>
          ) : (
            <Image
              src={sArtist && sArtist.image}
              alt="image"
              className="w-fit rounded-md object-cover"
              layout="fill"
            />
          )}
          <InputLabel id="artist-select-label" className="text-white">
            Artist
          </InputLabel>
          <Select
            labelId="artist-select-label"
            id="artist-select"
            name="artist"
            label="Artist"
            onChange={handleArtist}
            className="w-full text-white border-white"
            defaultValue=""
          >
            {artists.map((artist, i) => {
              return (
                <MenuItem value={artist} key={i}>
                  {artist.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div>
          <InputLabel id="album-select-label" className="text-white">
            Album
          </InputLabel>
          <Select
            labelId="album-select-label"
            id="album-select"
            name="album"
            label="Album"
            onChange={handleAlbum}
            className="w-full text-white border-white"
            defaultValue=""
          >
            {albums.map((album, i) => {
              return (
                <MenuItem value={album} key={i}>
                  {album.name}
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
        <input
          name="yt_url"
          type="text"
          placeholder="youtube url"
          className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded col-span-2"
          onChange={handleChange}
        />
        <input
          name="gener"
          type="text"
          placeholder="gener"
          className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded col-span-2"
          onChange={handleChange}
        />
        <input
          name="year"
          type="text"
          placeholder="year"
          className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636] rounded col-span-2"
          onChange={handleChange}
        />
        <div className="row-span-5">
          {song.cover == "" ? (
            <Skeleton
              sx={{ bgcolor: "grey.820" }}
              variant="rounded"
              width={308}
              height={308}
            />
          ) : (
            <img
              src={song.cover}
              alt="image"
              className="rounded-md object-cover"
            />
          )}
          <input
            name="cover"
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
