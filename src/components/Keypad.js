import React from "react";
import { useState, useEffect } from "react";

export default function Keypad() {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);

  return <div>Keypad</div>;
}
