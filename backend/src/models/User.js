import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 12,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 12,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 3,
      max: 12,
    },
  },
  { timestamps: true },
);

export default model('User', UserSchema);
