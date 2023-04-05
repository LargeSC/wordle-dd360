import { FC, ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  shouldShow: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--modal-shade);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBody = styled.div`
  width: 17rem;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: var(--modal-back);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  color: var(--text-color);
`;

export const ModalText = styled.p`
  font-size: 0.6rem;
`;

export const ModalHeader = styled.h3`
  font-size: 1.125rem;
  margin-top: 0;
`;

export const ModalButton = styled.div`
  width: 8.2rem;
  height: 1.6rem;
  background-color: var(--accent-color);
  color: #fff;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    scale: 1.1;
    transition: scale 0.2s ease;
  }
`;

const Modal: FC<ModalProps> = ({ shouldShow, onRequestClose, children }) => {
  return shouldShow ? (
    <ModalBackground onClick={onRequestClose}>
      <ModalBody onClick={(e) => e.stopPropagation()}>{children}</ModalBody>
    </ModalBackground>
  ) : null;
};

export default Modal;
