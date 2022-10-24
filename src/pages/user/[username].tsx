import { NextPage } from "next";
import { useSelector } from "react-redux";
import { Layout } from "../../components/Layout";
import { selectState } from "../../store/authSlice";
import { SongCard } from "../../components/Song";
import { Dashboard } from "../../components/Dashboard";
import Skeleton from "@mui/material/Skeleton";

const UserView: NextPage = () => {
  const user = useSelector(selectState);
  console.log(user);
  return (
    <Layout>
      <div className="userinfo mb-5">
        <div className="flex justify-center content-center items-center gap-4">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/5.webp"
            className="rounded-lg w-32"
            alt="Avatar"
          />
          <div className="text-center block">
            <div className="font-bold capitalize">{user.username}</div>
            <div className="font-bold capitalize">
              {user.isAdmin ? "Admin" : "User"}
            </div>
            <div className="italic">Join us in 2022</div>
          </div>
        </div>

        <p className="text-2xl font-bold capitalize">
          {user.username} playlist
        </p>
        {user.playlist.length > 0 ? (
          <div className="grid grid-cols-8 gap-4">
            {user.playlist.map((song, i) => {
              return <SongCard song={song} show={false} key={i} />;
            })}
          </div>
        ) : (
          <>
            <Skeleton
              className="rounded-md mt-3"
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={170}
              height={198}
            />
            <p className="italic">No songs in the list...</p>
          </>
        )}
      </div>
      {user.isAdmin ? <Dashboard /> : ""}
    </Layout>
  );
};

export default UserView;
