import { Request } from "express";
import asyncHandler from "express-async-handler";
import Book from "../models/Book";
import Genre from "../models/Genre";
import type { Book as BookType } from "../types/books";

class BookController {
  /**
   * POST: /
   */
  static post = asyncHandler(async (req: Request<{}, {}, BookType>, res) => {
    const book = new Book(req.body);
    const bookInfo = await book.save();
    res.status(201).json({
      message: "Book successfully created",
      data: bookInfo.toJSON(),
    });
  });

  /**
   * GET: /genres
   */
  static getGenres = asyncHandler(async (_, res) => {
    res.status(200).json({
      message: "Genres retrieved successfully",
      data: await Genre.find(),
    });
  });
}
export default BookController;
