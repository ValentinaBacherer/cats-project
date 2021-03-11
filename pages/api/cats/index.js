import Cat from "../../../models/Cat";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  const method = req.method;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newCat = await Cat.create(req.body);

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
