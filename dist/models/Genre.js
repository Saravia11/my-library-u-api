"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)("Genre", new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}));
