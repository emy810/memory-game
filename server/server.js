import knexLibrary from "knex";
import express from "express";

const app = express();
const port = 3000;

const dbFile = "../db/game.sqlite";

const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: "../db/game.sqlite",
  },
});

app.use(express.static("../"));

// app.get("/", async (request, response) => {
//   const cards = await knex.raw(`SELECT * FROM cards`);
//   response.json(cards);
// });

app.get("/cards", async (request, response) => {
  const cards = await knex.raw(`SELECT * FROM cards`);
  response.json(cards);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
