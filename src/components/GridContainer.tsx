import { FC } from "react";

interface GridContainerProps {
  rows: number;
  cols: number;
}

const GridContainer: FC<GridContainerProps> = ({ rows, cols }) => {
  return (
    <div className="grid-container">
      <h1>Rows</h1>
    </div>
  );
};

export default GridContainer;
