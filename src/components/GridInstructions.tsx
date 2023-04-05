import { FC } from "react";
import { LetterStateType } from "../App";
import { GridContainer, GridItem } from "./Grid";

interface GridInstructionsProps {
  word: string;
  specialLetter: string;
  specialType: LetterStateType;
}

const GridInstructions: FC<GridInstructionsProps> = ({
  word,
  specialLetter,
  specialType,
}) => {
  const letters = word.split("");

  return (
    <GridContainer>
      {letters.map((letter, index) => {
        if (letter === specialLetter) {
          return (
            <GridItem
              key={index}
              className={`letter-${specialType} item-instr`}
              style={{ color: "#fff" }}
            >
              {letter}
            </GridItem>
          );
        } else {
          return (
            <GridItem key={index} className="item-instr">
              {letter}
            </GridItem>
          );
        }
      })}
    </GridContainer>
  );
};

export default GridInstructions;
