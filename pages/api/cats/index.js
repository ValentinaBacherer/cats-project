import Cat from "../../../models/Cat";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  console.log("En API /api/cats", req.method);
  const method = req.method;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newCat = await Cat.create(req.body);

        console.log("Creating newCat", newCat.name);

        res.status(200).json({
          newCat,
          succes: true,
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
          success: false,
        });
      }

      break;
    case "GET":
      console.log("API get");

      try {
        const response = await Cat.find({});
        const cats = response.map((doc) => {
          const cat = doc.toObject();

          cat._id = cat._id.toString();

          return cat;
        });

        res.status(200).json({
          data: cats,
          succes: true,
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
          success: false,
        });
      }

      break;
    default:
      res.status(400).json({ message: "Default switch error" });
  }
};

export default handler;
