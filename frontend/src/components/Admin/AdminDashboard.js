import React, { useState, useEffect } from "react";
import CourseImg from "../../assests/course-image.jpg";
import CreateCourse from "./CreateCourse";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {useAuth} from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate()
  const {logout} = useAuth()

  const [courseForm, setCourseForm] = useState({
    title: '',
  })

  const [value, setValue] = useState('')

  const [loading, setLoading] = useState(false); // for showing loading state

  const [allCourses, setAllCourses] = useState([])

  const handleChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  // Utility function to strip HTML
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        title: courseForm.title,
        content: stripHtml(value) // optional: plain version
      }

      const res = await axios.post("http://localhost:5000/courses/create", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      setCourseForm({ title: "" })
      setValue("")

      setTimeout(() => {
        console.log("Course Created successfully", res.data);
        setAllCourses(prev => [...prev, res.data.course])
        toast.success("Course Created successfully")
        setLoading(false)
      }, 2000)

    } catch (error) {
      console.error('Error creating course:', error);
      toast.error(`Error creating course: ${error?.response?.data?.message || error.message}`)
    }
  }

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courses');
      setAllCourses(res.data.courses); // assuming backend sends { courses: [...] }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/logout", { withCredentials: true });

      logout(); // Clear local context and localStorage

      toast.success("Logged out successfully");
      navigate("/login/users");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };


  return (
    <><div><Toaster /></div>
      <div className="bg-violet-100/50 ">
        <div className="w-3xl pl-20 py-12 m-auto">
          <div className="flex justify-around">
            <h2 className="grow-1 text-2xl font-bold text-violet-500">
              {" "}
              Admin Dashboard{" "}
            </h2>

            <button onClick={handleLogout} className="cursor-pointer">
              <h3 className="text-base text-rose-600 font-medium ">Logout</h3>
            </button>
          </div>

          <aside
            id="sidebar-multi-level-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto  bg-gray-950 ">
              <ul className="space-y-2 text-white  text-base font-medium">
                <li>
                  <a
                    href="#course-edit"
                    className="flex items-center p-2 text-white rounded-lg hover:text-violet-300  group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">Create Course</span>
                  </a>
                </li>

                <li>
                  <a
                    href="#all-courses"
                    className="flex items-center p-2  rounded-lg dark:text-white hover:text-violet-300  group"
                  >
                    <svg
                      className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 "
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
              </ul>
            </div>
          </aside>

          <CreateCourse onChange={handleChange} loading={loading} handleCourseSubmit={handleSubmit} title={courseForm.title} value={value} setValue={setValue} />

          {/* View all courses */}
          <div>
            <h2 className="text-xl font-bold my-5"> View All Courses</h2>
            <div className="grid grid-cols-2 grid-flow-row-dense gap-5">
              {allCourses.map((course) => {


                return (<div key={course._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
                  <a href="#something">
                    <img className="rounded-t-lg" src={CourseImg} alt="" />
                  </a>
                  <div className="p-5">
                    <a href="#something">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {course.title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {course.content}
                    </p>
                    <button className="  border border-violet-500  hover:bg-violet-100 h-8 my-3 rounded text-violet-500 font-semibold">
                      <a
                        href="#something"
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </button>
                  </div>
                </div>)
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
