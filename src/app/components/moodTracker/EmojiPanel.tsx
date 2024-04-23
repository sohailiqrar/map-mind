"use client";
import React from "react";
import PanelPrompt from "./PanelPrompt";
import styles from "./EmojiPanel.module.css";
import EmojiTypes from "./EmojiTypes";

const EmojiPanel = () => {
  return (
    <div className={styles.container}>
      <PanelPrompt prompt="How are you feeling today?" />
      <EmojiTypes />
    </div>
  );
};

export default EmojiPanel;
