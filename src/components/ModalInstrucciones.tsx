import { FC } from "react";
import GridContainerInstr from "./GridContainerInstr";
import "./styles/ModalInstrucciones.css";

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
            palabra="gatos"
            letraEspecial="g"
            tipoEspecial="correcta"
          />
          <p>
            La letra <strong>G</strong> está en la palabra y en la posición
            correcta.
          </p>
          <GridContainerInstr
            palabra="vocal"
            letraEspecial="c"
            tipoEspecial="misplaced"
          />
          <p>
            La letra <strong>C</strong> está en la palabra pero en la posición
            incorrecta. correcta.
          </p>
          <GridContainerInstr
            palabra="canto"
            letraEspecial="o"
            tipoEspecial="erronea"
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
        <div className="btn-jugar" onClick={closeInstrModal}>
          !JUGAR¡
        </div>
      </div>
    </div>
  );
};

export default ModalInstrucciones;
