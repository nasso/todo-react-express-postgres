import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { getTodos, postTodo, putTodo, deleteTodo, Todo } from "./api";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  const [title, setTitle] = useState("");
  const { data } = useQuery("todos", getTodos);

  const queryClient = useQueryClient();

  const postMutation = useMutation(postTodo, {
    onMutate: async (newTodoTitle) => {
      await queryClient.cancelQueries("todos");

      const previousTodos = queryClient.getQueryData("todos");

      queryClient.setQueryData("todos", (old: Todo[] | undefined) => [
        ...(old ?? []),
        { id: Date.now(), title: newTodoTitle, completed: false },
      ]);

      setTitle("");

      return { previousTodos, newTodoTitle };
    },
    onError: (_err, _newTodoTitle, context) => {
      queryClient.setQueryData("todos", context?.previousTodos ?? []);
      setTitle(context?.newTodoTitle ?? "");
    },
    onSettled: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const putMutation = useMutation(putTodo, {
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries("todos");

      const previousTodos = queryClient.getQueryData("todos");

      queryClient.setQueryData(
        "todos",
        (old: Todo[] | undefined) =>
          old?.map((todo) =>
            todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
          ) ?? []
      );

      return { previousTodos };
    },
    onError: (_err, _updatedTodo, context) => {
      queryClient.setQueryData("todos", context?.previousTodos ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onMutate: async (id) => {
      await queryClient.cancelQueries("todos");

      const previousTodos = queryClient.getQueryData("todos");

      queryClient.setQueryData(
        "todos",
        (old: Todo[] | undefined) => old?.filter((todo) => todo.id !== id) ?? []
      );

      return { previousTodos };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData("todos", context?.previousTodos ?? []);
    },
    onSettled: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <div className="flex flex-col gap-4 pb-4 xl:items-center">
      <header className="rounded-b-lg bg-slate-800 xl:w-2/3">
        <h1 className="p-4 text-center text-4xl font-bold">Todo List</h1>
      </header>
      <main className="flex w-screen flex-col justify-center gap-4 px-8 xl:w-2/3 xl:p-0">
        <form
          className="flex justify-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            postMutation.mutate(title);
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
          {data
            ?.sort((a, b) => a.id - b.id)
            ?.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-4 rounded-lg bg-slate-800 p-4"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) =>
                    putMutation.mutate({
                      id: todo.id,
                      completed: e.target.checked,
                    })
                  }
                />
                <p className="grow">{todo.title}</p>
                <button
                  className="h-10 rounded-md bg-red-500 px-4 text-white"
                  onClick={() => deleteMutation.mutate(todo.id)}
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
