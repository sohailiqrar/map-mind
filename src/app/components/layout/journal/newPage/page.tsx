"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import showAlert from "@/components/ui/alert";

const Journal = () => {
  const [text, setText] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  function handleNewClick() {
    if (text != "") {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          handleSaveClick();
          setText("");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
          setText("");
        }
      });
    }
  }

  async function handleSaveClick() {
    if (!text.trim()) {
      Swal.fire("Please write something first!", "", "info");
      return;
    }

    let event = new Date();
    let todayDate = event.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    try {
      const response = await fetch("api/saveJournal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          journalPage: {
            date: todayDate,
            content: text
          }
        })
      });

      const data = await response.json();

      // console.log(data);

      if (response.ok) {
        Swal.fire("Saved!", "", "success");
        setText("");
      } else {
        Swal.fire("Failed", "", "error");
      }
    } catch (error) {
      // console.log(error);
      Swal.fire("An error occurred while saving the journal", "", "error");
    }
  }

  if (status === "authenticated") {
    return (
      <div>
        <div
          className={`${styles.logo} border-2 border-indigo-500 relative group`}>
          <Link href="../">
            <span className="sr-only ">Your Company</span>
            <p>NueroZen</p>
          </Link>

          <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ul>
              <div className={`${styles.link}`} onClick={handleNewClick}>
                <li className="px-4 py-2 hover:bg-gray-100">New</li>
              </div>
              <div className={`${styles.link}`} onClick={handleSaveClick}>
                <li className="px-4 py-2 hover:bg-gray-100">Save</li>
              </div>
              <Link className={`${styles.link}`} href={"./gallery"}>
                <li className="px-4 py-2 hover:bg-gray-100">Gallery</li>
              </Link>
            </ul>
          </div>
        </div>

        <div className={`${styles.container}`}>
          <p className={`${styles.text}`}>
            How have you been, {session.user?.name}?
          </p>
          <br />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`${styles.text} ${styles.scroll} w-full h-auto min-h-[150px] max-h-[400px] p-2 border border-gray-300 rounded-md resize-y`}
            id="text-area"
            rows={11}
            cols={62}
            autoFocus></textarea>
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

export default Journal;
