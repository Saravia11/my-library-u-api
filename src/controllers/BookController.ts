import { Request } from "express";
import asyncHandler from "express-async-handler";
import Book from "../models/Book";
import Genre from "../models/Genre";
import type { Book as BookType } from "../types/books";

class BookController {
  /**
   * GET: /
   */
  static get = asyncHandler(async (_, res) => {
    const books = await Book.find().populate("genre");

    res.status(200).json({
      message: "Books retrieved successfully",
      data: books,
    });
  });

  /**
   * POST: /
   */
  static post = asyncHandler(
    async (req: Request<{}, {}, BookType & { stock: number }>, res) => {
      const { genre, stock, ...restBook } = req.body;
      const bookBD = await Book.findOne(restBook);
      if (!bookBD) {
        const book = new Book(req.body);
        const bookInfo = await book.save();
        res.status(201).json({
          message: "Book successfully created",
          data: bookInfo.toJSON(),
        });
        return;
      }

      const newBook = await Book.findByIdAndUpdate(bookBD._id, {
        stock: bookBD.stock + stock,
      });

      if (!newBook) throw new Error("MongooseError: Book could not be updated");

      res.status(200).json({
        message: "Book successfully updated",
        data: newBook,
      });
    }
  );

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
