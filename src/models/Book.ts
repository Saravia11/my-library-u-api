import { Schema, model } from "mongoose";

export default model(
  "Book",
  new Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    published_year: {
      type: Number,
      required: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  })
);
