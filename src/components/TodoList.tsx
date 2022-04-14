import { nanoid } from "@reduxjs/toolkit";
import { FC, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../features/todo/todoSlice";
import TodoFilter from "./TodoFilter";
import TodoFooter from "./TodoFooter";
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
      <Header>
        <Title>Todos</Title>
        <IconWrapper>
          <InnerWrapper>
            <InnerInner>
              <DarkModeIcon>dark_mode</DarkModeIcon>
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
  background-color: #eff1f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  & ::placeholder {
    color: #b3b3b3;
  }
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
  //color: #828282;
  background-color: #565656;
  color: transparent;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(153, 160, 169, 0.4) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  box-shadow: 4px 4px 20px rgba(142, 155, 174, 0.1);
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(146.45deg, #ffffff 14.49%, #cbd0d9 85.19%);
`;

const InnerInner = styled.div`
  width: 28px;
  height: 28px;
  background: linear-gradient(146.45deg, #ffffff 14.49%, #cbd0d9 85.19%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #f09009;

  &:hover {
    background: linear-gradient(146.45deg, #cbd0d9 14.49%, #ffffff 85.19%);
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
