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
    minlength: [10, 'Cat model: imageUrl at least 10 characters'],
    required: [true, 'Cat model: please provide an image url'],
    type: String,
  },
  name: {
    maxlength: [25, 'Cat model: max length for name is 25 characters'],
    required: [true, 'Cat model: provide a name.'],
    type: String,
  },
  species: String,
});

export default mongoose.models.Cat || mongoose.model('Cat', catSchema);
