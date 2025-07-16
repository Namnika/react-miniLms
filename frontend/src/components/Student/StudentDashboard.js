import React, { useState, useEffect } from "react";
import CourseImg from "../../assests/course-image.jpg";
import { Link } from "react-router-dom";

function StudentDashboard() {
  const [progress, setProgress] = useState(50);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsCompleted(true);
    } else {
      setProgress(() => progress + 50);
      setIsCompleted(false);
    }
  }, [progress]);

  return (
    <div className="bg-violet-100/50 ">
      <div className="w-xl pl-18 py-12 m-auto">
        <h2 className="text-2xl font-bold text-violet-500">
          {" "}
          Student Dashboard{" "}
        </h2>

        <aside
          id="sidebar-multi-level-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto  bg-gray-950 ">
            <ul className="space-y-2 text-white  text-base font-medium">
              <li>
                <a
                  href="#all-courses"
                  className="flex items-center p-2  rounded-lg dark:text-white hover:text-violet-300 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    View All Courses
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#download-certificate"
                  className="flex items-center p-2  rounded-lg dark:text-white hover:text-violet-300 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Download Certificate
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div>
          <h2 className="text-xl font-bold my-5"> Your All Courses</h2>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg" src={CourseImg} alt="" />
            </a>
            <div className="p-5">
              <a href="#all-courses">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>

              <div>
                <div
                  class=" bg-gray-200 rounded-full dark:bg-gray-700"
                  style={{ width: "100%" }}
                >
                  {isCompleted && (
                    <button
                      disabled={!isCompleted}
                      onClick={() => alert("Progress completed!")}
                    >
                      <div
                        class="bg-violet-600 text-xs font-medium text-violet-100 text-center p-0.5 leading-none rounded-full"
                        style={{ width: `${progress}px` }}
                      >
                        {" "}
                        {progress}%
                      </div>
                    </button>
                  )}
                </div>
              </div>

              <button className="  border border-violet-500  hover:bg-violet-100 h-8 my-3 rounded text-violet-500 font-semibold">
                <Link to={"/student/courses/course-view"}>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm text-center font-medium "
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
