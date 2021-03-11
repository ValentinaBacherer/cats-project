/* eslint-disable require-await */

import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return undefined;
  }

  return mongoose.connect(process.env.ATLAS_DB, {
    useCreateIndex: true, // make Mongoose's default index build use createIndex() instead of ensureIndex()
    useFindAndModify: false, // Set to false to use native findOneAndUpdate()
    useNewUrlParser: true, // Underlying MongoDB newUrlParser
    useUnifiedTopology: true, // Underlying MongoDB driver's new connection management engine
  });
};

export default dbConnect;
