import mongoose, { Schema } from 'mongoose';

const Cities = new Schema({
  name: {
    type: String,
    index: true,
    required: true,
    validate: city => city[0].toUpperCase() === city[0]
  },
  country: { type: String, required: true },
  capital: { type: Boolean, required: true },
  location: {
    type: new Schema({
      lat: Number,
      long: Number
    }),
  },
  lastModifiedDate: Date
});

Cities.pre('save', async function CitiesUpdate(next) {
  this.lastModifiedDate = new Date();
  next();
});

export default mongoose.model('Cities', Cities);
