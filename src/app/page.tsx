"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import "animate.css";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const jQueryScript = document.createElement("script");
    jQueryScript.src = "/assets/js/jquery-2.2.1.min.js";

    jQueryScript.onload = () => {
      const blockrainScript = document.createElement("script");
      blockrainScript.src = "/assets/js/blockrain.jquery.min.js";

      blockrainScript.onload = () => {
        (window as any).BlockrainThemes = {
          zen: {
            background: "#f0fdf4",
            backgroundGrid: null,
            primary: null,
            secondary: null,
            stroke: null,
            innerStroke: null,
            blocks: {
              line: "#5eead4",
              square: "#c4b5fd",
              arrow: "#7dd3fc",
              rightHook: "#fdba74",
              leftHook: "#86efac",
              rightZag: "#f9a8d4",
              leftZag: "#a5b4fc"
            }
          }
        };

        (window as any).$("#background-content").blockrain({
          theme: "zen",
          blockWidth: 18,
          speed: 10,
          autoplay: true,
          autoplayRestart: true
        });
      };

      document.body.appendChild(blockrainScript);
    };

    document.body.appendChild(jQueryScript);
  }, []);

  const features = [
    { icon: "🧠", label: "Psych Assessments" },
    { icon: "📓", label: "Personal Journal" },
    { icon: "📊", label: "Mood Tracker" }
  ];

  const actions = [
    {
      icon: "🧠",
      label: "Take a Test",
      href: "/components/layout/psyTests/mentalHealthTest",
      bg: "bg-white/80 hover:bg-teal-50 border-teal-200 hover:border-teal-300"
    },
    {
      icon: "📓",
      label: "Write in Journal",
      href: "/components/layout/journal/newPage",
      bg: "bg-white/80 hover:bg-violet-50 border-violet-200 hover:border-violet-300"
    },
    {
      icon: "📊",
      label: "Track Mood",
      href: "/components/layout/moodTracker",
      bg: "bg-white/80 hover:bg-sky-50 border-sky-200 hover:border-sky-300"
    }
  ];

  const showContent = () => {
    if (status === "authenticated") {
      return (
        <div className="animate__animated animate__fadeIn pointer-events-auto">
          <div
            className="rounded-3xl px-8 py-9 max-w-sm w-full mx-auto text-center"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(20,184,166,0.2)",
              boxShadow: "0 8px 32px rgba(20,184,166,0.12), 0 2px 8px rgba(0,0,0,0.06)"
            }}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-md shadow-teal-200">
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
              Welcome back
            </p>
            <div className="text-2xl font-bold text-slate-800 mb-1">
              {session.user?.name}
            </div>
            <p className="text-slate-500 text-sm mb-7">
              Your wellness space is ready for you.
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border ${action.bg} transition-all duration-200 shadow-sm`}>
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-xs font-medium text-slate-700 leading-tight text-center">
                    {action.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate__animated animate__fadeInUp pointer-events-auto">
        <div
          className="rounded-3xl px-8 py-10 max-w-md w-full mx-auto text-center"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(148,163,184,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(20,184,166,0.08)"
          }}>

          {/* Brand icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-xl shadow-teal-200/60">
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
                <path
                  d="M2 12 L8 12 L11 3 L15 21 L19 3 L23 21 L26 12 L36 12"
                  stroke="white"
                  strokeWidth="2.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Headline */}
          <div className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
            NueroZen
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Your mind deserves care.
            <br />
            Start your wellness journey today.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/components/layout/registration"
              className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-md shadow-teal-200 text-sm hover:shadow-lg hover:shadow-teal-200/60 hover:-translate-y-px">
              Get Started
            </Link>
            <Link
              href="/components/layout/login"
              className="border-2 border-teal-500 text-teal-700 hover:bg-teal-50 font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-sm hover:-translate-y-px">
              Sign In
            </Link>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {features.map((f) => (
              <span
                key={f.label}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(148,163,184,0.3)",
                  color: "#64748b"
                }}>
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <link rel="stylesheet" href="/assets/css/style.css" type="text/css" />
      <div className="page-wrapper">
        <div className="content-wrapper">
          <div className="content-main">{showContent()}</div>
          <div className="background-wrapper">
            {/* Tetris canvas */}
            <div id="background-content" />

            {/* Gradient orbs — sit on top of Tetris via DOM order, below content via z-index */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Top-right teal orb */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 650,
                  height: 650,
                  top: "-160px",
                  right: "-160px",
                  background:
                    "radial-gradient(circle, rgba(20,184,166,0.22) 0%, transparent 65%)"
                }}
              />
              {/* Bottom-left violet orb */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 550,
                  height: 550,
                  bottom: "-140px",
                  left: "-140px",
                  background:
                    "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)"
                }}
              />
              {/* Mid-left sky orb */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 420,
                  height: 420,
                  top: "40%",
                  left: "-100px",
                  background:
                    "radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 65%)"
                }}
              />
              {/* Bottom-right rose orb */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 380,
                  height: 380,
                  bottom: "-80px",
                  right: "5%",
                  background:
                    "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 65%)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
