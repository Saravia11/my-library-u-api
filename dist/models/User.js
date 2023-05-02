"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)("User", new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
    },
    last_name: {
        required: true,
        type: String,
    },
    email: {
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
}));
