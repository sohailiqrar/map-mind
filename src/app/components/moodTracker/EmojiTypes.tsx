"use client";

import React, { useState } from "react";
import styles from "../Panel.module.css";
import PanelPrompt from "./PanelPrompt";

const EmojiTypes = () => {
  const emojis = [
    ["https://fonts.gstatic.com/s/e/notoemoji/latest/1f601/512.gif", "😁"],
    ["https://fonts.gstatic.com/s/e/notoemoji/latest/1f614/512.gif", "😔"],
    ["https://fonts.gstatic.com/s/e/notoemoji/latest/1f60a/512.gif", "😌"],
    ["https://fonts.gstatic.com/s/e/notoemoji/latest/1f62a/512.gif", "😟"],
    ["https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.gif", "😠"]
  ];

  const [promptText, setPromptText] = useState("");

  const handleClick = (index: number) => {
    const promptText = `You clicked on ${emojis[index][1]}`;
    setPromptText(promptText);
  };

  return (
    <div className={styles.panel}>
      {emojis.map((emoji, index) => (
        <img
          key={index}
          className={styles.emoji}
          src={emoji[0]}
          alt={emoji[1]}
          onClick={() => handleClick(index)}
        />
      ))}
      {/* {promptText && } */}
    </div>
  );
};

export default EmojiTypes;
