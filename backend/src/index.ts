import express from "express";
import db from "./db";

const SERVER_PORT = 8080;

async function main() {
  const app = express();

  // REST API
  app.get("/todos", async (_req, res) => {
    const todos = await db.todo.findMany();

    res.json(todos);
  });

  app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`);
  });
}

main();
