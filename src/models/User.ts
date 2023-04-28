import { Schema, model } from "mongoose";

export default model(
  "User",
  new Schema({
    name: {
      required: true,
      type: String,
    },
    last_name: {
      required: true,
      type: String,
    },
    carnet: {
      required: true,
      type: String,
    },
    hash: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
      enum: ["librarian", "student"],
    },
  })
);
