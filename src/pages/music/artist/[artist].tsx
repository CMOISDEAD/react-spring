import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout";
import {
  AiFillPlayCircle,
  AiOutlineHeart,
  AiOutlineEllipsis,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FiDisc } from "react-icons/fi";

const Artist: NextPage = () => {
  const router = useRouter();
  const { artist } = router.query;

  return (
    <Layout>
      <div className="flex flex-row flex-nowrap justify-start content-center items-center gap-4 mb-5">
        <img
          src="https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022"
          className="w-3/12 rounded-md"
        />
        <div className="flex flex-col justify-between content-center">
          <p className="text-sm">Top Dawg Entertainment</p>
          <p className="text-6xl font-bold py-24">{artist}</p>
          <p className="text-sm font-bold">Kendrick Lamar</p>
          <p className="text-sm">2017 - 14 Songs, 55 Minutes</p>
        </div>
      </div>
      <div className="dashboard flex flex-row justify-start items-center content-center gap-4 text-5xl mb-5">
        <AiFillPlayCircle className=" hover:text-stone-400" />
        <AiOutlineHeart className=" hover:text-stone-400" />
        <AiOutlineEllipsis className=" hover:text-stone-400" />
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
          {["BLOOD.", "DNA.", "YAH", "ELEMENT"].map((song, i) => {
            return (
              <div
                className="flex flex-row justify-between content-center items-center g-4 p-3 my-3 hover:bg-[#161616] rounded-md"
                key={i}
              >
                <div className="inline-flex items-center content-center">
                  <p className="mr-5 text-stone-400">{i}</p>
                  <p className="text-start">
                    {song} <br />{" "}
                    <span className="text-sm text-stone-400">
                      Kendrick Lamar
                    </span>
                  </p>
                </div>
                <p className="text-stone-400">1:58</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Artist;
