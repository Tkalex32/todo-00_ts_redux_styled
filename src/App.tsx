import { FC } from "react";
import styled from "styled-components";
import TodoList from "./components/TodoList";

const App: FC = () => {
  return (
    <Container>
      <TodoList />
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--color-background);
  padding: 20px;
  transition: all 0.3s linear;
`;
