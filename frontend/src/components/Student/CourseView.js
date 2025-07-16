import React from "react";
import { Link } from "react-router-dom";

function CourseView() {
  return (
    <div className="bg-violet-100/50 h-screen">
      <div className="w-xl pl-18 py-12 m-auto">
        <div class=" fixed w-full top-0 start-0 border-b border-gray-200">
          <header className="bg-gray-950 text-white">
            <div class="max-w-screen-xl flex flex-row  items-center justify-center mx-8 p-15">
              <a href="#">
                <span class="self-center text-base font-semibold whitespace-nowrap dark:text-white">
                  Course View
                </span>
              </a>
              <div
                class="items-center text-center px-8 justify-center w-full md:flex "
                id="navbar-sticky"
              >
                <h2 className="text-2xl font-semibold ">
                  Noteworthy technology acquisitions 2021
                </h2>
              </div>
              <a href="#"><Link to={"/student/dashboard"}>
                <span class="self-center text-base font-semibold whitespace-nowrap dark:text-white">
                  All Courses
                </span></Link>
              </a>
            </div>
          </header>
          <p className="m-auto py-10 w-xl font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>

          <div id="all-courses" className="course-button text-center">
            <button className="w-sm bg-violet-500  hover:bg-violet-400 h-8 my-3 rounded text-white font-semibold uppercase">
              Mark As Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseView;
