import "./App.css";
import Header from "./components/Header";
import GridContainer from "./components/GridContainer";
import TecladoVirtual from "./components/TecladoVirtual";
import ModalInstrucciones from "./components/ModalInstrucciones";
import ModalStats from "./components/ModalStats";
import { useEffect, useState } from "react";

const App = () => {
  const [isModalInstrOpen, setIsModalInstrOpen] = useState<boolean>(false);
  const [isModalStatsOpen, setIsModalStatsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsModalInstrOpen(false);
      setIsModalStatsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [isDarkMode]);

  return (
    <div className="App">
      <div className="main-container">
        <Header
          openInstrModal={() => setIsModalInstrOpen(true)}
          openStatsModal={() => setIsModalStatsOpen((prevState) => !prevState)}
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode((prevState) => !prevState)}
        />
        <GridContainer rows={5} cols={5} />
        <TecladoVirtual />
      </div>
      {isModalInstrOpen && (
        <ModalInstrucciones
          closeInstrModal={() => setIsModalInstrOpen(false)}
        />
      )}
      {isModalStatsOpen && (
        <ModalStats closeStatsModal={() => setIsModalStatsOpen(false)} />
      )}
    </div>
  );
};

export default App;
