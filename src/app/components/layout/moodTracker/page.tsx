"use client";

import React, { Suspense } from "react";
import { useState } from "react";
import EmojiPanel from "./EmojiPanel";
import EmojiChart from "./EmojiChart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import showAlert from "@/app/components/ui/alert";

export default function MoodTracker() {
  const { data: session, status } = useSession();
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  function handleChange() {
    setIsClicked(true);
  }

  if (status === "authenticated") {
    return (
      <>
        <EmojiPanel isClicked={isClicked} handleClick={handleChange} />
        <Suspense fallback={<p>Loading feed...</p>}>
          <EmojiChart />
        </Suspense>
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
}
