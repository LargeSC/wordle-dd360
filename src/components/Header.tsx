import { FC } from "react";
import "./styles/Header.css";
interface HeaderProps {
  openInstrModal: () => void;
  openStatsModal: () => void;
}

const Header: FC<HeaderProps> = ({ openInstrModal, openStatsModal }) => {
  return (
    <div className="header">
      <img
        src="./icono_instrucciones.png"
        alt="click para instrucciones del juego"
        onClick={openInstrModal}
      />
      <h1>WORDLE</h1>
      <div className="stats-button-group">
        <img
          src="./icono_stats.png"
          alt="click para ver tus estadisticas"
          onClick={openStatsModal}
        />
        <img src="./toggle_switch_on.png" alt="click para modo dia / noche" />
      </div>
    </div>
  );
};

export default Header;
