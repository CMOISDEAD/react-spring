import { AddAlbum } from "./AddAlbum";
import { AddArtist } from "./AddArtist";
import { AddSong } from "./AddSong";

export const Dashboard = () => {
  return (
    <div className="bg-[#262626] rounded-md w-full h-full p-3 my-2">
      <h3 className="text-center font-bold text-2xl uppercase">Dashboard</h3>
      <ul
        className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        id="tabs-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-home"
            className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
            id="tabs-songs-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-songs"
            role="tab"
            aria-controls="tabs-songs"
            aria-selected="true"
          >
            Songs
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-albums"
            className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-albums-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-albums"
            role="tab"
            aria-controls="tabs-albums"
            aria-selected="false"
          >
            Albums
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-artists"
            className="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-artists-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-artists"
            role="tab"
            aria-controls="tabs-artists"
            aria-selected="false"
          >
            Artists
          </a>
        </li>
      </ul>
      <div className="tab-content" id="tabs-tabContent">
        {/* <p className="text-3xl font-bold">Admin Dashboard</p> */}
        <div
          className="my-4 tab-pane fade show active"
          id="tabs-songs"
          role="tabpanel"
          aria-labelledby="tabs-songs-tab"
        >
          <p className="text-2xl font-bold capitalize">add song</p>
          <AddSong />
        </div>
        <div
          className="my-4 tab-pane fade"
          id="tabs-albums"
          role="tabpanel"
          aria-labelledby="tabs-albums-tab"
        >
          <p className="text-3xl font-bold capitalize">add album</p>
          <AddAlbum />
        </div>
        <div
          className="my-4 tab-pane fade"
          id="tabs-artists"
          role="tabpanel"
          aria-labelledby="tabs-artists-tab"
        >
          <p className="text-3xl font-bold capitalize">add artist</p>
          <AddArtist />
        </div>
      </div>
    </div>
  );
};
