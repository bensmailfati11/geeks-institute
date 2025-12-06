import bcrypt from "bcrypt";
import {
  addUser,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUser,
} from "../models/userModel.js";

export async function register(req, res) {
  try {
    const { username, email, password, first_name, last_name } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const hash = await bcrypt.hash(password, 10);
    const userId = await addUser({ username, email, first_name, last_name }, hash);
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}

export async function getAllUsers(req, res) {
  const users = await getUsers();
  res.json(users);
}

export async function getUser(req, res) {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}

export async function updateUserById(req, res) {
  try {
    await updateUser(req.params.id, req.body);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
}
