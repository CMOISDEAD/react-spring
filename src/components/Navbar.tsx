import { AiOutlineSearch } from "react-icons/ai";
import { GiLuchador as Logo } from "react-icons/gi";
import { FaMicrophone } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectState } from "../store/authSlice";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

export const Navbar = (): any => {
  const [query, setQuery] = useState<string>("");
  const [artist, setArtist] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const user = useSelector(selectState);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://${process.env.NEXT_PUBLIC_SERVER}/songs`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`http://${process.env.NEXT_PUBLIC_SERVER}/artist`)
      .then((res) => setArtist(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`http://${process.env.NEXT_PUBLIC_SERVER}/albums`)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {};

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setQuery(target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let found: any = [...songs, ...artist, ...albums].find(
      (element) => element.name == query
    );
    if (found) {
      if (found.hasOwnProperty("yt_url")) {
        router.push(`/music/song/${found.id}`);
      } else if (found.hasOwnProperty("albums")) {
        router.push(`/music/artist/${found.id}`);
      } else {
        router.push(`/music/album/${found.id}`);
      }
    } else {
      toast.warning(`${query} dont exist!`);
    }
  };

  return (
    <div className="navbar flex flex-row justify-between items-center content-center p-5">
      <div className="inline-flex">
        <Link
          className="ml-4 mr-20 font-bold text-xl inline-flex content-center items-center"
          href="/"
        >
          <div className="inline-flex">
            <Logo className="mr-2 text-2xl" /> Music
          </div>
        </Link>
        <a className="mx-4 font-semibold hover:text-zinc-300" href="/you">
          For you
        </a>
        <a className="mx-4 hover:text-zinc-300" href="/library">
          Library
        </a>
        <a className="mx-4 hover:text-zinc-300" href="/browse">
          Browse
        </a>
        <a
          className="mx-4 hover:text-zinc-300 cursor-not-allowed"
          href="/radio"
        >
          Radio
        </a>
      </div>
      <div className="flex flex-row justify-around content-center items-center">
        {!user.authState ? (
          <div className="auth">
            <Link href="/login">
              <p className="mx-5 cursor-pointer text-sm">Login</p>
            </Link>
            <Link href="/register">
              <p className="mx-5 cursor-pointer text-sm">Register</p>
            </Link>
          </div>
        ) : (
          <div className="mx-2 inline-flex justify-center items-center content-center">
            <AiOutlineUser />
            <Link href={`/user/${user.username}`}>
              <p className="font-bold ml-2">{user.username}</p>
            </Link>
          </div>
        )}

        <form onSubmit={handleSearch}>
          <div className="search flex flex-row justify-around content-center items-center rounded border border-zinc-900 bg-zinc-800 px-2 hover:border-zinc-500">
            <AiOutlineSearch />
            <input
              className="border-none rounded-lg p-1 bg-zinc-800 focus:outline-none"
              type="text"
              placeholder="Search"
              onClick={handleClick}
              onChange={handleChange}
              list="options"
            />
            <datalist id="options">
              {[...songs, ...albums, ...artist].map((option, i) => (
                <option value={option.name} key={i} />
              ))}
            </datalist>
            <FaMicrophone />
          </div>
        </form>
      </div>
    </div>
  );
};
