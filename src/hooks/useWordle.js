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
  // the key is a letter used and the value the color eg {a: 'green', b: 'yellow', c: 'grey}
  const [usedKeys, setUsedKeys] = useState({});

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
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
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
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }

        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.key] = "yellow";
          return;
        }

        if (
          letter.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[letter.key] = "grey";
          return;
        }
      });

      return newKeys;
    });
    setCurrentGuess("");
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

      const formatted = formatGuess();
      addNewGuess(formatted);
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
  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
