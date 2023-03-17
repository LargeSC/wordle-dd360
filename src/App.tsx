import "./App.css";
import Header from "./components/Header";
import GridContainer from "./components/GridContainer";
import TecladoVirtual from "./components/TecladoVirtual";
import ModalInstrucciones from "./components/ModalInstrucciones";
import ModalStats from "./components/ModalStats";
import { useState } from "react";

const App = () => {
  const [isModalInstrOpen, setIsModalInstrOpen] = useState(false);
  const [isModalStatsOpen, setIsModalStatsOpen] = useState(false);

  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <GridContainer rows={5} cols={5} />
        <TecladoVirtual />
      </div>
      {isModalInstrOpen && <ModalInstrucciones />}
      {isModalStatsOpen && <ModalStats />}
    </div>
  );
};

export default App;
