import express from "express";
import db from "./db";

const SERVER_PORT = 8080;

async function main() {
  const app = express();

  app.use(express.json());

  // Returns all todos
  // Example: curl http://localhost:8080/todos
  app.get("/todos", async (_req, res) => {
    const todos = await db.todo.findMany();

    res.json(todos);
  });

  // Adds a new todo
  // Example: curl -X POST -H "Content-Type: application/json" -d '{"title": "Buy milk"}' http://localhost:8080/todos
  app.post("/todos", async (req, res) => {
    const todo = await db.todo.create({
      data: {
        title: req.body.title,
        completed: false,
      },
    });

    res.status(201).json(todo);
  });

  // Updates a todo
  // Example: curl -X PUT -H "Content-Type: application/json" -d '{"completed": true}' http://localhost:8080/todos/1
  app.put("/todos/:id", async (req, res) => {
    const todo = await db.todo.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        completed: req.body.completed,
      },
    });

    res.json(todo);
  });

  // Deletes a todo
  // Example: curl -X DELETE http://localhost:8080/todos/1
  app.delete("/todos/:id", async (req, res) => {
    const todo = await db.todo.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(204).json(todo);
  });

  app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`);
  });
}

main();
