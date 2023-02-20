// create mongoose user models
import mongoose from "mongoose";
import { IUser } from "@/types/user";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 32,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  history: {
    type: Array,
    default: [],
  },
});

export default mongoose.model<IUser & mongoose.Document>("User", userSchema);