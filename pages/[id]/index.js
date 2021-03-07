import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Header from "../../components/Header";
import Cat from "../../models/Cat";
import dbConnect from "../../utils/dbConnect";

const CatDetails = (props) => {
  const [cat, SetCat] = useState(
    props.cat ?? {
      _id: "asd",
      imageUrl:
        "https://m.media-amazon.com/images/I/81MJeBwW-JL._AC_UL640_FMwebp_QL65_.jpg",
      name: "misifus",
      species: "Felis catus domesticus",
    }
  );

  return (
    <div className="container">
      <Head>
        <title>Cats App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Header />

      <main className="main">
        <h1 className="title">Welcome to Cats App</h1>

        <p className="description">Detailed view of {cat.name}</p>

        <div className="grid">
          <div className="card" href="" target="_blank">
            <img alt={cat.name} className="cardImage" src={cat.imageUrl} />
            <h3>{cat.name} </h3>
            <p>{cat.species}</p>
            <div className="links">
              <Link as={`/${cat._id}/edit`} href="/[id]/edit">
                <p>Edit info &rarr;</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
export async function getServerSideProps(context) {
  const { id } = context.query;

  await dbConnect();
  const foundCat = await Cat.findById(id).lean();

  foundCat._id = foundCat._id.toString();
  console.log("Cat", foundCat);

  return {
    props: {
      cat: foundCat,
      message: "hello",
    },
  };
}

export default CatDetails;
