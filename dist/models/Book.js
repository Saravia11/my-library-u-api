"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)("Book", new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
}));
