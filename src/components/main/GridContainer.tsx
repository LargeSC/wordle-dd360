import { FC } from "react";
import { LetterInterface } from "../../App";
import "./styles/GridContainer.css";

interface GridContainerProps {
  letters: LetterInterface[];
}

const GridContainer: FC<GridContainerProps> = ({ letters }) => {
  const gridAvailableSpots = new Array(25 - letters.length).fill("");

  return (
    <div className="grid-container">
      {letters.map((letter, i) => (
        <div
          className={`grid-item letter-${letter.state}`}
          key={`grid-item-${i}`}
        >
          {letter.value}
        </div>
      ))}
      {gridAvailableSpots.map((item, i) => (
        <div className="grid-item" key={`grid-spot-${i}`}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default GridContainer;
