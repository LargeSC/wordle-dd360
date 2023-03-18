import { FC } from "react";
import { LetraInterface } from "../../App";
import "./styles/GridContainer.css";

interface GridContainerProps {
  letras: LetraInterface[];
}

const GridContainer: FC<GridContainerProps> = ({ letras }) => {
  const espaciosGrid = new Array(25 - letras.length).fill("");

  return (
    <div className="grid-container">
      {letras.map((item, i) => (
        <div
          className={`grid-item letra-${item.estado}`}
          key={`grid-item-${i}`}
        >
          {item.valor}
        </div>
      ))}
      {espaciosGrid.map((item, i) => (
        <div className="grid-item" key={`grid-espacio-${i}`}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default GridContainer;
