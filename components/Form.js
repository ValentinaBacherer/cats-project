import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Form = ({ catForm }) => {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [cat, setCat] = useState(
    catForm ?? {
      imageUrl: "",
      name: "",
      species: "",
    }
  );
  const router = useRouter();

  const validateFields = () => {
    const err = {};

    if (!cat.name) err.name = "Please provide a name";

    if (cat.species.length < 3) err.species = "Please provide a specie";

    if (cat.imageUrl.length < 5) err.imageUrl = "Please provide an imageUrl";

    return err; // why this cant setErrors()?
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const onSubmitErrors = validateFields();

    if (Object.keys(onSubmitErrors).length === 0) {
      setErrors({});

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_CAT_API, {
          body: JSON.stringify(cat),
          headers: {
            Accept: process.env.NEXT_PUBLIC_CONTENT,
            "Content-Type": process.env.NEXT_PUBLIC_CONTENT,
          },
          method: "POST",
        });
        const json = await response.json();

        console.log("json", json);

        if (!response.ok) {
          setMessage(json.message);
          throw new Error(json.message);
        }

        router.push("/");
      } catch (error) {
        console.error(`${error.name}: ${error.message}`);
      }
    } else {
      setMessage("");
      setErrors(onSubmitErrors);
    }
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setCat({
      ...cat,
      [fieldName]: value,
    });
  };

  return (
    <div className="card" id="form-container">
      <form id="cat-form">
        <div className="form-line">
          <label htmlFor="cat-name">Name</label>
          <input
            id="cat-name"
            name="name" // same as catForm
            onChange={handleChange}
            type="text"
            value={cat.name}
          />
        </div>
        <div className="form-line">
          <label htmlFor="cat-species">Species</label>
          <input
            id="cat-name"
            name="species"
            onChange={handleChange}
            type="text"
            value={cat.species}
          />
        </div>
        <div className="form-line">
          <label htmlFor="cat-image">Image url</label>
          <input
            id="cat-image"
            name="imageUrl"
            onChange={handleChange}
            type="text"
            value={cat.imageUrl}
          />
        </div>
        <div className="form-line">
          <code>{message}</code>
        </div>
        {Object.keys(errors).map((err, index) => {
          return (
            <li key={index}>
              <code>
                {err} : {errors[err]}
              </code>
            </li>
          );
        })}
        <hr />
        <button className="btn" onClick={handleSubmit} type="submit">
          Submit
        </button>
        <hr />
        <Link href="/">
          <button className="btn" type="button">
            Home
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Form;
