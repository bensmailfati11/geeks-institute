import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Middleware to read JSON body
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
