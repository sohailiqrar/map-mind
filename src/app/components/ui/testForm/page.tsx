"use client";

import React from "react";
import showAlert from "../alert";
import TestScore from "../testResult/page";
import { useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Survey = ({ questions, title, short_desc, long_desc }: any) => {
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const { status } = useSession();
  const router = useRouter();

  const handleSubmit = () => {
    let temp = 0;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === null) {
        showAlert({
          title: "Error",
          content: `Question ${i + 1} is not attempted!`,
          icon: "error",
          confirmButtonText: "Okay"
        });
        return;
      }

      if (answers[i] === "agree") temp += 5;
      else if (answers[i] === "disagree") temp += 1.5;
      else temp += 3;
    }

    setScore(Math.round(temp));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    window.scrollBy({
      top: 135,
      behavior: "smooth"
    });

    const updatedAnswers = [...answers];
    updatedAnswers[index] = event.target.value;
    setAnswers(updatedAnswers);
  };

  if (status === "authenticated") {
    return (
      <>
        {!score ? (
          <div>
            <div className="flex flex-col items-start lg:items-center mx-0 p-12 lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {short_desc}
                <br />
                {long_desc}
              </p>
            </div>
            <div className={styles.box}>
              <div className={styles.container}>
                <div className={` ${styles.survey_container} `}>
                  <div className={styles.survey_header}>
                    <span>DISAGREE</span>
                    <span style={{ margin: "0 100px" }}>NEUTRAL</span>
                    <span> AGREE</span>
                  </div>

                  {questions.map((question: string, index: number) => (
                    <div key={index} className={styles.question_container}>
                      <div className={styles.question}>
                        <p>
                          {index + 1}. {question}
                        </p>
                      </div>

                      <div className={styles.rating_group}>
                        <input
                          type="radio"
                          className={styles.input}
                          id={`disagree-${index}`}
                          name={`rating-${index}`}
                          value="disagree"
                          checked={answers[index] === "disagree"}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <label
                          className={styles.label}
                          htmlFor={`disagree-${index}`}>
                          <p> Disagree</p>
                        </label>

                        <input
                          type="radio"
                          className={styles.input}
                          id={`neutral-${index}`}
                          name={`rating-${index}`}
                          value="neutral"
                          checked={answers[index] === "neutral"}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <label
                          className={styles.label}
                          htmlFor={`neutral-${index}`}>
                          <div></div>
                          <span className="label-text"></span>
                        </label>

                        <input
                          type="radio"
                          className={styles.input}
                          id={`agree-${index}`}
                          name={`rating-${index}`}
                          value="agree"
                          checked={answers[index] === "agree"}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <label
                          className={styles.label}
                          htmlFor={`agree-${index}`}>
                          <p> Agree</p>
                        </label>
                      </div>
                    </div>
                  ))}
                  <button
                    className={styles.submit_button}
                    onClick={handleSubmit}>
                    Score
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <TestScore name={title} score={score} />
        )}
      </>
    );
  } else if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  } else {
    showAlert({
      title: "Please Login First!",
      content: ``,
      icon: "info",
      confirmButtonText: "Okay!"
    });

    router.replace("/login");
    return;
  }
};

export default Survey;
