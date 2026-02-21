import knexLibrary from "knex";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
const port = 3000;

const dbFile = "../db/game.sqlite";

const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: "../db/game.sqlite",
  },
});

app.use(cors());

app.use(express.static(path.join(__dirname, "server", "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "server", "public", "index.html"));
});

app.get("/cards", async (request, response) => {
  const cards = await knex.raw(`SELECT * FROM cards`);
  response.json(cards);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
