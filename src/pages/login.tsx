import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { setAuthState } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Layout } from "../components/Layout";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault;
    const target = e.target as HTMLInputElement;
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault;
    axios
      .post(`https://${process.env.NEXT_PUBLIC_SERVER}/login`, user)
      .then((res) => {
        console.log(res.data);
        dispatch(
          setAuthState({
            authState: true,
            username: res.data.username,
            playlist: res.data.user_playlist,
            isAdmin: res.data.isAdmin,
          })
        );
        router.push("/");
        toast.success(`Hi ${res.data.username} welcome back!`);
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Credenciales no validas");
      });
  };

  return (
    <Layout>
      <div className="h-[87.2vh]">
        <div className="flex flex-col items-center content-center justify-center backdrop-blur-sm h-full w-full">
          <div className="h-auto jrounded-md py-4 px-11 bg-[#161616]">
            <p className="text-2xl font-bold text-center uppercase">Login</p>
            <div className="form">
              <div className="pt-6 flex flex-col items-start content-start justify-evenly gap-4">
                <p className="text-sm capitalize">username</p>
                <div className="input-control">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="rounded-md p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636]"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-sm capitalize">password</p>
                <div className="input-control">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="p-1 border-b border-b-[#262626] bg-[#161616] hover:border-b-[#363636] focus:outline-none focus:border-b-[#363636]"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-sm text-stone-600 cursor-pointer">
                  Forgot password?
                </p>
                <button
                  className="px-4 py-2 rounded-sm bg-sky-500 hover:bg-sky-600 w-full"
                  onClick={handleSubmit}
                >
                  login
                </button>
              </div>
              <div className="text-center mt-5">
                <Link href="register">
                  <p className="text-md text-stone-500 cursor-pointer">
                    Register
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
