import React from "react";
import styles1 from "../moodTracker/Panel.module.css";

const Blogs = (props: any) => {
  return (
    <div
      style={{ margin: "3% 5% 10% 5%" }}
      className={`${styles1.container} mx-auto pl-12 pb-12 pr-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3`}>
      <article className="flex max-w-xxl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="text-gray-500">
            {props.date}
          </time>
          <a
            href="#"
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {props.type}
          </a>
          <button className="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
                fill-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              {props.title}
            </a>
          </h3>
          <p className="mt-5 text-sm leading-16 text-gray-600">
            {props.paragraph}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            src={props.profilePic}
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                {props.profileName}
              </a>
            </p>
            <p className="text-gray-600">{props.profilePosition}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Blogs;
