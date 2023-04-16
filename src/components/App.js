import React, { Fragment, useEffect, useState } from "react";
import styles from "../styles/App.module.css";
import Dice from "./Dice";
import Confetti from "react-confetti";

//More features to add:
//1. CSS: put real dots on the dice and not a number
//2. Track the number of rolls needed to win
//3. Track the time it took to win
//4. Save your best time to localStorage

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const winValue = dice[0].value;
    let winStatus = dice.every((d) => d.isHeld && winValue === d.value);
    if (winStatus) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: i + 1,
      });
    }
    return diceArray;
  }

  function holdDice(event, id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die, index) => (
    <Dice
      value={die.value}
      isHeld={die.isHeld}
      key={index}
      id={die.id}
      holdDice={holdDice}
    />
  ));

  function rollDices() {
    //If Won
    if (tenzies) {
      setTenzies((tenzies) => !tenzies);
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: die.id,
              };
        })
      );
    }
  }

  return (
    <Fragment>
      <div className={styles.App}>
        {tenzies && <Confetti width={width} height={height} />}
        <h1 className={styles.title}>Tenzies</h1>
        <p className={styles.instructions}>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className={styles.diceContainer}>{diceElements}</div>
        <button className={styles.rollBtn} onClick={rollDices}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </Fragment>
  );
}

export default App;
