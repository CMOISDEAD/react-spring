import { NextPage } from "next";
import { Layout } from "../../../components/Layout";
import { Artist } from "../../../components/index";
import {
  AiFillPlayCircle,
  AiOutlineHeart,
  AiOutlineEllipsis,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FiDisc } from "react-icons/fi";
import axios from "axios";
import Head from "next/head";
import { Cover } from "../../../components/Cover";
import Link from "next/link";

interface Props {
  artist: Artist;
}

const ArtistView: NextPage<Props> = ({ artist }) => {
  return (
    <Layout>
      <Head>
        <title>{artist.name}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="flex flex-row flex-nowrap justify-start content-center items-center gap-4 mb-5">
        <img src={artist.image} className="w-3/12 rounded-md" />
        <div className="flex flex-col justify-between content-center">
          <p className="text-sm">Top Dawg Entertainment</p>
          <p className="text-6xl font-bold py-24">{artist.name}</p>
          <p className="text-sm font-bold">{artist.nacionality}</p>
          <p className="text-sm">2017 - 14 Songs, 55 Minutes</p>
        </div>
      </div>
      <div className="dashboard flex flex-row justify-start items-center content-center gap-4 text-5xl mb-5">
        <AiFillPlayCircle className=" hover:text-stone-400" />
        <AiOutlineHeart className=" hover:text-stone-400" />
        <AiOutlineEllipsis className=" hover:text-stone-400" />
      </div>
      <div className="mt-2 mb-4">
        <p className="text-2xl font-bold capitalize pb-3">
          {artist.name} albums
        </p>
        <div className="carousell w-full inline-flex gap-4 overflow-x-scroll">
          {artist.albums.map((album, i) => {
            return (
              <Cover
                id={album.id}
                name={album.name}
                artist={artist.name}
                image={album.image}
                songs={artist.songs}
                artist_id={artist.id}
                duration={album.duration}
              />
            );
          })}
        </div>
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
          {artist.songs.map((song, i) => {
            return (
              <div
                key={i}
              >

                <Link href={`/music/song/${song.id}`}>
                  <div
                    className="flex flex-row justify-between content-center items-center g-4 p-3 my-3 hover:bg-[#161616] rounded-md"
                  >
                    <div className="inline-flex items-center content-center">
                      <p className="mr-5 text-stone-400">{i + 1}</p>
                      <p className="text-start">
                        {song.name} <br />{" "}
                        <span className="text-sm text-stone-400">
                          {song.artist}
                        </span>
                      </p>
                    </div>
                    <p className="text-stone-400">{song.duration}</p>
                  </div>
                </Link>

              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SERVER}/allArtist`);
  const songs = await res.json();

  const paths = songs.map((artist: string) => ({
    params: {
      id: artist,
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
    `https://${process.env.NEXT_PUBLIC_SERVER}/getArtist`,
    params.id
  );
  const artist = await res.data;
  return {
    props: {
      artist,
    },
  };
};

export default ArtistView;
