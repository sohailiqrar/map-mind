"use client";

import React, { useState } from "react";
import styles from "./Panel.module.css";
import { chartData, emojisData } from "./data";
import showAlert from "@/app/components/alert";

const EmojiTypes = ({ isClicked, handleClick }: any) => {
  function addData(emojiNum: string | number) {
    const event = new Date();

    let date = event.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });

    let lastEntry = chartData[chartData.length - 1][0];

    if (date === lastEntry) {
      showAlert({
        title: "You've already logged in for today!",
        content: ``,
        icon: "info",
        confirmButtonText: "Okay!"
      });
      return;
    }

    chartData.push([date, emojiNum]);

    handleClick(true);
  }

  return (
    <div className={styles.panel}>
      {emojisData.map(
        (emoji, index) =>
          !isClicked && (
            <img
              key={index}
              className={styles.emoji}
              src={emoji[0]}
              alt={emoji[1]}
              onClick={() => addData(emoji[3])}
            />
          )
      )}
    </div>
  );
};

export default EmojiTypes;
