import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function CourseView() {
  const { state } = useLocation();
  const course = state?.course;

  if (!course) return <p>Course not found</p>; // fallback

  const userId = "68725d72247c1d34534c2251"; // use authcontext

  const handleComplete = async () => {
    try {
      // 1. Send POST to backend
      await axios.post("http://localhost:5000/progress/mark-completed", {
        userId,
        courseId: course._id,
      });

      // Optional: show toast or success message
      setTimeout(() => {
        console.log("Course marked as completed");
        toast.success("Course marked as completed");
      }, 1000);

    } catch (error) {
      console.error("Error marking course as completed", error);
      toast.error(`Error marking course as completed ${error}`);
    }
  };

  return (
    <><div><Toaster position="top-right"/></div>
      <div className="bg-violet-100/50 h-screen">
        <div className="w-xl pl-18 py-12 m-auto">
          <div class=" fixed w-full top-0 start-0 ">
            <header className="bg-gray-950 text-white">
              <div class="max-w-screen-xl flex flex-row  items-center justify-center mx-8 p-15">
                <a
                  href={`${course.id}`}
                  onClick={(e) => e.preventDefault()}
                  className="cursor-pointer"
                >
                  <span class="self-center text-base font-semibold whitespace-nowrap ">
                    Course View
                  </span>
                </a>
                <div
                  class="items-center text-center px-8 justify-center w-full md:flex "
                  id="navbar-sticky"
                >
                  <h2 className="text-2xl font-semibold ">{course.title}</h2>
                </div>
                <Link to={"/student/dashboard"}>
                  <span class="self-center text-base font-semibold whitespace-nowrap ">
                    All Courses
                  </span>
                </Link>
              </div>
            </header>
            <p className="m-auto p-10 w-xl font-normal text-left text-gray-700 ">
              {course.content}
            </p>

            <div id="all-courses" className="course-button text-center">
              <button
                onClick={handleComplete}
                className="w-sm bg-violet-500  hover:bg-violet-400 h-8 my-3 rounded text-white font-semibold uppercase"
              >
                Mark As Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseView;
