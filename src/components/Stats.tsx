import { FC } from "react";
import styled from "styled-components";
import { ModalButton, ModalHeader, ModalText } from "./Modal";

interface StatsProps {
  closeModal: () => void;
  gamesPlayed: number;
  gamesWon: number;
  timer: number;
  showSecretWord: boolean;
  secretWords: string[];
}

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1.3rem;
`;

const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StatsNumber = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const TimerNumber = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  margin: 0.25rem;
`;

const TimerText = styled.p`
  font-size: 0.6rem;
  margin: 0;
`;

const Stats: FC<StatsProps> = ({
  closeModal,
  gamesPlayed,
  gamesWon,
  timer,
  showSecretWord,
  secretWords,
}) => {
  const timerMinutes = Math.floor(timer / 60);
  const timerSeconds = timer % 60;

  return (
    <>
      <ModalHeader>Estadísticas</ModalHeader>
      <StatsContainer>
        <StatsItem>
          <StatsNumber>{gamesPlayed}</StatsNumber>
          <ModalText>Jugadas</ModalText>
        </StatsItem>
        <StatsItem>
          <StatsNumber>{gamesWon}</StatsNumber>
          <ModalText>Victorias</ModalText>
        </StatsItem>
      </StatsContainer>

      {showSecretWord && (
        <ModalText>
          La palabra era <strong>{secretWords[secretWords.length - 2]}</strong>
        </ModalText>
      )}

      <TimerContainer>
        <TimerText>SIGUIENTE PALABRA</TimerText>
        <TimerNumber>
          {timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
        </TimerNumber>
      </TimerContainer>

      <ModalButton onClick={closeModal}>Aceptar</ModalButton>
    </>
  );
};

export default Stats;
