import { FC } from "react";
import "./styles/GridContainer.css";

interface GridContainerProps {
  rows: number;
  cols: number;
}

const GridContainer: FC<GridContainerProps> = ({ rows, cols }) => {
  return (
    <div className="grid-container">
      <div className="grid-item letra-correcta">A</div>
      <div className="grid-item letra-misplaced">A</div>
      <div className="grid-item letra-erronea">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
      <div className="grid-item">A</div>
    </div>
  );
};

export default GridContainer;
