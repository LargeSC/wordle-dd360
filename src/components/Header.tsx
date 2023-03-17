import "./styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <img
        src="./icono_instrucciones.png"
        alt="click para instrucciones del juego"
      />
      <h1>WORDLE</h1>
      <div className="stats-button-group">
        <img src="./icono_stats.png" alt="click para ver tus estadisticas" />
        <img src="./toggle_switch_on.png" alt="click para modo dia / noche" />
      </div>
    </div>
  );
};

export default Header;
