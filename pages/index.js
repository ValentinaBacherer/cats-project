import Link from "next/link";
import { useState } from "react";

import { server } from "../config";
import styles from "../styles/Home.module.css";

const fetchCats = async () => {
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

const Home = ({ catsList, ...props }) => {
  const [cats, setCats] = useState(catsList ?? []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Cats App</h1>
        <p className={styles.description}>
          We have reached a collection of {cats.length} lovely cats so far!{" "}
        </p>
        <p>(Would you help us to find some more?)</p>

        <div className={styles.grid}>
          {cats.map((cat) => {
            return (
              <Link as={`/${cat._id}`} href="/[id]/" key={cat._id}>
                <div className={styles.card}>
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
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const fetchedCats = await fetchCats();

  return {
    props: {
      catsList: fetchedCats,
      message: "miau-miau",
    },
  };
};

export default Home;
