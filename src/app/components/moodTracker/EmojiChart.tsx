"use client";

import React from "react";
import { Chart } from "react-google-charts";
import styles from "./EmojiPanel.module.css";
import { title } from "process";

var prefersDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

var backgroundColor = prefersDarkMode ? "#D2E0FB" : "#fff"; // Choose background color based on system preference

export const data = [
  ["Day", "Mood"],
  ["Wed", 4000],
  ["Thurs", 2000],
  ["Fri", 5000],
  ["Sat", 1000],
  ["Mon", 1000],
  ["Sun", 0],
  ["Tues", 3000]
];

export const options = {
  title: "Mood Tracking",
  curveType: "function",
  // chartArea: { backgroundColor: "lightblue" },
  // chartArea: { width: "70%" },
  legend: { position: "bottom" },
  backgroundColor: backgroundColor,
  theme: "material-dark", // Or 'classic', 'material', 'material-dark', 'maximized'
  vAxis: {
    // title: "Moods",
    ticks: [
      { v: 1000, f: `Angry 😡` }, // Emoji 1 corresponds to 1000
      { v: 2000, f: `Tired 😪` }, // Emoji 2 corresponds to 2000
      { v: 3000, f: `Relaxed 😊` }, // Emoji 3 corresponds to 3000
      { v: 4000, f: `Sad 😔` }, // Emoji 4 corresponds to 4000
      { v: 5000, f: `Happy 😁` }, // Emoji 5 corresponds to 5000
      { v: 0, f: `No Response ` } // Emoji 5 corresponds to 5000
    ]
  }
  // colors: ["#3366CC"]
};

const EmojiChart = () => {
  return (
    <div className={styles.container}>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        key={null}
      />
    </div>
  );
};

export default EmojiChart;
