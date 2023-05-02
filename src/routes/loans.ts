import express from "express";
import LoansController from "../controllers/LoansController";

const router = express.Router();

router.get("/", LoansController.getLoans);

router.get("/:userId", LoansController.getLoansHistory);

router.post("/return-book", LoansController.postReturnBook);

module.exports = router;
