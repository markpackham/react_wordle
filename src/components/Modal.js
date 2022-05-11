import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Won</h1>
          <p className="solution"></p>
          <p>You found the solution in {turn} guesses.</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Out of turns, you lost.</h1>
          <p className="solution"></p>
          <p>Better luck next time, the answer was {solution}.</p>
        </div>
      )}
    </div>
  );
}
