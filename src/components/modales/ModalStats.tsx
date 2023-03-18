import { FC } from "react";
import "./styles/ModalStats.css";

interface ModalStatsProps {
  closeStatsModal: () => void;
  juegosPlayed: number;
  juegosWon: number;
  timer: number;
  showPalabraSecreta: boolean;
  palabrasSecretas: string[];
}

const ModalStats: FC<ModalStatsProps> = ({
  closeStatsModal,
  juegosPlayed,
  juegosWon,
  timer,
  showPalabraSecreta,
  palabrasSecretas,
}) => {
  const minutos = Math.floor(timer / 60);
  const segundos = timer % 60;

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
            La palabra era{" "}
            <strong>{palabrasSecretas[palabrasSecretas.length - 2]}</strong>
          </p>
        )}

        <div className="timer-container">
          <p className="timer-txt">SIGUIENTE PALABRA</p>
          <p className="timer-num">
            {minutos}:{segundos < 10 ? `0${segundos}` : segundos}
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
