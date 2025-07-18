"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import "animate.css";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const loadScripts = async () => {
      const jQueryScript = document.createElement("script");
      jQueryScript.src = "/assets/js/jquery-2.2.1.min.js";

      jQueryScript.onload = () => {
        const blockrainScript = document.createElement("script");
        blockrainScript.src = "/assets/js/blockrain.jquery.min.js";

        if (status === "authenticated") {
          blockrainScript.onload = () => {
            (window as any).BlockrainThemes = {
              my: {
                background: "#ffff",
                backgroundGrid: null,
                primary: null,
                secondary: null,
                stroke: null,
                innerStroke: null,
                blocks: {
                  line: "#8dff8b",
                  square: "#ff6767",
                  arrow: "#61dfff",
                  rightHook: "#ff6767",
                  leftHook: "#c8c8c8",
                  rightZag: "#ffe858",
                  leftZag: "#F0C1E1"
                }
              }
            };

            (window as any).$("#background-content").blockrain({
              theme: "my",
              blockWidth: 15,
              speed: 12,
              autoplay: true,
              autoplayRestart: true
            });
          };
        }
        document.body.appendChild(blockrainScript);
      };
      document.body.appendChild(jQueryScript);
    };

    loadScripts();
  }, []);

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <div>
          <div className="container">
            <h1 className="font-size-90 animate__animated animate__backInDown">
              Hey {session.user?.name}
            </h1>
            <h2 className="opacity-60 ">Hope you'll enjoy your visit!</h2>
          </div>
        </div>
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
      return (
        <div className="container">
          <h2>Welcome To NueroZen</h2>
        </div>
      );
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/assets/css/style.css" type="text/css" />

      <div className="page-wrapper">
        <div className="content-wrapper">
          <div className="content-main animate">{showSession()}</div>
          <div className="background-wrapper">
            <div id="background-content"></div>
          </div>
        </div>
      </div>
    </>
  );
}
