import { Schema, model } from "mongoose";

export default model(
  "Loan",
  new Schema({
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    state: {
      type: String,
      enum: ["borrowed", "returned"],
    },
  })
);
