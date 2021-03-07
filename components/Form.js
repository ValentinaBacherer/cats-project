import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Form = ({ catForm, newCat = true }) => {
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

  const deleteCat = async () => {
    console.log("deleteCat");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CAT_API}/${cat._id}`,
        {
          method: "DELETE",
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setMessage(json.message);
        throw new Error(json.message);
      }

      router.push("/");
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  };

  const handleDelete = () => {
    console.log("handle delete cat", newCat);
    // eslint-disable-next-line no-unused-expressions
    newCat ? console.log("delete new") : deleteCat();
  };

  const createCat = async () => {
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
  };

  const updateCat = async () => {
    console.log("update cat");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CAT_API}/${cat._id}`,
        {
          body: JSON.stringify(cat),
          headers: {
            Accept: process.env.NEXT_PUBLIC_CONTENT,
            "Content-Type": process.env.NEXT_PUBLIC_CONTENT,
          },
          method: "PUT",
        }
      );
      const json = await response.json();

      console.log("updateCat", json.message);

      if (!response.ok) {
        setMessage(json.message);
        throw new Error(json.message);
      }

      router.push("/");
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSubmitErrors = validateFields();

    if (Object.keys(onSubmitErrors).length === 0) {
      setErrors({});

      if (newCat) {
        createCat();
      } else {
        updateCat();
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
        <button className="btn" onClick={handleDelete} type="button">
          Delete
        </button>
      </form>
    </div>
  );
};

export default Form;
