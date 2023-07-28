import "./Main.css";
import Dice from "./Dice";
import React, { useState } from "react";
import Confetti from "react-confetti";

export default function Main() {
  // code

  function getDiceObjects() {
    let diceObjects = [];
    for (let i = 0; i < 10; i++) {
      let obj = { value: Math.ceil(Math.random() * 6), isHeld: false, id: i };
      diceObjects.push(obj);
    }
    return diceObjects;
  }

  const [diceObjects, setDiceObjects] = useState(getDiceObjects());
  const [gameOver, setGameOver] = useState(false);

  React.useEffect(() => {
    let value = diceObjects[0].value;
    let i = 0;
    while (
      diceObjects[i] &&
      diceObjects[i].isHeld &&
      diceObjects[i].value === value
    ) {
      i++;
    }
    if (i === 10) {
      setGameOver(true);
      console.log("Game won");
    }
  }, [diceObjects]);

  const diceElements = diceObjects.map((obj) => (
    <Dice
      key={obj.id}
      value={obj.value}
      isHeld={obj.isHeld}
      changeIsHeld={() => {
        changeIsHeld(obj.id);
      }}
    />
  ));

  function rollDices() {
    const newDiceObjects = diceObjects.map((obj) => {
      obj.value = obj.isHeld ? obj.value : Math.ceil(Math.random() * 6);
      return obj;
    });
    setDiceObjects(newDiceObjects);
  }

  function changeIsHeld(_id) {
    const newDiceObjects = diceObjects.map((obj) => {
      obj.isHeld = obj.id === _id ? !obj.isHeld : obj.isHeld;
      return obj;
    });
    setDiceObjects(newDiceObjects);
  }

  return (
    <div className="Main">
      {gameOver && <Confetti wind={0.04} />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="Dices">{diceElements}</div>
      <button className="Roll_btn" onClick={rollDices}>
        {gameOver ? "Reset" : "Roll"}
      </button>
    </div>
  );
}
