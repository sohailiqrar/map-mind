"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import styles from "./Panel.module.css";
import { chartData } from "./data";

const EmojiChart = () => {
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      setBackgroundColor(prefersDarkMode ? "#D2E0FB" : "#fff");
    }
  }, []);

  const data = chartData.length >= 7 ? chartData.slice(-7) : chartData;
  data.unshift(["Date", "Mood"]);

  const options = {
    title: "Mood Tracking Chart",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: backgroundColor,
    theme: "material-dark",
    vAxis: {
      ticks: [
        { v: 1000, f: `Angry 😡` },
        { v: 2000, f: `Tired 😪` },
        { v: 3000, f: `Relaxed 😊` },
        { v: 4000, f: `Sad 😔` },
        { v: 5000, f: `Happy 😁` },
        { v: 0, f: `No Response ` }
      ]
    }
  } as Partial<google.visualization.LineChartOptions>;

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
