import axios from "axios";
import { Progress } from "flowbite-react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Song } from "../../../components/index";
import { Layout } from "../../../components/Layout";

interface Props {
  song: Song;
}

const SongView: NextPage<Props> = ({ song }) => {
  const [played, setPlayed] = useState<number>(0);
  const [data, setData] = useState({
    playing: true,
    seeking: false,
    playedSecond: 0,
    totalTime: 0,
  });
  let playerRef = useRef();

  return (
    <Layout>
      <Head>
        <title>{song.name}</title>
        <meta name="description" content={`${song.name} - ${song.artist}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center content-center items-center">
        <ReactPlayer
          ref={(player: any) => (playerRef = player)}
          url={song.yt_url}
          playing={data.playing}
          className="rounded-md"
          onProgress={(e) =>
            setData({ ...data, playedSecond: e.playedSeconds })
          }
          onDuration={(e) => setData({ ...data, totalTime: e })}
          onEnded={() => console.log("finish")}
        />
        <p className="text-2xl font-bold">{song.name}</p>
        <Link href={`/music/artist/${song.artist_id}`}>
          <p className="text-sm cursor-pointer">{song.artist}</p>
        </Link>
      </div>
      <div className="my-3 w-5/6 justify-center mx-auto">
        <input
          type="range"
          min="0"
          step="any"
          className="w-full"
          value={!data.seeking ? data.playedSecond : played}
          max={data.totalTime}
          onMouseDown={() => setData({ ...data, seeking: true })}
          onMouseUp={(e) => {
            setData({ ...data, seeking: false });
            playerRef.seekTo(parseFloat(e.target.value));
          }}
          onChange={(e) => setPlayed(parseFloat(e.target.value))}
        />
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
