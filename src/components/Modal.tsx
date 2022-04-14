import React, { FC } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { deleteCompleted, removeTodo } from "../features/todo/todoSlice";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  id?: string;
}

const Modal: FC<ModalProps> = ({ setShowModal, type, id }) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    type === "completed"
      ? dispatch(deleteCompleted())
      : dispatch(removeTodo(id as string));
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
          If you delete
          {type === "completed"
            ? ` all completed tasks, you can't
          get them back.`
            : ` a task, you can't get it back.`}
          ,
        </ModalText>
        <ModalButtons>
          <ModalButton onClick={() => setShowModal(false)}>Cancel</ModalButton>
          <ModalButton delete={true} onClick={() => deleteHandler()}>
            Confirm
          </ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;

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
  background: linear-gradient(146.45deg, #ffffff 14.49%, #cbd0d9 85.19%);
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
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
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
