import { FC } from "react";
import "../main/styles/GridContainer.css";

interface GridContainerInstrProps {
  palabra: string;
  letraEspecial: string;
  tipoEspecial: "correcta" | "erronea" | "misplaced";
}

const GridContainerInstr: FC<GridContainerInstrProps> = ({
  palabra,
  letraEspecial,
  tipoEspecial,
}) => {
  const letras = palabra.split("");

  return (
    <div className="grid-container">
      {letras.map((letra, index) => {
        if (letra === letraEspecial) {
          return (
            <div
              key={index}
              className={`grid-item letra-${tipoEspecial} item-instr`}
            >
              {letra}
            </div>
          );
        } else {
          return (
            <div key={index} className="grid-item item-instr">
              {letra}
            </div>
          );
        }
      })}
    </div>
  );
};

export default GridContainerInstr;
