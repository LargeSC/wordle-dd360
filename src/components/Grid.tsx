import { FC } from "react";
import styled from "styled-components";
import { LetterInterface } from "../App";

interface GridContainerProps {
  letters: LetterInterface[];
}

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
`;
export const GridItem = styled.div`
  background-color: rgba(147, 155, 159, 0.3);
  color: #fff;
  text-align: center;
  border-radius: 0.25rem;
  height: 2.375rem;
  width: 2.375rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  border: ${(props) => (props.className ? "unset" : "")};

  &.item-instr {
    background-color: var(--item-instr-back);
    color: var(--text-color);
    border: ${(props) =>
      props.className === "item-instr"
        ? "1px solid var(--border-color)"
        : "unset"};
  }

  &.letter-misplaced {
    background-color: #ceb02c;
  }
  &.letter-wrong {
    background-color: #939b9f;
  }
  &.letter-correct {
    background-color: #66a060;
  }
`;

const Grid: FC<GridContainerProps> = ({ letters }) => {
  const gridAvailableSpots = new Array(25 - letters.length).fill("");

  return (
    <GridContainer>
      {letters.map((letter, i) => (
        <GridItem className={`letter-${letter.state}`} key={`grid-item-${i}`}>
          {letter.value}
        </GridItem>
      ))}
      {gridAvailableSpots.map((item, i) => (
        <GridItem key={`grid-spot-${i}`}>{item}</GridItem>
      ))}
    </GridContainer>
  );
};

export default Grid;
