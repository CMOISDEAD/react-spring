import { NextPage } from "next";
import { useSelector } from "react-redux";
import { Layout } from "../../components/Layout";
import { selectState } from "../../store/authSlice";
import { SongCard } from "../../components/Song";
import { Dashboard } from "../../components/Dashboard";

const UserView: NextPage = () => {
  const user = useSelector(selectState);
  console.log(user);
  return (
    <Layout>
      <div className="userinfo mb-5">
        <p className="text-2xl font-bold">
          {user.isAdmin ? "Admin" : "User"} : {user.username}
        </p>
        <p className="text-2xl font-bold">{user.username} playlist</p>
        <div className="grid grid-cols-5 gap-4">
          {user.playlist ? (
            user.playlist.map((song, i) => {
              return <SongCard song={song} key={i} show={false} />;
            })
          ) : (
            <div>none</div>
          )}
        </div>
      </div>
      {user.isAdmin ? <Dashboard /> : ""}
    </Layout>
  );
};

export default UserView;
