import { FC } from "react";
import GridContainerInstr from "./GridContainerInstr";
import "./styles/Modales.css";

interface ModalInstruccionesProps {
  closeInstrModal: () => void;
}

const ModalInstrucciones: FC<ModalInstruccionesProps> = ({
  closeInstrModal,
}) => {
  return (
    <div className="container-modal">
      <div className="modal-instrucciones">
        <h3>Cómo jugar</h3>
        <div>
          <p>Adivina la palabra oculta en cinco intentos.</p>
          <p>Cada intento debe ser una palabra válida de 5 letras.</p>
          <p>
            Después de cada intento el color de las letras cambia para mostrar
            qué tan cerca estás de acertar la palabra.
          </p>
        </div>
        <div>
          <p>
            <strong>Ejemplos</strong>
          </p>
          <GridContainerInstr
            word="gatos"
            specialLetter="g"
            specialType="correct"
          />
          <p>
            La letra <strong>G</strong> está en la palabra y en la posición
            correcta.
          </p>
          <GridContainerInstr
            word="vocal"
            specialLetter="c"
            specialType="misplaced"
          />
          <p>
            La letra <strong>C</strong> está en la palabra pero en la posición
            incorrecta. correcta.
          </p>
          <GridContainerInstr
            word="canto"
            specialLetter="o"
            specialType="wrong"
          />
          <p>
            La letra <strong>O</strong> no está en la palabra.
          </p>
          <p>
            Puede haber letras repetidas. Las pistas son independientes para
            cada letra.
          </p>
          <p className="center-text">¡Una palabra nueva cada 5 minutos!</p>
        </div>
        <div className="btn-modal" onClick={closeInstrModal}>
          !JUGAR¡
        </div>
      </div>
    </div>
  );
};

export default ModalInstrucciones;
