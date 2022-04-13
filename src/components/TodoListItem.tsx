import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { selectFilter, selectTodo } from "../features/todo/todoSlice";
import SingleTodo from "./SingleTodo";

const TodoListItem: FC = () => {
  const todos = useAppSelector(selectTodo);
  const filter = useAppSelector(selectFilter);

  return (
    <Container>
      {filter === "all"
        ? todos.map((todo) => <SingleTodo key={todo.id} todo={todo} />)
        : filter === "active"
        ? todos
            .filter((todo) => !todo.completed)
            .map((todo) => <SingleTodo key={todo.id} todo={todo} />)
        : todos
            .filter((todo) => todo.completed)
            .map((todo) => <SingleTodo key={todo.id} todo={todo} />)}
    </Container>
  );
};

export default TodoListItem;

const Container = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5px;
`;
