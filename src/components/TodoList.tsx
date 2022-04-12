import { nanoid } from "@reduxjs/toolkit";
import { FormEvent, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../features/todo/todoSlice";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const [todo, setTodo] = useState<string>("");
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodoItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTodo({ id: nanoid(), text: todo, completed: false }));
    setTodo("");
    inputRef.current?.blur();
  };

  return (
    <div>
      <h1>TodoList</h1>
      <form onSubmit={addTodoItem}>
        <input
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          ref={inputRef}
        />
      </form>
      <TodoListItem />
    </div>
  );
};

export default TodoList;
