import "../styles/globals.css";
import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Cats App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
