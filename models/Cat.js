import mongoose from 'mongoose';

/*
 * Models are fancy constructors compiled from Schema
 * definitions. (a class with wich we construct documents)
 * An instance of a model is called a document.
 * Models are responsible for creating and reading documents from
 * the underlying MongoDB database.
 */

const catSchema = new mongoose.Schema({
  imageUrl: {
    required: [true, 'Please provide an url'],
    type: String,
  },
  name: {
    maxlength: [25, 'The max length for name is 25 characters'],
    required: [true, 'Please provide a name for the cat.'],
    type: String,
  },
  species: String,
});

export default mongoose.models.Cat || mongoose.model('Cat', catSchema);
