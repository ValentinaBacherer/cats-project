import Cat from "../../../models/Cat";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  console.log("req", req.body);
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
    default:
      res.status(400).json({ name: "vale" });
  }
};

export default handler;
