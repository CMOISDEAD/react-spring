import axios from "axios";
import { NextPage } from "next";
import { ReactNode, ReactPropTypes } from "react";
import ReactPlayer from "react-player";
import { Song } from "../../../components/index";
import { Layout } from "../../../components/Layout";

interface Props {
  song: Song;
}

const SongView: NextPage<Props> = ({ song }) => {
  return (
    <Layout>
      <div className="flex flex-col justify-center content-center items-center py-14">
        {/* <img src={song.cover} alt={song.name} className="w-2/6 rounded-md"/> */}
        <ReactPlayer url={song.yt_url} className="rounded-md" />
        <p className="text-2xl font-bold">{song.name}</p>
        <p className="text-sm">{song.artist}</p>
        <p className="text-sm">{song.album}</p>
        <p className="text-sm italic">{song.year}</p>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:8080/allSongs");
  const songs = await res.json();

  const paths = songs.map((song: string) => ({
    params: {
      id: song,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface obj {
  id: number;
}

interface Params {
  params: obj;
}

export const getStaticProps = async ({ params }: Params) => {
  const res = await axios.post("http://localhost:8080/getSong", params.id);
  const song = await res.data;
  return {
    props: {
      song,
    },
  };
};

export default SongView;
