import React from "react";
import styles1 from "./Panel.module.css";
import styles2 from "../articles/page.module.css";

const Blogs = (props: any) => {
  return (
    <div
      className={`${styles1.container} ${styles2.container} mx-auto pl-12 pb-12 pr-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3`}>
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
