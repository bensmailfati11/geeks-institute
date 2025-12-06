import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// GET
app.get("/api/hello", (req, res) => {
  res.send("Hello From Express");
});

// POST
app.post("/api/world", (req, res) => {
  console.log("POST received:", req.body);

  res.send(
    `I received your POST request. This is what you sent me: ${req.body.input}`
  );
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
