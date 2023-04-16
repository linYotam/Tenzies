import React from "react";
import styles from "../styles/Dice.module.css";

function Dice(props) {
  return (
    <div
      onClick={(e) => props.holdDice(e, props.id)}
      className={`${styles.Dice} ${
        props.isHeld ? styles.held : styles.notHeld
      }`}
    >
      <h2 className={styles.diceFace}>{props.value}</h2>
    </div>
  );
}

export default Dice;
