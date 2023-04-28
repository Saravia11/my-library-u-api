import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/:id", UserController.get);

router.post("/", UserController.post);

router.post("/login", UserController.postLogin);

module.exports = router;
