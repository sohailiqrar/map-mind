import React from "react";
import styles from "./EmojiPanel.module.css";
import { Playfair } from "next/font/google";

const playfair = Playfair({
  weight: "400",
  subsets: ["latin"]
});

const PanelPrompt = ({ prompt }: { prompt: React.ReactNode }) => {
  return (
    <h2
      className={`${styles.prompt} ${playfair.className}`}
      style={{ fontSize: "2rem" }}>
      {prompt}
    </h2>
  );
};

export default PanelPrompt;
