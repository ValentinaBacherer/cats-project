import Link from "next/link";

import Cat from "../../models/Cat";
import dbConnect from "../../utils/dbConnect";

const CatDetails = (props) => {
  const cat = props.cat ?? {
    name: "missing cat",
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Cats App</h1>

        <p className="description">
          Detailed view of <strong>{cat.name}</strong>, one of our{" "}
          <em>favorite</em> cats.
        </p>

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
