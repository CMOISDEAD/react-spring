import { NextPage } from "next";
import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export const Layout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </>
  );
};
