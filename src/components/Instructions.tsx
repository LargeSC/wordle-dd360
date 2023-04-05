import { FC } from "react";
import GridInstructions from "./GridInstructions";
import { ModalButton, ModalHeader, ModalText } from "./Modal";

interface InstructionsProps {
  closeModal: () => void;
}

const Instructions: FC<InstructionsProps> = ({ closeModal }) => {
  return (
    <>
      <ModalHeader>Cómo jugar</ModalHeader>
      <div>
        <ModalText>Adivina la palabra oculta en cinco intentos.</ModalText>
        <ModalText>
          Cada intento debe ser una palabra válida de 5 letras.
        </ModalText>
        <ModalText>
          Después de cada intento el color de las letras cambia para mostrar qué
          tan cerca estás de acertar la palabra.
        </ModalText>
      </div>
      <div>
        <ModalText>
          <strong>Ejemplos</strong>
        </ModalText>
        <GridInstructions
          word="gatos"
          specialLetter="g"
          specialType="correct"
        />
        <ModalText>
          La letra <strong>G</strong> está en la palabra y en la posición
          correcta.
        </ModalText>
        <GridInstructions
          word="vocal"
          specialLetter="c"
          specialType="misplaced"
        />
        <ModalText>
          La letra <strong>C</strong> está en la palabra pero en la posición
          incorrecta. correcta.
        </ModalText>
        <GridInstructions word="canto" specialLetter="o" specialType="wrong" />
        <ModalText>
          La letra <strong>O</strong> no está en la palabra.
        </ModalText>
        <ModalText>
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </ModalText>
        <ModalText style={{ textAlign: "center" }}>
          ¡Una palabra nueva cada 5 minutos!
        </ModalText>
      </div>
      <ModalButton onClick={closeModal}>!JUGAR¡</ModalButton>
    </>
  );
};

export default Instructions;
