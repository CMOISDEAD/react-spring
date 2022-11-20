import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectState, setAuthState } from "../store/authSlice";
import { Song } from "./index";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { toast } from "react-toastify";

interface Props {
  song: Song;
  show: boolean;
}

export const SongCard = ({ song, show }: Props) => {
  const { id, cover, name, artist } = song;
  const user = useSelector(selectState);
  const dispatch = useDispatch();

  const handleAdd = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`https://${process.env.NEXT_PUBLIC_SERVER}/addUserList`, {
        song,
        name: user.username,
      })
      .then(() => {
        const new_userlist = [...user.playlist, song];
        dispatch(
          setAuthState({
            ...user,
            playlist: new_userlist,
          })
        );
        toast.success("Song added to the list!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something goes wrong!");
      });
  };

  return (
    <div className="responsive-card min-w-[30%] max-w-[30%] h-auto rounded-md bg-[#161616] p-2 my-2 border border-zinc-900 hover:border-zinc-500 relative">
      <Link href={`/music/song/${id}`}>
        <img src={cover} alt="Album cover" className="rounded-sm w-full" />
      </Link>
      <p className="text-ellipsis overflow-hidden font-bold">{name}</p>
      <p className="artist italic">{artist}</p>
      {show ? (
        <button
          onClick={handleAdd}
          className="rounded-full bg-green-500 p-1 text-center absolute -top-2 -right-2"
        >
          <IoMdAdd />
        </button>
      ) : (
        <button className="rounded-full bg-red-500 p-1 text-center absolute -top-2 -right-2 content-center">
          <IoMdRemove />
        </button>
      )}
    </div>
  );
};
