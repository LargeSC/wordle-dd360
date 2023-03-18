import "./App.css";
import Header from "./components/main/Header";
import GridContainer from "./components/main/GridContainer";
import TecladoVirtual from "./components/main/TecladoVirtual";
import ModalInstrucciones from "./components/modales/ModalInstrucciones";
import ModalStats from "./components/modales/ModalStats";
import { useCallback, useEffect, useRef, useState } from "react";
import { palabrasFaciles5L } from "./constants/palabrasFaciles";
import diccionario5L from "./constants/diccionario";

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

const TIEMPO_MAX = 300; // 5 minutos
const JUEGO_FACIL = true;
const diccionario = JUEGO_FACIL ? palabrasFaciles5L : diccionario5L;

const App = () => {
  const [isModalInstrOpen, setIsModalInstrOpen] = useState<boolean>(true);
  const [isModalStatsOpen, setIsModalStatsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [juegosPlayed, setJuegosPlayed] = useState<number>(0);
  const [juegosWon, setJuegosWon] = useState<number>(0);
  const [letras, setLetras] = useState<LetraInterface[]>([]);
  const [palabrasSecretas, setPalabrasSecretas] = useState<string[]>([]);
  const [showPalabraSecreta, setShowPalabraSecreta] = useState<boolean>(false);
  const [timer, setTimer] = useState(TIEMPO_MAX);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const palabraSecretaRef = useRef("");

  const iniciaJuego = useCallback(() => {
    setIsFinished(false);
    setTimer(TIEMPO_MAX);
    const palabraRandom =
      diccionario[Math.floor(Math.random() * diccionario.length)].toUpperCase();
    if (!palabrasSecretas.includes(palabraRandom)) {
      setPalabrasSecretas((prevPalabras) => [...prevPalabras, palabraRandom]);
      palabraSecretaRef.current = palabraRandom;
      setLetras([]);
    } else {
      // En caso de que ya exista la palabra en el array, se vuelve a llamar a la función, evitando repetidas.
      iniciaJuego();
    }
  }, [palabrasSecretas]);

  const handleGanar = useCallback(() => {
    setJuegosWon((prevJuegosWon) => prevJuegosWon + 1);
    setJuegosPlayed((prevJuegosPlayed) => prevJuegosPlayed + 1);
    setIsModalStatsOpen(true);
    setShowPalabraSecreta(false);
    setIsFinished(true);
    iniciaJuego();
  }, [iniciaJuego]);

  const handlePerder = useCallback(() => {
    setJuegosPlayed((prevJuegosPlayed) => prevJuegosPlayed + 1);
    setIsModalStatsOpen(true);
    setShowPalabraSecreta(true);
    setIsFinished(true);
    iniciaJuego();
  }, [iniciaJuego]);

  const handleDelete = useCallback(() => {
    if (letras.length % 5 !== 0) {
      setLetras((prevLetras) => prevLetras.slice(0, prevLetras.length - 1));
    }
  }, [letras]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const keyMay = e.key.toUpperCase();
      if (e.key === "Escape") {
        setIsModalInstrOpen(false);
        setIsModalStatsOpen(false);
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (
        e.key.match(/^[a-zA-ZñÑ]$/) &&
        letras.length < 25 &&
        !isFinished
      ) {
        setLetras((prevLetras) => [
          ...prevLetras,
          { valor: keyMay, estado: "" },
        ]);
      }
    },
    [handleDelete, isFinished, letras.length]
  );

  const handleClickKey = (keyMay: string) => {
    if (letras.length < 25 && !isFinished) {
      setLetras((prevLetras) => [...prevLetras, { valor: keyMay, estado: "" }]);
    }
  };

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

      // Toma unicamente las ultimas 5 letras y revisa si son correctas
      let palabra = newLetras.slice(newLetras.length - 5, newLetras.length);
      const isPalabraCorrecta = palabra.every(
        (letra) => letra.estado === EstadoLetra.correcta
      );

      if (isPalabraCorrecta) {
        handleGanar();
      } else if (letras.length === 25) {
        handlePerder();
      }
    },
    [handleGanar, handlePerder]
  );

  useEffect(() => {
    iniciaJuego();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setShowPalabraSecreta(false); // No queremos mostrar la nueva palabra secreta
          iniciaJuego();
          return TIEMPO_MAX;
        }
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [iniciaJuego, isFinished]);

  useEffect(() => {
    // Si es palabra completa y no se han hecho los checks aun, hazlos
    if (
      letras.length % 5 === 0 &&
      letras.some((letra) => letra.estado === EstadoLetra.none)
    ) {
      checaPalabra(palabraSecretaRef.current, letras);
    }
  }, [letras, checaPalabra]);

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
          timer={timer}
          palabrasSecretas={palabrasSecretas ? palabrasSecretas : []}
        />
      )}
    </div>
  );
};

export default App;
