import { FC, useState } from "react";
import {
  getCompletedTodoCount,
  getActiveTodosCount,
} from "../features/todo/todoSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "./Modal";

const TodoFooter: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const todosCount = useSelector(getActiveTodosCount);
  const completedCount = useSelector(getCompletedTodoCount);
  const itemSpec = todosCount <= 1 ? "item" : "items";

  return (
    <Container>
      <ItemText>
        {todosCount} {itemSpec} left, {completedCount} completed
      </ItemText>
      {completedCount > 0 && (
        <Button active={true} onClick={() => setShowModal(true)}>
          Clear Completed
        </Button>
      )}
      {showModal && <Modal setShowModal={setShowModal} type="completed" />}
    </Container>
  );
};

export default TodoFooter;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 24px;
  border-top: 1px solid var(--quaternary);
  padding-top: 20px;
`;

const ItemText = styled.span`
  font-size: 12px;
  color: var(--secondary);
  font-weight: 500;
`;

interface IButtonProps {
  active?: boolean;
  disabled?: boolean;
}

const Button = styled.button<IButtonProps>`
  font-family: "Source Sans Pro", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 12px;
  text-transform: uppercase;
  letter-spacing: -0.08px;
  color: ${({ active }) => (active ? "#4caf50" : "#828282")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  text-align: center;
  min-width: 90px;
  background: ${({ active }) => (active ? "var(--primary)" : "transparent")};
  border: ${({ active }) =>
    active ? "0.5px solid rgba(0, 0, 0, 0.05)" : "none"};
  box-shadow: ${({ active }) =>
    active
      ? "0px 2px 6px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.04)"
      : "none"};
  border-radius: 6.93px;
  padding: 5px 10px;

  &:hover {
    color: ${({ disabled }) => (disabled ? "#828282" : "#f09009")};
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "var(--primary)"};
    border: ${({ disabled }) =>
      !disabled ? "0.5px solid rgba(0, 0, 0, 0.05)" : "none"};
    box-shadow: ${({ disabled }) =>
      !disabled
        ? "0px 2px 6px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.04)"
        : "none"};
  }
`;
