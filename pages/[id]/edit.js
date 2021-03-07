/* eslint-disable get-off-my-lawn/prefer-arrow-functions */
import Head from "next/head";

import dbConnect from "../../utils/dbConnect";
import Cat from "../../models/Cat";
import Header from "../../components/Header";
import Form from "../../components/Form";

const EditCat = ({ cat }) => {
  console.log(cat);

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
        <Form catForm={cat} newCat={false} />
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  await dbConnect();

  const catFound = await Cat.findById(id).lean();

  catFound._id = catFound._id.toString();

  return {
    props: {
      cat: catFound,
      message: "we succeed",
    },
  };
}

export default EditCat;
