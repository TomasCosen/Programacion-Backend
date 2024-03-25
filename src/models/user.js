import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  rol: {
    type: String,
    default: "user",
  },
});

export const userModel = model("users", userSchema);
