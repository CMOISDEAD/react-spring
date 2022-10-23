import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectState, setAuthState } from "../store/authSlice";
import { Song } from "./index";

interface Props {
  song: Song;
  show: boolean;
}

export const SongCard = ({ song, show }: Props) => {
  const { id, cover, name, artist } = song;
  const user = useSelector(selectState);
  const dispatch = useDispatch();

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`http://${process.env.NEXT_PUBLIC_SERVER}/addUserList`, {
        song,
        name: user.username,
      })
      .then(() => {
        const new_userlist =[...user.playlist, song];
        dispatch(setAuthState({
          ...user,
          playlist: new_userlist,
        }))
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="song rounded-md bg-[#161616] p-2 my-2 h-full border border-zinc-900 hover:border-zinc-500">
      <Link href={`/music/song/${id}`}>
        <>
          <img src={cover} alt="Album cover" className="rounded-sm" />
          <p className="text-ellipsis overflow-hidden font-bold">{name}</p>
          <p className="artist italic">{artist}</p>
        </>
      </Link>
      {show && <button onClick={handleClick}>add</button>}
    </div>
  );
};
