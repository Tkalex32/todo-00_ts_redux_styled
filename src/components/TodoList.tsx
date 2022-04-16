import { nanoid } from "@reduxjs/toolkit";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../features/todo/todoSlice";
import TodoFilter from "./TodoFilter";
import TodoFooter from "./TodoFooter";
import TodoListItem from "./TodoListItem";

const TodoList: FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [mode, setMode] = useState<string>("light");
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const icon: string = mode === "light" ? "dark_mode" : "light_mode";

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) =>
        onSelectMode(e.matches ? "dark" : "light")
      );

    onSelectMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  const onSelectMode = (mode: string) => {
    setMode(mode);
    if (mode === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  };

  const addTodoItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTodo({ id: nanoid(), text: todo, completed: false }));
    setTodo("");
    inputRef.current?.blur();
  };

  return (
    <Container>
      <Header>
        <Title>Todos</Title>
        <IconWrapper
          onClick={() => onSelectMode(mode === "light" ? "dark" : "light")}
        >
          <InnerWrapper>
            <InnerInner mode={mode}>
              <DarkModeIcon>{icon}</DarkModeIcon>
            </InnerInner>
          </InnerWrapper>
        </IconWrapper>
      </Header>
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
      <TodoFooter />
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  background-color: var(--color-item);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 20px;
  box-shadow: var(--shadow);
  transition: all 0.3s linear;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 0.08em;
  color: var(--color-text);
  transition: all 0.3s linear;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--button-circle1);
  box-shadow: 4px 4px 20px rgba(142, 155, 174, 0.1);
  transition: all 0.3s linear;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--button-circle2);
  transition: all 0.3s linear;
`;

interface InnerInnerProps {
  mode: string;
}

const InnerInner = styled.div<InnerInnerProps>`
  width: 28px;
  height: 28px;
  background: var(--button);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => (props.mode === "light" ? "#f09009;" : "yellow")};
  transition: all 0.3s linear;

  &:hover {
    background: var(--button-hover);
  }
`;

const DarkModeIcon = styled.span`
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "liga";

  display: inline-block;
  font-size: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  background: var(--input);
  color: var(--secondary);
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  padding: 0 20px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  box-shadow: var(--inner-shadow2);
  transition: all 0.3s linear;

  &::placeholder {
    color: var(--secondary);
  }
`;
