import express from "express";
import postRoutes from "./server/routes/postRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Blog API" });
});


// Error handling for invalid routes
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
