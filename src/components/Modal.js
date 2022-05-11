import React from "react";

export default function Modal() {
  return (
    <div className="modal">
      <div>
        <h1>You Won</h1>
        <p className="solution"></p>
        <p>You found the solution in this amount of guesses.</p>
      </div>
      <div>
        <h1>Out of turns, you lost.</h1>
        <p className="solution"></p>
        <p>Better luck next time.</p>
      </div>
    </div>
  );
}
