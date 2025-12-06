// file-info.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function showFileInfo() {
  const filePath = join(__dirname, "data", "example.txt");

  const exists = fs.existsSync(filePath);
  console.log("File exists:", exists);

  if (exists) {
    const stats = fs.statSync(filePath);
    console.log("File size:", stats.size, "bytes");
    console.log("Created at:", stats.birthtime);
  } else {
    console.log("File not found!");
  }
}
