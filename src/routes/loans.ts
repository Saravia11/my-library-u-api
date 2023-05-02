import express from "express";
import LoansController from "../controllers/LoansController";

const router = express.Router();

router.get("/", LoansController.getLoans);

router.post("/return-book", LoansController.postReturnBook);

module.exports = router;
