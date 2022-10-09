import { AddAlbum } from "./AddAlbum";
import { AddArtist } from "./AddArtist";
import { AddSong } from "./AddSong";

export const Dashboard = () => {
  return (
    <div className="bg-[#262626] rounded-md w-full h-full p-3 my-2">
      <p className="text-3xl font-bold">Admin Dashboard</p>
      <div className="my-4">
        <p className="text-2xl font-bold capitalize">add song</p>
        <AddSong />
        <div className="my-4">
          <p className="text-3xl font-bold capitalize">add album</p>
          <AddAlbum />
        </div>
        <div className="my-4">
          <p className="text-3xl font-bold capitalize">add artist</p>
          <AddArtist />
        </div>
      </div>
    </div>
  );
};
