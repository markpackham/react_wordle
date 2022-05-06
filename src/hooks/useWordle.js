import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  // each guess is an array with a length of 6 with undefined values
  const [guesses, setGuesses] = useState([...Array(6)]);
  // help us deal with duplicate guesses
  // each guess is a string
  const [history, setHistory] = useState([]);
  // turns true when user wins game
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects
  // eg [{key: 'a', color: 'yellow'}]

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "green";
        // set to null since it is correct and avoid duplicates
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((letter, i) => {
      // not only check if letter exists but forbid it from effecting green ones
      if (solutionArray.includes(letter.key) && letter.color != "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      // user won game
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
  };

  // handle keyup event & tract current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // only add guess if turn less than 5
      if (turn > 5) {
        console.log("Game over, 5 guess max");
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("You already tried that word.");
        return;
      }
      // check word is 5 chars long
      if (currentGuess.length !== 5) {
        console.log("Guess must be 5 letters");
        return;
      }

      const formatteed = formatGuess();
      addNewGuess(formatteed);
    }

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
