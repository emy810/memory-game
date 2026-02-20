import knexLibrary from "knex";
import express from "express";
import cors from "cors";
import path from "path";

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

app.use(express.static(path.resolve("server/public")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve("server/public/index.html"));
});

app.get("/cards", async (request, response) => {
  const cards = await knex.raw(`SELECT * FROM cards`);
  response.json(cards);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
