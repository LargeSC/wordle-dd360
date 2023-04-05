import { FC } from "react";
import { LetterStateType } from "../../App";
import "../main/styles/GridContainer.css";

interface GridContainerInstrProps {
  word: string;
  specialLetter: string;
  specialType: LetterStateType;
}

const GridContainerInstr: FC<GridContainerInstrProps> = ({
  word,
  specialLetter,
  specialType,
}) => {
  const letters = word.split("");

  return (
    <div className="grid-container">
      {letters.map((letter, index) => {
        if (letter === specialLetter) {
          return (
            <div
              key={index}
              className={`grid-item key-${specialType} item-instr`}
            >
              {letter}
            </div>
          );
        } else {
          return (
            <div key={index} className="grid-item item-instr">
              {letter}
            </div>
          );
        }
      })}
    </div>
  );
};

export default GridContainerInstr;
