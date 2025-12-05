import express from "express";
import { authService } from "#@/modules/auth/index.js";
import { auth } from "#@/middlewares/auth.js";

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const result = await authService.register({ email, password, name, role });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
