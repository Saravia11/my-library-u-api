import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/", UserController.post);

router.get("/", UserController.get);

router.get("/:id", UserController.getId);

router.post("/login", UserController.postLogin);

module.exports = router;
