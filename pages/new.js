import Header from "../components/Header";
import Form from "../components/Form";

const NewCat = () => {
  const emptyCat = {
    imageUrl: "",
    name: "",
    species: "",
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="grid">
          <Form catForm={emptyCat} />
        </div>
      </div>
    </>
  );
};

export default NewCat;
