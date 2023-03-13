import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const newId = (() => {
  let id = 0;

  return () => {
    id += 1;
    return id;
  };
})();

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  function addTodo() {
    setTodos([
      ...todos,
      {
        id: newId(),
        title,
        completed: false,
      },
    ]);

    setTitle("");
  }

  function updateTodo(id: number, completed: boolean) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  }

  return (
    <div className="flex flex-col gap-4 pb-4 xl:items-center">
      <header className="rounded-b-2xl bg-slate-800 xl:w-2/3">
        <h1 className="p-4 text-center text-4xl font-bold">Todo List</h1>
      </header>
      <main className="flex w-screen flex-col justify-center gap-4 px-8 xl:w-2/3 xl:p-0">
        <form
          className="flex justify-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            className="h-10 grow rounded-lg bg-slate-800 px-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="h-10 rounded-lg bg-blue-500 px-4 text-white">
            Add
          </button>
        </form>
        <ul className="flex flex-col gap-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-4 rounded-lg bg-slate-800 p-4"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => updateTodo(todo.id, e.target.checked)}
              />
              <p className="grow">{todo.title}</p>
              <button
                className="h-10 rounded-md bg-red-500 px-4 text-white"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
