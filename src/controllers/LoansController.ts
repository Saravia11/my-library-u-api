import asyncHandler from "express-async-handler";
import Loan from "../models/Loan";
import Book from "../models/Book";
import type { Request } from "express";

class LoansController {
  /**
   * GET: /
   */
  static getLoans = asyncHandler(async (req, res) => {
    const loans = await Loan.find({
      state: "borrowed",
    }).populate([
      "book",
      {
        path: "student",
        select: ["name", "last_name"],
      },
    ]);

    res.status(200).json({
      message: "Loans retrieve successfully",
      data: loans,
    });
  });

  /**
   * POST: /return-book
   */
  static postReturnBook = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const loans = await Loan.findByIdAndUpdate(
      id,
      {
        state: "returned",
      },
      { new: true }
    );
    if (!loans) {
      res.status(404).json({
        message: "Loan not found",
      });
      return;
    }

    const bookId = loans.book;
    const book = await Book.findById(bookId);
    await Book.findByIdAndUpdate(bookId, {
      stock: book!.stock + 1,
    });

    res.status(200).json({
      message: "Book successfully returned",
    });
  });

  /**
   * GET: /:id
   */
  static getLoansHistory = asyncHandler(
    async (req: Request<{ userId: string }, {}, {}>, res) => {
      const { userId } = req.params;

      const loans = await Loan.find({
        student: userId,
      }).populate("book");

      res.status(200).json({
        message: "Loans retrieved successfully",
        data: loans,
      });
    }
  );
}
export default LoansController;
