"use client";
import React from "react";
import PanelPrompt from "./PanelPrompt";
import styles from "./Panel.module.css";
import EmojiTypes from "./EmojiTypes";

const EmojiPanel = ({ isClicked, handleClick }: any) => {
  return (
    <div className={styles.container}>
      <PanelPrompt
        key={"prompt"}
        prompt={
          isClicked
            ? "Thank You for Sharing! See you tomorrow"
            : "How are you feeling today?"
        }
      />
      <EmojiTypes isClicked={isClicked} handleClick={handleClick} />
    </div>
  );
};

export default EmojiPanel;
