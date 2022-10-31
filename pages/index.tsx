import type { NextPage } from "next";
import dynamic from "next/dynamic";

const HomePage = dynamic(
  () => {
    return import("./home/");
  },
  { ssr: false }
);

const Home: NextPage = () => {
  return <HomePage />;
};

export default Home;
