import React from "react";
import Row from "./Row";

export default function Grid({ guesses, currentGuess, turn }) {
  return (
    <div>
      {guesses.map((guess, i) => {
        return <Row key={i} guess={guess} />;
      })}
    </div>
  );
}
