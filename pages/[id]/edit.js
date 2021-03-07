/* eslint-disable get-off-my-lawn/prefer-arrow-functions */

import dbConnect from "../../utils/dbConnect";
import Cat from "../../models/Cat";
import Form from "../../components/Form";

const EditCat = ({ cat }) => {
  console.log(cat);

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Cats App</h1>
        <p className="description">
          You can edit <strong>{cat.name}&apos;s</strong> data bellow.
        </p>
        <div className="form">
          <Form catForm={cat} newCat={false} />
        </div>
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
      message: "Miau, we succeed",
    },
  };
}

export default EditCat;
