import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  // each guess is an array
  const [guesses, setGuesses] = useState([]);
  // help us deal with duplicate guesses
  // each guess is a string
  const [history, setHistory] = useState([]);
  // turns true when user wins game
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects
  // eg [{key: 'a', color: 'yellow'}]

  const formatGuess = () => {};

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = () => {};

  // handle keyup event & tract current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      // 5 max length of the word
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
