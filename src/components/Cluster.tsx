import { Album, Artist, Song } from "./index";
import axios from "axios";
import { useState } from "react";
import { Modal } from "./Modal";
import { sleep } from "../utils/sleep";
import { Router } from "next/router";

interface Structure<T> {
  path: string;
  data: T[];
}

interface Routes {
  songs: Structure<Song>;
  artists: Structure<Artist>;
  albums: Structure<Album>;
}

export const Cluster = () => {
  const [data, setData] = useState<Routes>();
  const [current, setCurrent] = useState();
  const [show, setShow] = useState(false);
  let fileReader: any;

  const request = (path: string, data: any) => {
    axios
      .post(path, data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const handleFileRead = () => {
    const content: Routes = JSON.parse(fileReader.result);
    const { songs, albums, artists } = content;
    setData({
      songs,
      albums,
      artists,
    });
  };

  const handleClick = (files: any) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(files[0]);
  };

  const handleUpload = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { songs, albums, artists }: Routes = data as Routes;
    for (let song of songs.data) {
      request(songs.path, song);
      console.table(song);
      setCurrent(song as any);
      setShow(true);
      await sleep(1000);
    }
    for (let artist of artists.data) {
      request(artists.path, artist);
      console.table(artist);
      setCurrent(artist as any);
      setShow(true);
      await sleep(1000);
    }
    for (let album of albums.data) {
      request(albums.path, album);
      console.table(album);
      setCurrent(album as any);
      setShow(true);
      await sleep(1000);
    }
    setShow(false);
  };

  return (
    <div className="w-full">
      <label
        className="block mb-2 text-sm font-medium text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        id="file_input"
        name="file"
        type="file"
        aria-describedby="file_input_help"
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onChange={(e) => handleClick(e.target.files)}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        JSON, TOML or YAML (MAX. 1Gb).
      </p>
      <button
        type="button"
        className="inline-block w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={handleUpload}
      >
        Submit
      </button>
      <Modal show={show} current={current} />
    </div>
  );
};
