import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { toggleTodo, updateTodo } from "../features/todo/todoSlice";
import styled from "styled-components";
import Modal from "./Modal";

interface SingleTodoProps {
  todo: ITodo;
}

const SingleTodo: FC<SingleTodoProps> = ({ todo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.text);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTodo({ ...todo, text: editTodo }));
    setEdit(false);
  };

  return (
    <Form onSubmit={(e) => handleEdit(e)}>
      <TodoInfo>
        <Checkbox
          checked={todo.completed}
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          {todo.completed && (
            <CheckIcon checked={todo.completed}>done</CheckIcon>
          )}
        </Checkbox>
        {edit ? (
          <TodoInput
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
      {!edit && (
        <IconWrapper onClick={() => setShowModal(true)}>
          <InnerWrapper>
            <InnerInner>
              <DeleteIcon>delete</DeleteIcon>
            </InnerInner>
          </InnerWrapper>
        </IconWrapper>
      )}
      {showModal && (
        <Modal setShowModal={setShowModal} type="single" id={todo.id} />
      )}
    </Form>
  );
};

export default SingleTodo;

const TodoInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
`;

interface ICheckedProps {
  checked: boolean;
}

const Checkbox = styled.div<ICheckedProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid var(--quaternary);
  background-color: ${(props) => (props.checked ? "#4caf50" : "var(--input)")};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 15px;
  flex: 0 0 auto;
  transition: all 0.3s linear;
`;

const CheckIcon = styled.span<ICheckedProps>`
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
  color: ${(props) => (props.checked ? "#fff" : "none")};
`;

const TodoInput = styled.input`
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 16px;
  outline: none;
  background: var(--input);
  color: var(--secondary);
  box-shadow: var(--inner-shadow2);
  transition: all 0.3s linear;
`;

const TodoText = styled.span<ICheckedProps>`
  color: var(--color-text);
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  cursor: ${(props) => (props.checked ? "default" : "pointer")};
  flex: 1;
`;

const IconWrapper = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--button-circle1);
  box-shadow: 4px 4px 20px rgba(142, 155, 174, 0.1);
  transition: all 0.3s linear;
  flex: 0 0 auto;
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

const InnerInner = styled.div`
  width: 28px;
  height: 28px;
  background: var(--button);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #f83939;

  &:hover {
    background: var(--button-hover);
  }
`;

const DeleteIcon = styled.span`
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid var(--quaternary);
  padding: 2px;

  &:hover {
    box-shadow: var(--shadow2);
    ${IconWrapper} {
      display: flex;
    }
  }
`;
