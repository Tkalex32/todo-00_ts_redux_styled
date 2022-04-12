import { useAppSelector, useAppDispatch } from "../app/hooks";
import { removeTodo, selectTodo, toggleTodo } from "../features/todo/todoSlice";

const CompletedTodos = () => {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Completed Todos</h1>
      {todos
        .filter((todo) => todo.completed)
        .map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span>{todo.text}</span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </div>
        ))}
    </div>
  );
};

const TodoListItem = () => {
  const todos = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <div key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span>{todo.text}</span>
              <button onClick={() => dispatch(removeTodo(todo.id))}>
                Remove
              </button>
            </div>
          ))}
      </div>
      <CompletedTodos />
    </>
  );
};

export default TodoListItem;
