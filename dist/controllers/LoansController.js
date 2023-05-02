"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Loan_1 = __importDefault(require("../models/Loan"));
const Book_1 = __importDefault(require("../models/Book"));
class LoansController {
}
_a = LoansController;
/**
 * GET: /
 */
LoansController.getLoans = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loans = yield Loan_1.default.find({
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
}));
/**
 * POST: /return-book
 */
LoansController.postReturnBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const loans = yield Loan_1.default.findByIdAndUpdate(id, {
        state: "returned",
    }, { new: true });
    if (!loans) {
        res.status(404).json({
            message: "Loan not found",
        });
        return;
    }
    const bookId = loans.book;
    const book = yield Book_1.default.findById(bookId);
    yield Book_1.default.findByIdAndUpdate(bookId, {
        stock: book.stock + 1,
    });
    res.status(200).json({
        message: "Book successfully returned",
    });
}));
/**
 * GET: /:id
 */
LoansController.getLoansHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const loans = yield Loan_1.default.find({
        student: userId,
    }).populate("book");
    res.status(200).json({
        message: "Loans retrieved successfully",
        data: loans,
    });
}));
exports.default = LoansController;
