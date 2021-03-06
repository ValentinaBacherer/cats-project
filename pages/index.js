import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { server } from "../config";
import dbConnect from "../utils/dbConnect";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

const fetchCats = async () => {
  console.log("In fetch cats");

  try {
    const response = await fetch(`${server}${process.env.NEXT_PUBLIC_CAT_API}`);
    const json = await response.json();

    if (!response.ok) {
      throw new Error("Error en llamado a API");
    }

    return json.data;
  } catch (error) {
    console.error(error.message);
  }

  return undefined;
};

const Home = ({ catsList, message }) => {
  const [cats, setCats] = useState(catsList ?? []);

  console.log("Home render", cats);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cats App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Cats App</h1>

        <p className={styles.description}>
          We have reached a collection of {cats.length} lovely cats so far!{" "}
        </p>
        <p>(Would you help us to find some more?)</p>
        <div className={styles.grid}>
          {cats.map((cat) => {
            return (
              <Link href="/new" key={cat._id}>
                <div className={styles.card} href="" target="_blank">
                  <img
                    alt={cat.name}
                    className={styles.cardImage}
                    src={cat.imageUrl}
                  />
                  <h3>{cat.name} &rarr;</h3>
                  <p>Find more &#47;&gt;</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          rel="noopener noreferrer"
          target="_blank"
        >
          Powered by{" "}
          <img alt="Vercel Logo" className={styles.logo} src="/vercel.svg" />
        </a>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  await dbConnect();
  // context parameter (object)
  console.log("gSSP", context.resolvedUrl);

  const fetchedCats = await fetchCats();

  return {
    props: {
      catsList: fetchedCats,
      message: "miau-miau",
    },
  };
};
