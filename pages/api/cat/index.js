import Cat from "../../../models/Cat";
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
  console.log("handler", req.method);
  await dbConnect();
  res.status(200).json({ name: "vale" });
};

export default handler;
