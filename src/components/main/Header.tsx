import { FC } from "react";
import "./styles/Header.css";
interface HeaderProps {
  openInstrModal: () => void;
  openStatsModal: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({
  openInstrModal,
  openStatsModal,
  isDarkMode,
  toggleTheme,
}) => {
  const togglerImgSrc = isDarkMode
    ? "./toggle_switch_off.png"
    : "./toggle_switch_on.png";
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
        <img
          src={togglerImgSrc}
          alt="click para modo dia / noche"
          onClick={toggleTheme}
        />
      </div>
    </div>
  );
};

export default Header;
