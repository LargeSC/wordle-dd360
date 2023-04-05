import "./App.css";
import Header from "./components/main/Header";
import GridContainer from "./components/main/GridContainer";
import VirtualKeyboard from "./components/main/VirtualKeyboard";
import ModalInstrucciones from "./components/modales/ModalInstrucciones";
import ModalStats from "./components/modales/ModalStats";
import { useCallback, useEffect, useRef, useState } from "react";
import easyWordsCatalogue from "./constants/easyWordsCatalogue";
import allWordsCatalogue from "./constants/allWordsCatalogue";

export type LetterStateType = "correct" | "wrong" | "misplaced" | "";

enum LetterStateEnum {
  correct = "correct",
  wrong = "wrong",
  misplaced = "misplaced",
  unchecked = "",
}
export interface LetterInterface {
  value: string;
  state: LetterStateType;
}

const MAX_TIME = 300; // 5 minutes
const IS_EASY_GAME = true; // Possible extra feature, toggle between hard and easy level
const dictionary = IS_EASY_GAME ? easyWordsCatalogue : allWordsCatalogue;

const App = () => {
  const [isModalInstrOpen, setIsModalInstrOpen] = useState<boolean>(true);
  const [isModalStatsOpen, setIsModalStatsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [gamesWon, setGamesWon] = useState<number>(0);
  const [letters, setLetters] = useState<LetterInterface[]>([]);
  const [secretWords, setSecretWords] = useState<string[]>([]);
  const [showSecretWord, setShowSecretWord] = useState<boolean>(false);
  const [timer, setTimer] = useState(MAX_TIME);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const secretWordRef = useRef("");

  const initGame = useCallback(() => {
    setIsFinished(false);
    setTimer(MAX_TIME);
    const randomWord =
      dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();
    if (!secretWords.includes(randomWord)) {
      setSecretWords((prevWords) => [...prevWords, randomWord]);
      secretWordRef.current = randomWord;
      setLetters([]);
    } else {
      // In case the word has been used already restart to avoid duplicates.
      initGame();
    }
  }, [secretWords]);

  const handleWin = useCallback(() => {
    setGamesWon((prevGamesWon) => prevGamesWon + 1);
    setGamesPlayed((prevGamesPlayed) => prevGamesPlayed + 1);
    setIsModalStatsOpen(true);
    setShowSecretWord(false);
    setIsFinished(true);
    initGame();
  }, [initGame]);

  const handleLose = useCallback(() => {
    setGamesPlayed((prevGamesPlayed) => prevGamesPlayed + 1);
    setIsModalStatsOpen(true);
    setShowSecretWord(true);
    setIsFinished(true);
    initGame();
  }, [initGame]);

  const handleDelete = useCallback(() => {
    if (letters.length % 5 !== 0) {
      setLetters((prevLetters) => prevLetters.slice(0, prevLetters.length - 1));
    }
  }, [letters]);

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
        letters.length < 25 &&
        !isFinished
      ) {
        setLetters((prevLetters) => [
          ...prevLetters,
          { value: keyMay, state: "" },
        ]);
      }
    },
    [handleDelete, isFinished, letters.length]
  );

  const handleClickKey = (keyMay: string) => {
    if (letters.length < 25 && !isFinished) {
      setLetters((prevLetters) => [
        ...prevLetters,
        { value: keyMay, state: "" },
      ]);
    }
  };

  const checkWord = useCallback(
    (secretWord: string, letters: LetterInterface[]) => {
      const newLetras = letters.map((letter, index) => {
        if (letter.state === LetterStateEnum.unchecked) {
          if (letter.value === secretWord[index % 5]) {
            return { ...letter, state: LetterStateEnum.correct };
          } else if (secretWord.includes(letter.value)) {
            return { ...letter, state: LetterStateEnum.misplaced };
          } else {
            return { ...letter, state: LetterStateEnum.wrong };
          }
        }
        return letter;
      });
      setLetters(newLetras);

      // Check the last 5 unchecked letters to see if word matches secret word
      let word = newLetras.slice(newLetras.length - 5, newLetras.length);
      const isWordCorrect = word.every(
        (letra) => letra.state === LetterStateEnum.correct
      );

      if (isWordCorrect) {
        handleWin();
      } else if (letters.length === 25) {
        handleLose();
      }
    },
    [handleWin, handleLose]
  );

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setShowSecretWord(false);
          initGame();
          return MAX_TIME;
        }
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [initGame, isFinished]);

  useEffect(() => {
    // If word is 5 letters and checks haven't been performed, execute them
    if (
      letters.length % 5 === 0 &&
      letters.some((letter) => letter.state === LetterStateEnum.unchecked)
    ) {
      checkWord(secretWordRef.current, letters);
    }
  }, [letters, checkWord]);

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
        <GridContainer letters={letters} />
        <VirtualKeyboard
          letters={letters}
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
          gamesPlayed={gamesPlayed}
          gamesWon={gamesWon}
          closeStatsModal={() => setIsModalStatsOpen(false)}
          showSecretWord={showSecretWord}
          timer={timer}
          secretWords={secretWords ? secretWords : []}
        />
      )}
    </div>
  );
};

export default App;
