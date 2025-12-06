import express from "express";
import fs from "fs";
import bcrypt from "bcrypt";

const router = express.Router();
const filePath = "./users.json";

// Read users
function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Save users
function saveUsers(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// REGISTER
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  const users = readUsers();

  const usernameExists = users.some((u) => u.username === username);
  const passwordExists = users.some((u) => u.password === password);

  if (usernameExists) {
    return res.send("Username already exists");
  }

  if (passwordExists) {
    return res.send("Password already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);

  res.send("Hello! Your account is now created!");
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const users = readUsers();
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.send("User not registered");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send("Incorrect password");
  }

  res.send("You are now logged in!");
});

// GET ALL users
router.get("/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET USER BY ID
router.get("/users/:id", (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id == req.params.id);

  if (!user) return res.status(404).send("User not found");

  res.json(user);
});

// UPDATE USER
router.put("/users/:id", (req, res) => {
  const users = readUsers();
  const index = users.findIndex((u) => u.id == req.params.id);

  if (index === -1) return res.status(404).send("User not found");

  users[index] = { ...users[index], ...req.body };

  saveUsers(users);
  res.send("User updated");
});

export default router;
