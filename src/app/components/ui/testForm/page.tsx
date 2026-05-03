"use client";

import React, { useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import showAlert from "../alert";
import TestScore from "../testResult/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const answerOptions = [
  {
    value: "disagree",
    label: "Disagree",
    selectedClass: "border-rose-400 bg-rose-50 text-rose-700 shadow-sm shadow-rose-100"
  },
  {
    value: "neutral",
    label: "Neutral",
    selectedClass: "border-amber-400 bg-amber-50 text-amber-700 shadow-sm shadow-amber-100"
  },
  {
    value: "agree",
    label: "Agree",
    selectedClass: "border-teal-400 bg-teal-50 text-teal-700 shadow-sm shadow-teal-100"
  }
];

const tips = [
  "Answer based on how you've felt over the past 2 weeks, not just today.",
  "Go with your first instinct — don't overthink each statement.",
  "There are no right or wrong answers. Honesty gives the most useful result.",
  "This is private and just for you — be as candid as you can."
];

const Survey = ({ questions, title, short_desc, long_desc }: any) => {
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [infoOpen, setInfoOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const answered = answers.filter((a) => a !== null).length;
  const progress = (answered / questions.length) * 100;
  const estimatedMinutes = Math.ceil(questions.length * 0.5);

  const handleChange = (value: string, index: number) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);

    const nextUnanswered = updated.findIndex((a, i) => i > index && a === null);
    if (nextUnanswered !== -1) {
      setTimeout(() => {
        questionRefs.current[nextUnanswered]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    }
  };

  const handleSubmit = () => {
    const firstUnanswered = answers.findIndex((a) => a === null);
    if (firstUnanswered !== -1) {
      showAlert({
        title: "Incomplete",
        content: `Please answer question ${firstUnanswered + 1} before submitting.`,
        icon: "error",
        confirmButtonText: "Okay"
      });
      questionRefs.current[firstUnanswered]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    let temp = 0;
    for (const ans of answers) {
      if (ans === "agree") temp += 5;
      else if (ans === "disagree") temp += 1.5;
      else temp += 3;
    }
    setScore(Math.round(temp));
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f0fdf4]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce" />
          <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce [animation-delay:-.2s]" />
          <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce [animation-delay:-.4s]" />
        </div>
      </div>
    );
  }

  if (status !== "authenticated") {
    showAlert({
      title: "Please Login First!",
      content: "",
      icon: "info",
      confirmButtonText: "Okay!"
    });
    router.replace("/components/layout/login");
    return null;
  }

  if (score > 0) {
    return <TestScore name={title} score={score} />;
  }

  return (
    <div className="min-h-screen bg-[#f0fdf4] pb-20">
      {/* Sticky progress bar */}
      <div className="sticky top-14 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Progress</span>
            <span className="text-xs font-bold text-teal-600">{answered} / {questions.length} answered</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10">
        {/* Test header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-200/60 mb-5">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">{title}</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
            {short_desc} {long_desc}
          </p>
          <div className="mt-5 inline-flex items-center gap-5 text-xs text-slate-400 bg-white/70 rounded-full px-5 py-2 border border-slate-100 shadow-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
              Disagree
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Neutral
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
              Agree
            </span>
          </div>
        </div>

        {/* About this assessment — expandable */}
        <div className="mb-8">
          <button
            onClick={() => setInfoOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-teal-200 hover:shadow-teal-50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500 text-sm">ℹ</span>
              <span className="text-sm font-semibold text-slate-700">About this assessment</span>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${infoOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* CSS Grid height animation — no JS measurement needed */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: infoOpen ? "1fr" : "0fr",
              transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)"
            }}
          >
            <div className="overflow-hidden">
              <div className="bg-white border border-t-0 border-slate-100 rounded-b-2xl px-5 py-5 space-y-5">

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "📝", label: "Questions", value: `${questions.length} statements` },
                    { icon: "⏱", label: "Est. Time", value: `~${estimatedMinutes} minutes` },
                    { icon: "📊", label: "Scale", value: "3-point Likert" }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-lg mb-1">{stat.icon}</div>
                      <div className="text-xs font-bold text-slate-700">{stat.value}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* How it works */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">How scoring works</p>
                  <div className="flex gap-2">
                    {[
                      { label: "Agree", points: "5 pts", color: "bg-teal-50 border-teal-200 text-teal-700" },
                      { label: "Neutral", points: "3 pts", color: "bg-amber-50 border-amber-200 text-amber-700" },
                      { label: "Disagree", points: "1.5 pts", color: "bg-rose-50 border-rose-200 text-rose-700" }
                    ].map((s) => (
                      <div key={s.label} className={`flex-1 border rounded-xl px-3 py-2 text-center ${s.color}`}>
                        <div className="text-xs font-bold">{s.label}</div>
                        <div className="text-xs opacity-75">{s.points}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Your total score falls between 30–100. Higher scores indicate stronger agreement with the statements in this assessment.
                  </p>
                </div>

                {/* Tips */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2.5">Tips for accurate results</p>
                  <ul className="space-y-2">
                    {tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-[10px] mt-0.5">
                          {i + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <span className="text-amber-500 text-sm mt-0.5 flex-shrink-0">⚠</span>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    This is a self-assessment tool, not a clinical diagnosis. Results are intended to support self-awareness and should not replace professional mental health evaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {questions.map((question: string, index: number) => {
            const isAnswered = answers[index] !== null;
            return (
              <div
                key={index}
                ref={(el) => { questionRefs.current[index] = el; }}
                className={`rounded-2xl border-2 p-5 transition-all duration-300 ${
                  isAnswered
                    ? "bg-white border-teal-100 shadow-sm"
                    : "bg-white border-slate-100 shadow-sm hover:border-slate-200"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                      isAnswered
                        ? "bg-teal-500 text-white scale-110"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isAnswered ? "✓" : index + 1}
                  </span>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium pt-0.5">{question}</p>
                </div>

                <div className="flex gap-2 pl-10">
                  {answerOptions.map((opt) => {
                    const isSelected = answers[index] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleChange(opt.value, index)}
                        className={`flex-1 py-2.5 px-2 rounded-xl border-2 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                          isSelected
                            ? opt.selectedClass
                            : "border-slate-200 text-slate-500 bg-slate-50 hover:bg-white hover:border-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <div className="mt-10 text-center">
          <button
            onClick={handleSubmit}
            disabled={answered < questions.length}
            className={`px-10 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              answered === questions.length
                ? "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200 hover:shadow-lg hover:shadow-teal-200 hover:-translate-y-0.5 active:scale-95"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {answered === questions.length
              ? "Submit & See Results"
              : `${questions.length - answered} question${questions.length - answered !== 1 ? "s" : ""} remaining`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
