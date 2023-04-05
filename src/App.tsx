/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import easyWordsCatalogue from "./constants/easyWordsCatalogue";
import allWordsCatalogue from "./constants/allWordsCatalogue";
import Header from "./components/Header";
import Grid from "./components/Grid";
import VirtualKeyboard from "./components/VirtualKeyboard";
import Instructions from "./components/Instructions";
import Modal from "./components/Modal";
import Stats from "./components/Stats";
import styled from "styled-components";
import useLocalStorage from "./hooks/useLocalStorage";

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

export type ModalType = "instructions" | "stats";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--modal-shade);
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 35.4rem;
  width: 32rem;
  background-color: var(--background);
`;

const MAX_TIME = 300; // 5 minutes
const IS_EASY_GAME = true; // Possible extra feature, toggle between hard and easy level
const dictionary = IS_EASY_GAME ? easyWordsCatalogue : allWordsCatalogue;

const App = () => {
  const [gamesPlayed, setGamesPlayed] = useLocalStorage<number>("games", 0);
  const [gamesWon, setGamesWon] = useLocalStorage<number>("gamesWon", 0);
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "darkMode",
    false
  );
  const [secretWords, setSecretWords] = useLocalStorage<string[]>(
    "secretWords",
    []
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    gamesPlayed > 0 ? false : true
  );
  const [modalType, setModalType] = useState<ModalType>("instructions");
  const [letters, setLetters] = useState<LetterInterface[]>([]);
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
    setIsModalOpen(true);
    setModalType("stats");
    setShowSecretWord(false);
    setIsFinished(true);
    initGame();
  }, [initGame]);

  const handleLose = useCallback(() => {
    setGamesPlayed((prevGamesPlayed) => prevGamesPlayed + 1);
    setIsModalOpen(true);
    setModalType("stats");
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
        setIsModalOpen(false);
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

  const handleOpenModal = (modalType: ModalType) => {
    console.log("modalType:", modalType);
    setModalType(modalType);
    setIsModalOpen(true);
  };

  const checkWord = useCallback(
    (secretWord: string, letters: LetterInterface[]) => {
      const newLetters = letters.map((letter, index) => {
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
      setLetters(newLetters);

      // Check the last 5 unchecked letters to see if word matches secret word
      let word = newLetters.slice(newLetters.length - 5, newLetters.length);
      const isWordCorrect = word.every(
        (letter) => letter.state === LetterStateEnum.correct
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
    <AppContainer>
      <MainContainer>
        <Header
          openModal={handleOpenModal}
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode((prevState) => !prevState)}
        />
        <Grid letters={letters} />
        <VirtualKeyboard
          letters={letters}
          handleClickKey={handleClickKey}
          handleDelete={handleDelete}
        />
      </MainContainer>
      <Modal
        shouldShow={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        {modalType === "instructions" ? (
          <Instructions closeModal={() => setIsModalOpen(false)} />
        ) : (
          <Stats
            gamesPlayed={gamesPlayed}
            gamesWon={gamesWon}
            closeModal={() => setIsModalOpen(false)}
            showSecretWord={showSecretWord}
            timer={timer}
            secretWords={secretWords ? secretWords : []}
          />
        )}
      </Modal>
    </AppContainer>
  );
};

export default App;
