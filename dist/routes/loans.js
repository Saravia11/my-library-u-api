"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoansController_1 = __importDefault(require("../controllers/LoansController"));
const router = express_1.default.Router();
router.get("/", LoansController_1.default.getLoans);
router.get("/:userId", LoansController_1.default.getLoansHistory);
router.post("/return-book", LoansController_1.default.postReturnBook);
module.exports = router;
