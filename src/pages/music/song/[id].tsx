import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import ReactPlayer from "react-player";
import { Song } from "../../../components/index";
import { Layout } from "../../../components/Layout";

interface Props {
  song: Song;
}

const SongView: NextPage<Props> = ({ song }) => {
  return (
    <Layout>
      <div className="flex flex-col justify-center content-center items-center">
        <ReactPlayer url={song.yt_url} className="rounded-md" />
        <p className="text-2xl font-bold">{song.name}</p>
        <Link href={`/music/artist/${song.artist_id}`}>
          <p className="text-sm cursor-pointer">{song.artist}</p>
        </Link>
      </div>
      <div className="flex flex-row justify-start items-center content-center gap-4">
        <img
          src={song.cover}
          alt={song.name}
          className="object-cover"
          width={150}
          height={150}
        />
        <div className="info gap-4">
          <div className="text-xl font-bold capitalize">{song.album}</div>
          <div className="text-sm italic">
            {song.artist} - {song.year}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER}/allSongs`);
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
  const res = await axios.post(
    `http://${process.env.NEXT_PUBLIC_SERVER}/getSong`,
    params.id
  );
  const song = await res.data;
  return {
    props: {
      song,
    },
  };
};

export default SongView;
