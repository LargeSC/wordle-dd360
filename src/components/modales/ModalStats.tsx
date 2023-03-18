import { FC } from "react";
import "./styles/ModalStats.css";

interface ModalStatsProps {
  closeStatsModal: () => void;
  juegosPlayed: number;
  juegosWon: number;
  timer: string;
  showPalabraSecreta: boolean;
  palabraSecreta: string;
}

const ModalStats: FC<ModalStatsProps> = ({
  closeStatsModal,
  juegosPlayed,
  juegosWon,
  timer,
  showPalabraSecreta,
  palabraSecreta,
}) => {
  return (
    <div className="container-modal">
      <div className="modal-stats">
        <h3>Estadísticas</h3>

        <div className="stats-container">
          <div className="stats-item">
            <p className="stats-num">{juegosPlayed}</p>
            <p>Jugadas</p>
          </div>
          <div className="stats-item">
            <p className="stats-num">{juegosWon}</p>
            <p>Victorias</p>
          </div>
        </div>

        {showPalabraSecreta && (
          <p>
            La palabra era <strong>{palabraSecreta}</strong>
          </p>
        )}

        <div className="timer-container">
          <p className="timer-txt">SIGUIENTE PALABRA</p>
          <p className="timer-num">{timer}</p>
        </div>

        <div className="btn-modal" onClick={closeStatsModal}>
          Aceptar
        </div>
      </div>
    </div>
  );
};

export default ModalStats;
