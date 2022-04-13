import { nanoid } from "@reduxjs/toolkit";
import { FC, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../features/todo/todoSlice";
import TodoFilter from "./TodoFilter";
import TodoListItem from "./TodoListItem";

const TodoList: FC = () => {
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
    <Container>
      <Title>TodoList</Title>
      <Form onSubmit={addTodoItem}>
        <Input
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          ref={inputRef}
        />
      </Form>
      <TodoFilter />
      <TodoListItem />
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  background-color: #eff1f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  letter-spacing: 0.08em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  padding: 0 20px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
