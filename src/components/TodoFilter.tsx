import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { toggleFilter, deleteCompleted } from "../features/todo/todoSlice";
import iconCross from "../assets/icon-cross.svg";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ setShowModal }) => {
  const dispatch = useAppDispatch();

  const deleteCompletedTodos = () => {
    dispatch(deleteCompleted());
    setShowModal(false);
  };

  return (
    <ModalContainer onClick={() => setShowModal(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalIconWrapper>
          <ModalIconInner>
            <ModalIcon>warning</ModalIcon>
          </ModalIconInner>
        </ModalIconWrapper>
        <ModalHeader>Are You Sure?</ModalHeader>
        <ModalText>
          If you delete all completed tasks, you can't get them back.
        </ModalText>
        <ModalButtons>
          <ModalButton onClick={() => setShowModal(false)}>Cancel</ModalButton>
          <ModalButton delete={true} onClick={() => deleteCompletedTodos()}>
            Confirm
          </ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalContainer>
  );
};

const TodoFilter: FC = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState<boolean>(false);

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
          onClick={() => setFilter("completed")}
          active={filter === "completed"}
        >
          Completed
        </Button>
      </Filters>
      {/* TODO: check there's completed todo */}
      <Button onClick={() => setShowModal(true)}>Clear Completed</Button>
      {showModal && <Modal setShowModal={setShowModal} />}
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
`;

interface IButtonProps {
  active?: boolean;
}

const Button = styled.span<IButtonProps>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ active }) => (active ? "#4caf50" : "#828282")};
  cursor: pointer;
  text-align: center;
  min-width: 90px;
  border: 1px solid #828282;
  border-radius: 10px;
  padding: 5px 10px;
  margin-bottom: 5px;

  &:hover {
    color: #fff;
    background-color: #828282;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 60px;
  padding-bottom: 10px;
`;

const ModalHeader = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #eb2424;
`;

const ModalIconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 40px;
  //background-image: url(${iconCross});
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-bottom: none;
  border: 10px solid rgba(0, 0, 0, 0.5);
  background-color: white;
  backdrop-filter: blur(5px);
`;

const ModalIconInner = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalIcon = styled.span`
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";

  text-align: center;
  width: 80%;
  height: 80%;
  font-size: 48px;
  color: #eb2424;
`;

const ModalText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #828282;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

interface ModalButtonProps {
  delete?: boolean;
}

const ModalButton = styled.span<ModalButtonProps>`
  align-self: end;
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => (props.delete ? "#fff" : "#fff")};
  background-color: ${(props) => (props.delete ? "#eb2424" : "#828282")};
  cursor: pointer;
  text-align: center;
  min-width: 90px;
  border-radius: 5px;
  padding: 8px 10px;
  margin-bottom: 5px;
`;
