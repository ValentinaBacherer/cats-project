import dbConnect from "../../../utils/dbConnect";
import Cat from "../../../models/Cat";

const handler = async (req, res) => {
  console.log("In dinamic API", req.method, req.body, "id", req.query.id);
  const method = req.method;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const foundCat = await Cat.findById(id).lean();

        foundCat._id = foundCat._id.toString();

        res.status(200).json({
          data: foundCat,
          message: "Cat Found",
          success: true,
        });
      } catch (error) {
        res.status(400).json({
          message: "Cat not found",
          success: false,
        });
      }

      break;
    case "PUT":
      try {
        const cat = await Cat.findByIdAndUpdate(id, req.body, {
          new: true,
          omitUndefined: true,
          runValidators: true,
        });

        if (!cat) {
          res.status(200).json({
            message: "Cat update failure, not found",
            succes: false,
          });
        }

        res.status(200).json({
          data: cat,
          message: "Cat updated",
          succes: true,
        });
      } catch (error) {
        res.status(400).json({ message: "Cat update failure" });
      }

      break;
    case "DELETE":
      try {
        const response = await Cat.findByIdAndDelete(id).lean();

        console.log("delete API", response);
        // response is null if nothing is deleted

        if (!response) {
          throw new Error("Nothing found to delete");
        }

        res.status(200).json({
          message: "cat deleted",
          success: true,
        });
      } catch (error) {
        res.status(400).json({
          message: `Delete failure ${error.message}`,
          success: false,
        });
      }

      break;
    default:
      res.status(400).json({ message: "Cat delete failure" });

      break;
  }
};

export default handler;
