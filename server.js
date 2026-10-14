import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

// Serve the website from /public
app.use(express.static(path.join(__dirname, "public")));

// Anything else → 404
app.use((req, res) => res.status(404).send("Not found"));

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
