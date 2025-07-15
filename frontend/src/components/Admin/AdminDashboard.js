import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {Link} from "react-router-dom"

const AdminDashboard = () => {
  const [value, setValue] = useState("");

  return (
    <div className="bg-violet-100/50 h-screen">
      <div className="w-xl pl-18 py-12 m-auto">
        <h2 className="text-2xl font-bold text-violet-500">
          {" "}
          Admin Dashboard{" "}
        </h2>

        <aside
          id="sidebar-multi-level-sidebar"
          class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div class="h-full px-3 py-4 overflow-y-auto  bg-gray-950 ">
            <ul class="space-y-2 text-white  text-base font-medium">
              <li>
                <a
                  href="#course-edit"
                  class="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-violet-300 dark:hover:bg-gray-700 group"
                >
                  <svg
                    class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span class="ms-3">Create Course</span>
                </a>
              </li>

              <li>
                <a
                  href="#all-courses"
                  class="flex items-center p-2  rounded-lg dark:text-white hover:text-violet-300 dark:hover:bg-gray-700 group"
                >
                  <svg
                    class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">
                    View All Courses
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div id="course-edit" className="my-8">
          <div className="flex mb-7 flex-row ">
            <label
              for="small-input"
              class=" mb-2 w-xs  text-gray-900 dark:text-white"
            >
              <strong>Course Name:</strong>
            </label>
            <input
              type="text"
              id="small-input"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* react quill editor */}
          <div>
            <ReactQuill
              className="bg-gray-50"
              theme="snow"
              value={value}
              onChange={setValue}
            />
            {/* Optional: Display the raw HTML output */}
            <div style={{ marginTop: "20px" }}>
              <strong>Course Content:</strong>
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          </div>
        </div>
        <div id="all-courses">
        <button className="w-full bg-violet-500 hover:bg-violet-400 h-8 my-3 rounded text-white font-semibold uppercase">Create Course</button>
        </div>
      </div>

      {/* View all courses */}


    </div>
  );
};

export default AdminDashboard;
