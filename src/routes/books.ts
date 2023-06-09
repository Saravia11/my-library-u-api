import express from "express";
import BookController from "../controllers/BookController";

const router = express.Router();

router.get("/", BookController.get);

router.post("/", BookController.post);

router.get("/genres", BookController.getGenres);

router.post("/check-out", BookController.postCheckOut);

module.exports = router;
