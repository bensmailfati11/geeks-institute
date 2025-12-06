import express from "express";
import fs from "fs";

const router = express.Router();
const filePath = "./tasks.json";

// Function to read JSON file
function readTasks() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading tasks file");
  }
}

// Function to save JSON file
function saveTasks(tasks) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    throw new Error("Error writing tasks file");
  }
}

// GET all tasks
router.get("/", (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET task by ID
router.get("/:id", (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id == req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create task
router.post("/", (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "title and description required" });
    }

    const tasks = readTasks();

    const newTask = {
      id: Date.now(),
      title,
      description,
    };

    tasks.push(newTask);
    saveTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update task
router.put("/:id", (req, res) => {
  try {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((t) => t.id == req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...req.body,
    };

    tasks[taskIndex] = updatedTask;
    saveTasks(tasks);

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE task
router.delete("/:id", (req, res) => {
  try {
    const tasks = readTasks();
    const newTasks = tasks.filter((t) => t.id != req.params.id);

    saveTasks(newTasks);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
