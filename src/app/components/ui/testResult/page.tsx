import styles from "./page.module.css";

const TestScore = ({ name, score }: any) => {
  return (
    <div className={`${styles.container} `}>
      <h1 className={styles.heading}>Your Test Results Are Here!</h1>
      <div className={`lg:w-1/2 ${styles.scoreCard} `}>
        <h2 className={styles.subHeading}>{name} Score</h2>
        <div className={styles.scoreDisplay}>
          <div className={styles.scoreValue}>{score}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={score}
            readOnly
            className={styles.slider}
          />
        </div>
        <div className={styles.legend}>
          <div
            className={`${styles.range} ${
              score >= 0 && score <= 39 ? styles.moderateLow : ""
            }`}>
            <span>20-39</span> — Low
          </div>
          <div
            className={`${styles.range} ${
              score >= 40 && score <= 54 ? styles.moderateLow : ""
            }`}>
            <span>40-54</span> — Moderately low
          </div>
          <div
            className={`${styles.range} ${
              score >= 55 && score <= 74 ? styles.moderateLow : ""
            }`}>
            <span>55-74</span> — Adaptive
          </div>
          <div
            className={`${styles.range} ${
              score >= 75 && score <= 89 ? styles.moderateLow : ""
            }`}>
            <span>75-89</span> — Moderately high
          </div>
          <div
            className={`${styles.range} ${
              score >= 90 && score <= 100 ? styles.moderateLow : ""
            }`}>
            <span>90-100</span> — High
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestScore;
