export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export async function getTodos() {
  const response = await fetch("/api/todos");
  const todos: Todo[] = await response.json();

  return todos;
}

export async function postTodo(title: string) {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  const todo: Todo = await response.json();

  return todo;
}

export async function putTodo(todo: Pick<Todo, "id" | "completed">) {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo: Todo = await response.json();

  return updatedTodo;
}

export async function deleteTodo(id: number) {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
}
