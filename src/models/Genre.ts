import { Schema, model } from "mongoose";

export default model(
  "Genre",
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  })
);
