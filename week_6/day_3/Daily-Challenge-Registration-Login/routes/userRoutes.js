import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUser,
  updateUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUserById);

export default router;
