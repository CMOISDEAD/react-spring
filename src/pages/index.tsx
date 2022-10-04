import type { NextPage } from "next";
import Head from "next/head";
import { Carousell } from "../components/Carousell";
import { ListSongs } from "../components/ListSongs";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Java Music</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousell />
      <ListSongs />
    </Layout>
  );
};

export default Home;
