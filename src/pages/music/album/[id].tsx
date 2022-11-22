import { NextPage } from "next";
import { Layout } from "../../../components/Layout";
import { Album } from "../../../components/index";
import {
  AiFillPlayCircle,
  AiOutlineHeart,
  AiOutlineEllipsis,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FiDisc } from "react-icons/fi";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

interface Props {
  album: Album;
}

const AlbumView: NextPage<Props> = ({ album }) => {
  return (
    <Layout>
      <Head>
        <title>{album.name}</title>
        <meta name="description" content={`${album.name} - ${album.artist}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row flex-nowrap justify-start content-center items-center gap-4 mb-5">
        <img src={album.image} className="w-3/12 rounded-md" alt="altimage" />
        <div className="flex flex-col justify-between content-center">
          <p className="text-sm">Top Dawg Entertainment</p>
          <p className="text-5xl font-bold py-24">{album.name}</p>
          <Link
            className="text-sm font-bold"
            href={`/music/artist/${album.artist_id}`}
          >
            {album.artist}
          </Link>
          <p className="text-sm">2017 - 14 Songs, {album.duration} Minutes</p>
        </div>
      </div>
      <div className="dashboard flex flex-row justify-start items-center content-center gap-4 text-5xl mb-5">
        <AiFillPlayCircle className="hover:text-stone-400" />
        <AiOutlineHeart className="hover:text-stone-400" />
        <AiOutlineEllipsis className="hover:text-stone-400" />
      </div>
      <div className="songs-list">
        <div className="indicator flex flex-row justify-between content-center items-center text-sm border-b pb-2 uppercase">
          <div className="inline-flex content-center items-center">
            <p className="mr-5">#</p>
            <p>Title</p>
          </div>
          <p>
            <AiOutlineClockCircle />
          </p>
        </div>
        <div className="inline-flex content-center items-center mt-3">
          <FiDisc /> <p className="pl-2">Disc 1</p>
        </div>
        <div className="songs">
          {album.songs.map((song, i) => {
            return (
              <Link href={`/music/song/${song.id}`} key={i}>
                <div className="flex flex-row justify-between content-center items-center g-4 p-3 my-3 hover:bg-[#161616] rounded-md">
                  <div className="inline-flex items-center content-center">
                    <p className="mr-5 text-stone-400">{i + 1}</p>
                    <p className="text-start">
                      {song.name} <br />{" "}
                      <span className="text-sm text-stone-400">
                        {song.artist}
                      </span>
                    </p>
                  </div>
                  <p className="text-stone-400">{song.duration} minutes</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

interface obj {
  id: number;
}

interface Params {
  params: obj;
}

export const getServerSideProps = async ({ params }: Params) => {
  const res = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SERVER}/getAlbum`,
    params.id
  );
  const album = await res.data;
  return {
    props: {
      album,
    },
  };
};

export default AlbumView;
