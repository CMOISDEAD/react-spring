import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { ToastContainer } from "react-toastify";
import { Song } from "../../../components/index";
import { Navbar } from "../../../components/Navbar";
import { Player } from "../../../components/Player";

interface Props {
  song: Song;
}

const contextClass = {
  success: "bg-[#3636363b] border border-green-500 text-green-500",
  error: "bg-[#DA1E283b] border border-red-500 text-white",
  info: "bg-[#FDDC693b] border border-yellow-500 text-white",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

const SongView: NextPage<Props> = ({ song }) => {
  const [played, setPlayed] = useState<number>(0);
  const [data, setData] = useState({
    muted: false,
    playing: true,
    seeking: false,
    currentSeconds: 0,
    duration: 0,
  });
  let playerRef: any = useRef();

  const handlePlayPause = () => {
    setData({
      ...data,
      playing: !data.playing,
    });
  };

  const handleMute = () => {
    setData({
      ...data,
      muted: !data.muted,
    });
  };

  const handleSeekChange = (e: any) => {
    setPlayed(parseFloat(e.target.value));
  };

  return (
    <div className="h-screen">
      <Head>
        <title>{song.name}</title>
        <meta name="description" content={`${song.name} - ${song.artist}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex flex-col justify-center content-center items-center h-[70%]">
        <ReactPlayer
          ref={(player: any) => (playerRef = player)}
          width="100%"
          url={song.yt_url}
          playing={data.playing}
          controls={false}
          muted={data.muted}
          onProgress={(e) => {
            if (!data.seeking) {
              setPlayed(e.played);
              setData({ ...data, currentSeconds: e.playedSeconds });
            }
          }}
          onDuration={(e) => setData({ ...data, duration: e })}
          onEnded={() => console.log("finish")}
          className="rounded-md"
        />
      </div>
      <Player
        song={song}
        handleMute={handleMute}
        handlePlayPause={handlePlayPause}
        elapsed={data.duration * played}
        remaining={data.duration * (1 - played)}
      >
        <input
          type="range"
          min="0"
          step="any"
          max={data.duration}
          value={!data.seeking ? data.currentSeconds : played}
          onMouseDown={() => setData({ ...data, seeking: true })}
          onMouseUp={(e) => {
            setData({ ...data, seeking: false });
            const target = e.target as HTMLInputElement;
            playerRef.seekTo(parseFloat(target.value));
          }}
          onChange={handleSeekChange}
          className="w-full h-1 absolute top-0"
        />
      </Player>
      <ToastContainer
        toastClassName={({ type }: any) =>
          `${
          // contextClass[type || "default"]
          type
          } w-full flex items-center justify-between p-4 max-w-xs rounded-md backdrop-blur-md cursor-pointer my-2 transition-all`
        }
        bodyClassName={() => "ml-3 text-sm font-normal"}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        icon={false}
      />
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SERVER}/allSongs`);
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
  console.log(params.id);
  const res = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SERVER}/getSong`,
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
