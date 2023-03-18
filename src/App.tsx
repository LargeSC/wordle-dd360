import "./App.css";
import Header from "./components/main/Header";
import GridContainer from "./components/main/GridContainer";
import TecladoVirtual from "./components/main/TecladoVirtual";
import ModalInstrucciones from "./components/modales/ModalInstrucciones";
import ModalStats from "./components/modales/ModalStats";
import { useCallback, useEffect, useState } from "react";

type EstadoLetraType = "correcta" | "erronea" | "misplaced" | "";

enum EstadoLetra {
  correcta = "correcta",
  erronea = "erronea",
  misplaced = "misplaced",
  none = "",
}
export interface LetraInterface {
  valor: string;
  estado: EstadoLetraType;
}

const App = () => {
  const [isModalInstrOpen, setIsModalInstrOpen] = useState<boolean>(true);
  const [isModalStatsOpen, setIsModalStatsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [juegosPlayed, setJuegosPlayed] = useState<number>(0);
  const [juegosWon, setJuegosWon] = useState<number>(0);
  const palabraSecreta = "DUMMY";
  const [letras, setLetras] = useState<LetraInterface[]>([]);
  const [showPalabraSecreta, setShowPalabraSecreta] = useState<boolean>(false);

  const handleDelete = useCallback(() => {
    if (letras.length % 5 !== 0) {
      setLetras((prevLetras) => prevLetras.slice(0, prevLetras.length - 1));
    }
  }, [letras]);

  const checaPalabra = useCallback(
    (palabraSecreta: string, letras: LetraInterface[]) => {
      const newLetras = letras.map((letra, index) => {
        if (letra.estado === EstadoLetra.none) {
          if (letra.valor === palabraSecreta[index % 5]) {
            return { ...letra, estado: EstadoLetra.correcta };
          } else if (palabraSecreta.includes(letra.valor)) {
            return { ...letra, estado: EstadoLetra.misplaced };
          } else {
            return { ...letra, estado: EstadoLetra.erronea };
          }
        }
        return letra;
      });
      setLetras(newLetras);

      let palabra = newLetras.slice(newLetras.length - 5, newLetras.length);
      const palabraCorrecta = palabra.every(
        (letra) => letra.estado === EstadoLetra.correcta
      );

      if (palabraCorrecta) {
        setJuegosWon((prevJuegosWon) => prevJuegosWon + 1);
        setJuegosPlayed((prevJuegosPlayed) => prevJuegosPlayed + 1);
        setIsModalStatsOpen(true);
        setLetras([]);
      } else if (letras.length === 25) {
        setJuegosPlayed((prevJuegosPlayed) => prevJuegosPlayed + 1);
        setShowPalabraSecreta(true);
        setIsModalStatsOpen(true);
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const keyMay = e.key.toUpperCase();
      if (e.key === "Escape") {
        setIsModalInstrOpen(false);
        setIsModalStatsOpen(false);
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key.match(/^[a-zA-ZñÑ]$/) && letras.length < 25) {
        setLetras((prevLetras) => [
          ...prevLetras,
          { valor: keyMay, estado: "" },
        ]);
      }
    },
    [handleDelete, letras]
  );

  const handleClickKey = (keyMay: string) => {
    if (letras.length < 25) {
      setLetras((prevLetras) => [...prevLetras, { valor: keyMay, estado: "" }]);
    }
  };

  useEffect(() => {
    // Si es palabra completa y no se han hecho los checks aun, hazlos
    if (
      letras.length % 5 === 0 &&
      letras.some((letra) => letra.estado === EstadoLetra.none)
    ) {
      checaPalabra(palabraSecreta, letras);
    }
  }, [letras, checaPalabra, palabraSecreta]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
        <GridContainer letras={letras} />
        <TecladoVirtual
          letras={letras}
          handleClickKey={handleClickKey}
          handleDelete={handleDelete}
        />
      </div>
      {isModalInstrOpen && (
        <ModalInstrucciones
          closeInstrModal={() => setIsModalInstrOpen(false)}
        />
      )}
      {isModalStatsOpen && (
        <ModalStats
          juegosPlayed={juegosPlayed}
          juegosWon={juegosWon}
          closeStatsModal={() => setIsModalStatsOpen(false)}
          showPalabraSecreta={showPalabraSecreta}
          timer="4:01"
          palabraSecreta={palabraSecreta}
        />
      )}
    </div>
  );
};

export default App;
