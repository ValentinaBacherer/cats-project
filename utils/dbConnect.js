/* eslint-disable require-await */

/*
 * Op1. Returns a call to a function "connect", hence when calling it
 *  from the API is an asyncronous function. "pending connection"
 * Op2. Returns a connection
 */

import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log(`Connected to ${process.env.LOCAL_DB}`);

    return undefined;
  }

  return mongoose.connect(process.env.LOCAL_DB, {
    useCreateIndex: true, // make Mongoose's default index build use createIndex() instead of ensureIndex()
    useFindAndModify: false, // Set to false to use native findOneAndUpdate()
    useNewUrlParser: true, // Underlying MongoDB newUrlParser
    useUnifiedTopology: true, // Underlying MongoDB driver's new connection management engine
  });
};

export default dbConnect;
