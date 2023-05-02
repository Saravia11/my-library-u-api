"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = __importDefault(require("../controllers/BookController"));
const router = express_1.default.Router();
router.get("/", BookController_1.default.get);
router.post("/", BookController_1.default.post);
router.get("/genres", BookController_1.default.getGenres);
router.post("/check-out", BookController_1.default.postCheckOut);
module.exports = router;
