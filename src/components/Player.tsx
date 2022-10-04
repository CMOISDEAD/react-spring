import {
  AiFillPlayCircle,
  AiFillCaretLeft,
  AiFillCaretRight,
} from "react-icons/ai";

export const Player = () => {
  return (
    <div className="inset-x-0 bottom-0 sticky">
      <div className="bg-[#161616] py-2 text-3xl flex flex-row justify-center content-center items-center">
        <div className="prev hover:text-stone-400">
          <AiFillCaretLeft />
        </div>
        <div className="player hover:text-stone-400">
          <AiFillPlayCircle />
        </div>
        <div className="next hover:text-stone-400">
          <AiFillCaretRight />
        </div>
      </div>
    </div>
  );
};
