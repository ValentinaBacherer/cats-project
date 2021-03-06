import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Form = ({ catForm }) => {
  const [message, setMessage] = useState("");
  const [cat, setCat] = useState(
    catForm ?? {
      imageUrl: "",
      name: "",
      species: "",
    }
  );
  const router = useRouter();

  console.log("Form", cat);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/cat", {
        body: JSON.stringify(cat),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
