import { NextPage } from "next";
import { Navbar } from "./Navbar";
import { ToastContainer } from "react-toastify";
import { Footer } from "./Footer";

interface Props {
  children: React.ReactNode;
}

export const Layout: NextPage<Props> = ({ children }) => {
  const contextClass = {
    success: "bg-[#3636363b] border border-green-500 text-green-500",
    error: "bg-[#DA1E283b] border border-red-500 text-white",
    info: "bg-[#FDDC693b] border border-yellow-500 text-white",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {children}
        <ToastContainer
          toastClassName={({ type }: any) =>
            `${
              contextClass[type || "default"]
            } w-full flex items-center justify-between p-4 max-w-xs rounded-md backdrop-blur-md cursor-pointer my-2 transition-all`
          }
          bodyClassName={() => "ml-3 text-sm font-normal"}
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          icon={false}
        />
      </div>
      <Footer />
    </>
  );
};
