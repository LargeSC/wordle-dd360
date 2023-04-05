import { FC } from "react";
import "./styles/Header.css";
interface HeaderProps {
  openInstrModal: () => void;
  openStatsModal: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const PUBLIC = process.env.PUBLIC_URL;

const Header: FC<HeaderProps> = ({
  openInstrModal,
  openStatsModal,
  isDarkMode,
  toggleTheme,
}) => {
  const togglerImgSrc = isDarkMode
    ? `${PUBLIC}/toggle_switch_off.png`
    : `${PUBLIC}/toggle_switch_on.png`;
  return (
    <div className="header">
      <img
        src={`${PUBLIC}/instructions_icon.png`}
        alt="click para instrucciones del juego"
        onClick={openInstrModal}
      />
      <h1>WORDLE</h1>
      <div className="stats-button-group">
        <img
          src={`${PUBLIC}/stats_icon.png`}
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
