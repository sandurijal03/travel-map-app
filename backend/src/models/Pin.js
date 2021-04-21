import { model, Schema } from 'mongoose';

const PinSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    description: {
      type: String,
      require: true,
      max: 20,
    },
    rating: {
      type: Number,
      require: true,
      min: 0,
    },
    lat: {
      type: Number,
      require: true,
    },
    lng: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

export default model('Pin', PinSchema);
