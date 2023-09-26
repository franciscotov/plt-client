import { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import { env } from "process";
import Navbar from "@/components/molecules/navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}></main>
    </>
  );
};

export default Home;
