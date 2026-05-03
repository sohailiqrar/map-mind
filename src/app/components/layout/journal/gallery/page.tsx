"use client";

import styles from "./page.module.css";
import React from "react";
import pages from "../data";
import SweetAlert from "@/app/components/ui/SweetAlert";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import showAlert from "@/app/components/ui/alert";

const Gallery = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return (
      <div>
        <div className={`${styles.container}`}>
          <div className="box">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pages.map((item) => (
                <SweetAlert title={item[0]} content={item[1]}>
                  <div className={`${styles.image_container}`}>
                    <img
                      className={`${styles.image} h-auto max-w-xs rounded-lg`}
                      src="https://img.freepik.com/premium-vector/graphical-representation-document-paper_1319560-445.jpg"
                      alt=""
                    />
                    <div className={`${styles.overlay_text} overlay-text`}>
                      {item[0]}
                    </div>
                  </div>
                </SweetAlert>
              ))}
            </div>
          </div>
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

export default Gallery;
