import { parseNewTodo } from "./todos";

test("parses valid new todo", () => {
  expect(
    parseNewTodo({
      title: "Buy milk",
    })
  ).toEqual({
    title: "Buy milk",
    completed: false,
  });
});

test("returns null on invalid payload", () => {
  expect(
    parseNewTodo({
      tilte: "Buy milk",
    })
  ).toEqual(null);
});
