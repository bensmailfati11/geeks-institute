import express from "express";
import { getAllBooks, getBookById, createBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:bookId", getBookById);
router.post("/", createBook);

export default router;
