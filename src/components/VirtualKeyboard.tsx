import { FC } from "react";
import styled from "styled-components";
import { LetterInterface } from "../App";
interface VirtualKeyboardProps {
  letters: LetterInterface[];
  handleClickKey: (letter: string) => void;
  handleDelete: () => void;
}

const KeyboardContainer = styled.div`
  width: 20rem;
  height: 7.5rem;
  padding: 1rem 1.125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background-shaded);
  margin-bottom: 5rem;
  border-radius: 0.5rem;

  @media (min-width: 768px) {
    & div:nth-child(2) {
      align-self: flex-end;
    }
    & div:nth-child(3) {
      align-self: flex-start;
    }
  }
`;

const KeyboardRow = styled.div`
  display: flex;
  gap: 0.225rem;
  margin-bottom: 0.225rem;
`;

const Key = styled.div`
  width: 1.4rem;
  height: 1.6rem;
  background: var(--key-back);
  border-radius: 0.125rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.className ? "#fff" : "var(--key-text)")};
  cursor: pointer;

  &:hover {
    scale: 1.1;
    transition: scale 0.2s ease;
  }

  &.key-correct {
    background-color: #66a060;
  }

  &.key-misplaced {
    background-color: #ceb02c;
  }

  &.key-wrong {
    background-color: #818181;
  }

  @media (max-width: 768px) {
    width: 1.6rem;
    height: 2rem;
    font-size: 1rem;
  }
`;

const LargeKey = styled(Key)`
  width: 2.25rem;
  font-size: 0.5rem;

  & path {
    fill: var(--key-text);
  }
  @media (max-width: 768px) {
    width: 2.5rem;
    font-size: 0.65rem;
  }
`;

const VirtualKeyboard: FC<VirtualKeyboardProps> = ({
  letters,
  handleClickKey,
  handleDelete,
}) => {
  const keyboardKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];

  return (
    <KeyboardContainer>
      {keyboardKeys.map((keyboardRow, index) => {
        return (
          <KeyboardRow key={`row${index}`}>
            {keyboardRow.map((key) => {
              if (key.length === 1) {
                const keyState = letters.find(
                  (letter) => letter.value === key
                )?.state;
                return (
                  <Key
                    key={key}
                    className={`${keyState ? `key-${keyState}` : ""}`}
                    onClick={() => handleClickKey(key)}
                  >
                    {key}
                  </Key>
                );
              } else if (key === "DEL") {
                return (
                  <LargeKey key={key} onClick={handleDelete}>
                    <svg
                      width="31"
                      height="18"
                      viewBox="0 0 23 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.94968 4.31639L13.587 7.78048L17.2243 4.31639L18.3244 5.47152L14.7435 8.88191L18.3244 12.2923L17.2243 13.4474L13.587 9.98334L9.94968 13.4474L8.84955 12.2923L12.4305 8.88191L8.84955 5.47152L9.94968 4.31639Z" />
                      <path d="M6.68607 0.906006C6.39072 0.906006 6.1119 1.04237 5.93057 1.27551L0.47151 8.2943C0.202693 8.63992 0.202694 9.1239 0.47151 9.46952L5.93057 16.4883C6.1119 16.7214 6.39071 16.8578 6.68607 16.8578H21.6027C22.1313 16.8578 22.5599 16.4293 22.5599 15.9007V1.86311C22.5599 1.33451 22.1313 0.906006 21.6027 0.906006H6.68607ZM2.03536 8.88191L6.99814 2.50119H20.9647V15.2626H6.99814L2.03536 8.88191Z" />
                    </svg>
                  </LargeKey>
                );
              } else {
                return (
                  // This is the case only for ENTER, no action is executed on click
                  <LargeKey key={key}>{key}</LargeKey>
                );
              }
            })}
          </KeyboardRow>
        );
      })}
    </KeyboardContainer>
  );
};

export default VirtualKeyboard;
