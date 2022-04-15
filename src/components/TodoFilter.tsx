import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import {
  toggleFilter,
  getCompletedTodoCount,
} from "../features/todo/todoSlice";

const TodoFilter: FC = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<Filter>("all");
  const todosCount = useSelector(getCompletedTodoCount);

  useEffect(() => {
    dispatch(toggleFilter(filter));
  }, [filter]);

  return (
    <Container>
      <Filters>
        <Button onClick={() => setFilter("all")} active={filter === "all"}>
          All
        </Button>
        <Button
          onClick={() => setFilter("active")}
          active={filter === "active"}
        >
          Active
        </Button>
        <Button
          disabled={todosCount === 0}
          onClick={() => setFilter("completed")}
          active={filter === "completed"}
        >
          Completed
        </Button>
      </Filters>
    </Container>
  );
};

export default TodoFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 24px;
  background: var(--switch-bg);
  box-shadow: var(--inner-shadow);
  border-radius: 10px;
  padding: 2px;
  box-sizing: content-box;
`;

interface IButtonProps {
  active?: boolean;
  disabled?: boolean;
}

const Button = styled.button<IButtonProps>`
  font-family: "Source Sans Pro", sans-serif;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 12px;
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
