import Head from "next/head";
import Link from "next/link";

import dbConnect from "../utils/dbConnect";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

const Home = (props) => {
  const { cat } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Cats App</h1>

        <p className={styles.description}>My name: {cat}</p>

        <div className={styles.grid}>
          <a className={styles.card} href="https://nextjs.org/docs">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a className={styles.card} href="https://nextjs.org/learn">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            className={styles.card}
            href="https://github.com/vercel/next.js/tree/master/examples"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
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

  return {
    props: {
      cat: "miau-miau",
    },
  };
};
