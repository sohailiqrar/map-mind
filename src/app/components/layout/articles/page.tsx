import React from "react";
import Blogs from "@/components/ui/Blogs";
import data from "./data";

const Articles = () => {
  return (
    <div>
      <div className="box">
        <div className="bg-white py-12 sm:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto pl-16 max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Mental Health Insights
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Learn how to improve your mental health with our expert advice.
              </p>
            </div>
            <div>
              {data.map((user, index) => (
                <Blogs
                  key={index}
                  date={user[0]}
                  type={user[1]}
                  title={user[2]}
                  paragraph={user[3]}
                  profilePic={user[4]}
                  profileName={user[5]}
                  profilePosition={user[6]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
