// read-file.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readFileContent() {
  const filePath = path.join(__dirname, "files", "file-data.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  console.log("File content:", content);
}
