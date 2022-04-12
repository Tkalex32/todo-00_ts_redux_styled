import styled from "styled-components";
import TodoList from "./components/TodoList";

const App = () => {
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
`;
