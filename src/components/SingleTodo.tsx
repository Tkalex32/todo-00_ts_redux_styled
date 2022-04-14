import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { toggleTodo, updateTodo } from "../features/todo/todoSlice";
import styled from "styled-components";
import iconCheck from "../assets/icon-check.svg";
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
        />
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
  flex: 0 0 auto;
`;

const TodoInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 16px;
  outline: none;
  color: #333;
`;

const TodoText = styled.span<ICheckedProps>`
  color: ${(props) => (props.theme.dark ? "#fff" : "#828282;")};
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
  background: linear-gradient(
    180deg,
    rgba(153, 160, 169, 0.4) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  box-shadow: 4px 4px 20px rgba(142, 155, 174, 0.1);
  flex: 0 0 auto;
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
  color: #f00909;

  &:hover {
    background: linear-gradient(146.45deg, #cbd0d9 14.49%, #ffffff 85.19%);
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
  border-top: 1px solid #e5e5e5;
  padding: 2px;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    ${IconWrapper} {
      display: flex;
    }
  }
`;
