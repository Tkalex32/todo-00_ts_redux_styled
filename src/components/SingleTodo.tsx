import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { removeTodo, toggleTodo, updateTodo } from "../features/todo/todoSlice";
import styled from "styled-components";
import iconCheck from "../assets/icon-check.svg";

interface SingleTodoProps {
  todo: ITodo;
}

const SingleTodo: FC<SingleTodoProps> = ({ todo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.text);
  const dispatch = useAppDispatch();

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTodo({ ...todo, text: editTodo }));
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Form onSubmit={(e) => handleEdit(e)}>
      <TodoInfo>
        <Checkbox
          checked={todo.completed}
          onClick={() => dispatch(toggleTodo(todo.id))}
        />
        {edit ? (
          <input
            ref={inputRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            onBlur={() => setEdit(false)}
          />
        ) : (
          <TodoText
            checked={todo.completed}
            onClick={() => {
              if (!edit && !todo.completed) {
                setEdit(!edit);
              }
            }}
          >
            {todo.text}
          </TodoText>
        )}
      </TodoInfo>
      <Button onClick={() => dispatch(removeTodo(todo.id))}> Remove</Button>
    </Form>
  );
};

export default SingleTodo;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  border-top: 1px solid #e5e5e5;
`;

const TodoInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

interface ICheckedProps {
  checked: boolean;
}

const Checkbox = styled.div<ICheckedProps>`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.checked ? "#4caf50" : "#fff")};
  background-image: ${(props) =>
    props.checked ? `url(${iconCheck})` : "#fff"};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 15px;
`;

const TodoText = styled.span<ICheckedProps>`
  color: ${(props) => (props.theme.dark ? "#fff" : "#000")};
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  cursor: ${(props) => (props.checked ? "default" : "pointer")};
`;

const Button = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #828282;
  text-align: center;
  cursor: pointer;
  border: 1px solid #828282;
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 5px;

  &:hover {
    color: #fff;
    background-color: #828282;
  }
`;
