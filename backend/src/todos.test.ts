import { parseNewTodo } from "./todos";

describe("todos", () => {
  test("parses valid new todo", () => {
    expect(parseNewTodo({ title: "Buy milk" })).toEqual({
      title: "Buy milk",
      completed: false,
    });
    expect(parseNewTodo({ title: "Sell milk" })).toEqual({
      title: "Sell milk",
      completed: false,
    });
  });

  test("returns null for invalid new todo", () => {
    expect(parseNewTodo("hello")).toBeNull();
    expect(parseNewTodo(false)).toBeNull();
    expect(parseNewTodo([])).toBeNull();
    expect(parseNewTodo(null)).toBeNull();
    expect(parseNewTodo({})).toBeNull();
    expect(parseNewTodo({ title: 123 })).toBeNull();
  });
});
