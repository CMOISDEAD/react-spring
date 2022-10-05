import { AiOutlineSearch } from "react-icons/ai";
import { GiLuchador as Logo } from "react-icons/gi";
import { FaMicrophone } from "react-icons/fa";
import Link from "next/link";

export const Navbar = (): any => {
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
        <a className="mx-4 hover:text-zinc-300 cursor-not-allowed" href="/radio">
          Radio
        </a>
      </div>
      <div className="flex flex-row justify-around content-center items-center">
        <div className="auth">
          <Link href="/login">
            <p className="mx-5 cursor-pointer text-sm">Login</p>
          </Link>
          <Link href="/login">
            <p className="mx-5 cursor-pointer text-sm">Register</p>
          </Link>
        </div>
        <div className="search flex flex-row justify-around content-center items-center rounded border border-zinc-900 bg-zinc-800 px-2 hover:border-zinc-500">
          <AiOutlineSearch />
          <input
            className="rounded-lg p-1 bg-zinc-800 focus:outline-none"
            type="text"
            placeholder="Search"
          />
          <FaMicrophone />
        </div>
      </div>
    </div>
  );
};
