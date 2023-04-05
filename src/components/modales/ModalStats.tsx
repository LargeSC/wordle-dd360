import { FC } from "react";
import "./styles/Modales.css";

interface ModalStatsProps {
  closeStatsModal: () => void;
  gamesPlayed: number;
  gamesWon: number;
  timer: number;
  showSecretWord: boolean;
  secretWords: string[];
}

const ModalStats: FC<ModalStatsProps> = ({
  closeStatsModal,
  gamesPlayed,
  gamesWon,
  timer,
  showSecretWord,
  secretWords,
}) => {
  const timerMinutes = Math.floor(timer / 60);
  const timerSeconds = timer % 60;

  return (
    <div className="container-modal">
      <div className="modal-stats">
        <h3>Estadísticas</h3>

        <div className="stats-container">
          <div className="stats-item">
            <p className="stats-num">{gamesPlayed}</p>
            <p>Jugadas</p>
          </div>
          <div className="stats-item">
            <p className="stats-num">{gamesWon}</p>
            <p>Victorias</p>
          </div>
        </div>

        {showSecretWord && (
          <p>
            La palabra era{" "}
            <strong>{secretWords[secretWords.length - 2]}</strong>
          </p>
        )}

        <div className="timer-container">
          <p className="timer-txt">SIGUIENTE PALABRA</p>
          <p className="timer-num">
            {timerMinutes}:
            {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
          </p>
        </div>

        <div className="btn-modal" onClick={closeStatsModal}>
          Aceptar
        </div>
      </div>
    </div>
  );
};

export default ModalStats;
