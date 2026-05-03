"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const interpretations = [
  {
    max: 39,
    label: "Low",
    ringColor: "#14b8a6",
    badgeClass: "bg-teal-50 text-teal-700 border-teal-200",
    dotClass: "bg-teal-400",
    description:
      "Your responses suggest minimal concern in this area. You appear to be in a healthy psychological space right now.",
    nextSteps: [
      "Keep up your current wellness routines — they're clearly working.",
      "Regular journaling can help you stay aware of subtle shifts in mood.",
      "Consider scheduling a monthly self-check-in using this assessment."
    ]
  },
  {
    max: 54,
    label: "Moderately Low",
    ringColor: "#22c55e",
    badgeClass: "bg-green-50 text-green-700 border-green-200",
    dotClass: "bg-green-400",
    description:
      "There are a few areas worth paying attention to. Small, consistent habits can make a meaningful difference over time.",
    nextSteps: [
      "Try introducing 10 minutes of mindfulness or deep breathing daily.",
      "Talk openly with a trusted friend or family member about how you feel.",
      "Maintain healthy sleep, exercise, and nutrition routines."
    ]
  },
  {
    max: 74,
    label: "Adaptive",
    ringColor: "#f59e0b",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    dotClass: "bg-amber-400",
    description:
      "You're navigating challenges reasonably well, but there are areas that could benefit from more attention and support.",
    nextSteps: [
      "Explore structured stress-management techniques such as CBT journaling.",
      "Consider speaking with a counsellor — even once can provide clarity.",
      "Use the Mood Tracker to spot patterns in how you're feeling week to week."
    ]
  },
  {
    max: 89,
    label: "Moderately High",
    ringColor: "#f97316",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
    dotClass: "bg-orange-400",
    description:
      "Your responses indicate significant areas of concern. It's important to take these feelings seriously and seek support.",
    nextSteps: [
      "Reach out to a licensed mental health professional for an evaluation.",
      "Connect with a trusted person in your life today — don't carry this alone.",
      "If you feel overwhelmed, contact a helpline below right now."
    ]
  },
  {
    max: 100,
    label: "High",
    ringColor: "#f43f5e",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    dotClass: "bg-rose-400",
    description:
      "Your responses indicate a high level of distress. Please know that help is available and things can improve with the right support.",
    nextSteps: [
      "Please reach out to a mental health professional as soon as possible.",
      "If you're in crisis, call a helpline immediately — you don't have to face this alone.",
      "Share how you're feeling with someone you trust today."
    ]
  }
];

const ranges = [
  { range: "30–39", label: "Low", dotClass: "bg-teal-400", min: 30, max: 39 },
  { range: "40–54", label: "Moderately Low", dotClass: "bg-green-400", min: 40, max: 54 },
  { range: "55–74", label: "Adaptive", dotClass: "bg-amber-400", min: 55, max: 74 },
  { range: "75–89", label: "Moderately High", dotClass: "bg-orange-400", min: 75, max: 89 },
  { range: "90–100", label: "High", dotClass: "bg-rose-400", min: 90, max: 100 }
];

const helplines = [
  {
    name: "iCall — TISS Mumbai",
    number: "9152987821",
    display: "+91 9152987821",
    note: "Mon–Sat, 8 am–10 pm",
    flag: "🇮🇳"
  },
  {
    name: "Vandrevala Foundation",
    number: "18602662345",
    display: "1860-2662-345",
    note: "Free · 24/7 · All India",
    flag: "🇮🇳"
  },
  {
    name: "NIMHANS Helpline",
    number: "08046110007",
    display: "080-4611-0007",
    note: "Govt. of India · Free",
    flag: "🇮🇳"
  },
  {
    name: "Crisis Text Line",
    number: null,
    display: "Text HOME to 741741",
    note: "International · 24/7",
    flag: "🌐"
  }
];

const TestScore = ({ name, score }: { name: string; score: number }) => {
  const [animatedOffset, setAnimatedOffset] = useState(0);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [hoveredRange, setHoveredRange] = useState<number | null>(null);

  const interp = interpretations.find((i) => score <= i.max) ?? interpretations[interpretations.length - 1];
  const percentage = Math.min(Math.max(score, 0), 100);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    setAnimatedOffset(circumference);
    const raf = requestAnimationFrame(() => {
      setTimeout(() => setAnimatedOffset(targetOffset), 50);
    });
    return () => cancelAnimationFrame(raf);
  }, [circumference, targetOffset]);

  const isHighConcern = score >= 75;

  return (
    <div className="min-h-screen bg-[#f0fdf4] px-4 py-14">
      <div className="max-w-md mx-auto space-y-4">

        {/* Main result card */}
        <div
          className="rounded-3xl p-8 text-center"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(20,184,166,0.15)",
            boxShadow: "0 8px 32px rgba(20,184,166,0.1), 0 2px 8px rgba(0,0,0,0.06)"
          }}
        >
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">Results</p>
          <h1 className="text-xl font-bold text-slate-800 mb-6">{name}</h1>

          {/* Circular progress ring */}
          <div className="flex justify-center mb-5">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r={radius}
                  fill="none"
                  stroke={interp.ringColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={animatedOffset}
                  style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-800 leading-none">{score}</span>
                <span className="text-xs text-slate-400 font-medium mt-1">out of 100</span>
              </div>
            </div>
          </div>

          {/* Badge + description */}
          <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold border mb-3 ${interp.badgeClass}`}>
            {interp.label}
          </span>
          <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
            {interp.description}
          </p>

          {/* Score ranges — hover for label tooltip */}
          <div className="space-y-1.5 mb-6 text-left">
            {ranges.map(({ range, label, dotClass, min, max }, i) => {
              const active = score >= min && score <= max;
              const hovered = hoveredRange === i;
              return (
                <div
                  key={range}
                  onMouseEnter={() => setHoveredRange(i)}
                  onMouseLeave={() => setHoveredRange(null)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 cursor-default transition-all duration-200 ${
                    active ? "bg-slate-50" : hovered ? "bg-slate-50/60" : ""
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotClass} transition-all duration-300 ${
                      active ? "scale-125" : hovered ? "scale-110 opacity-70" : "opacity-35"
                    }`}
                  />
                  <span className={`text-xs flex-1 transition-colors duration-200 ${active ? "font-semibold text-slate-800" : hovered ? "text-slate-600" : "text-slate-400"}`}>
                    {range}
                  </span>
                  <span className={`text-xs transition-colors duration-200 ${active ? "font-semibold text-slate-800" : hovered ? "text-slate-500" : "text-slate-400"}`}>
                    {label}
                  </span>
                  {active && (
                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: interp.ringColor }}>
                      You
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 border-2 border-teal-200 text-teal-700 hover:bg-teal-50 font-semibold py-2.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-px active:scale-95"
            >
              Retake
            </button>
            <Link
              href="/components/layout/journal/newPage"
              className="flex-1 bg-white border-2 border-violet-200 text-violet-700 hover:bg-violet-50 font-semibold py-2.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-px active:scale-95 flex items-center justify-center"
            >
              Journal it
            </Link>
            <Link
              href="/"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all duration-200 shadow-sm shadow-teal-200 hover:-translate-y-px active:scale-95 flex items-center justify-center"
            >
              Home
            </Link>
          </div>
        </div>

        {/* What to do next card */}
        <div className="rounded-3xl bg-white/80 border border-slate-100 shadow-sm px-6 py-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">What to do next</p>
          <ul className="space-y-2.5">
            {interp.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                  style={{ background: interp.ringColor }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Helplines card */}
        <div className="rounded-3xl bg-white/80 border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setResourcesOpen((o) => !o)}
            className={`w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors duration-200 ${isHighConcern ? "border-b border-rose-100" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">💙</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-700">Support &amp; Helplines</p>
                <p className="text-xs text-slate-400">Free, confidential mental health resources</p>
              </div>
              {isHighConcern && (
                <span className="ml-1 text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              )}
            </div>
            <svg
              className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${resourcesOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* CSS Grid expand */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: resourcesOpen || isHighConcern ? "1fr" : "0fr",
              transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)"
            }}
          >
            <div className="overflow-hidden">
              <div className="px-5 py-4 space-y-2">
                {helplines.map((h) => (
                  <div key={h.name} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-teal-50 hover:border-teal-100 transition-colors duration-200 px-4 py-3 group">
                    <span className="text-base flex-shrink-0">{h.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 truncate">{h.name}</p>
                      <p className="text-[11px] text-slate-400">{h.note}</p>
                    </div>
                    {h.number ? (
                      <a
                        href={`tel:${h.number}`}
                        className="flex-shrink-0 text-xs font-bold text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg transition-colors duration-150"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {h.display}
                      </a>
                    ) : (
                      <span className="flex-shrink-0 text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-lg">
                        {h.display}
                      </span>
                    )}
                  </div>
                ))}

                <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mt-1">
                  <span className="text-amber-500 text-sm flex-shrink-0 mt-0.5">⚠</span>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    This assessment is a self-screening tool only and does not constitute a clinical diagnosis. Always consult a qualified mental health professional for a formal evaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestScore;
