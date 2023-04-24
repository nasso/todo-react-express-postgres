import express from "express";
import todos from "./todos";

const SERVER_PORT = 8080;

async function main() {
  const app = express();

  app.use(express.json());

  app.use("/todos", todos);

  app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`);
  });
}

main();
