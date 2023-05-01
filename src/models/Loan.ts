import { Schema, model } from "mongoose";

export default model(
  "Loan",
  new Schema({
    book_id: {
      type: Schema.Types.ObjectId,
      ref: "Book",
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
