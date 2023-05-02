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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Book_1 = __importDefault(require("../models/Book"));
const Genre_1 = __importDefault(require("../models/Genre"));
const Loan_1 = __importDefault(require("../models/Loan"));
class BookController {
}
_a = BookController;
/**
 * GET: /
 */
BookController.get = (0, express_async_handler_1.default)((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield Book_1.default.find().populate("genre");
    res.status(200).json({
        message: "Books retrieved successfully",
        data: books,
    });
}));
/**
 * POST: /
 */
BookController.post = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { genre, stock } = _b, restBook = __rest(_b, ["genre", "stock"]);
    const bookBD = yield Book_1.default.findOne(restBook);
    if (!bookBD) {
        const book = new Book_1.default(req.body);
        const bookInfo = yield book.save();
        res.status(201).json({
            message: "Book successfully created",
            data: bookInfo.toJSON(),
        });
        return;
    }
    const newBook = yield Book_1.default.findByIdAndUpdate(bookBD._id, {
        stock: bookBD.stock + stock,
    });
    if (!newBook)
        throw new Error("MongooseError: Book could not be updated");
    res.status(200).json({
        message: "Book successfully updated",
        data: newBook,
    });
}));
/**
 * GET: /genres
 */
BookController.getGenres = (0, express_async_handler_1.default)((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "Genres retrieved successfully",
        data: yield Genre_1.default.find(),
    });
}));
/**
 * POST: /check-out
 */
BookController.postCheckOut = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, userId } = req.body;
    const book = yield Book_1.default.findById(bookId);
    if (!book) {
        res.status(404).json({
            message: "Book not found",
        });
        return;
    }
    const bookUpdated = yield Book_1.default.findByIdAndUpdate(bookId, {
        stock: book.stock - 1,
    }, { new: true });
    if (!bookUpdated)
        throw new Error("MongooseError: Book could not be updated");
    const loan = new Loan_1.default({
        book: book._id,
        date: new Date(),
        state: "borrowed",
        student: userId,
    });
    yield loan.save();
    res.status(200).json({
        message: "Check out for this book has been successful",
        data: bookUpdated,
    });
}));
exports.default = BookController;
