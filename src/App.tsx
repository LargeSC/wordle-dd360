import "./App.css";
import Header from "./components/Header";
import GridContainer from "./components/GridContainer";
import TecladoVirtual from "./components/TecladoVirtual";
import ModalInstrucciones from "./components/ModalInstrucciones";
import ModalStats from "./components/ModalStats";
import { useState } from "react";

const App = () => {
  const [isModalInstrOpen, setIsModalInstrOpen] = useState<boolean>(false);
  const [isModalStatsOpen, setIsModalStatsOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <div className="main-container">
        <Header
          openInstrModal={() => setIsModalInstrOpen(true)}
          openStatsModal={() => setIsModalStatsOpen((prevState) => !prevState)}
        />
        <GridContainer rows={5} cols={5} />
        <TecladoVirtual />
      </div>
      {isModalInstrOpen && (
        <ModalInstrucciones
          closeInstrModal={() => setIsModalInstrOpen(false)}
        />
      )}
      {isModalStatsOpen && <ModalStats />}
    </div>
  );
};

export default App;
