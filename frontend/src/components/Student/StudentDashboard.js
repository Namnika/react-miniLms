import React, { useState, useEffect } from "react";
import CourseImg from "../../assests/course-image.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
	const { logout } = useAuth()
	const navigate = useNavigate()
	const [view, setView] = useState("all"); // "all" or "completed"
	const [allCourses, setAllCourses] = useState([])

	const userId = "68725d72247c1d34534c2251"; // or get from context/auth

	const [courseProgress, setCourseProgress] = useState({}); // key = courseId

	const fetchCourses = async () => {
		try {
			const res = await axios.get('http://localhost:5000/courses');
			const courses = res.data.courses;
			setAllCourses(courses);

			// Fetch progress for each course
			courses.forEach(async (course) => {
				try {
					const res = await axios.get(`http://localhost:5000/progress/${userId}/${course._id}`);
					const status = res.data?.progress?.status;

					setCourseProgress(prev => ({
						...prev,
						[course._id]: status === "Completed" ? 100 : 50,
					}));
				} catch (error) {
					if (error.response?.status === 404) {
						// No progress yet — assume 50%
						setCourseProgress(prev => ({
							...prev,
							[course._id]: 50
						}));
					} else {
						console.error("Error fetching progress for course:", course._id, error);
					}
				}
			});
		} catch (error) {
			console.error('Error fetching courses or progress:', error);
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	const filteredCourses = allCourses.filter(course => {
		const progressValue = courseProgress[course._id] || 50;
		if (view === "Completed") {
			return progressValue === 100;
		}
		if (view === "Pending") {
			return progressValue !== 100;
		}
		return true; // "all"
	});

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
			<div className="bg-violet-100/50">
				<div className="w-3xl pl-20 py-12 mx-auto">
					<div className="flex justify-around">
						<h2 className="grow-1 text-2xl font-bold text-violet-500">
							{" "}
							Student Dashboard{" "}
						</h2>

						<button onClick={handleLogout} className="cursor-pointer">
							<h3 className="text-base text-rose-600 font-medium ">Logout</h3>
						</button></div>

					<aside
						id="sidebar-multi-level-sidebar"
						className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
						aria-label="Sidebar"
					>
						<div className="h-full px-3 py-4 overflow-y-auto  bg-gray-950 ">
							<ul className="space-y-2 text-white  text-base font-medium">
								<li>
									<button onClick={() => setView("all")}>
										<a
											href="#all-courses"
											className="flex items-center p-2  rounded-lg hover:text-violet-300 group"
										>
											<svg
												className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 "
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
									</button>
								</li>
								<li>
									<button onClick={() => setView("Completed")}>
										<a
											href="#completed-course"
											className="flex items-center p-2  rounded-lg  hover:text-violet-300"
										>
											<svg
												className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 "
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 18 18"
											>
												<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
											</svg>
											<span className="flex-1 ms-3 whitespace-nowrap">
												Completed Course
											</span>
										</a>
									</button>
								</li>
								<li>
									<button onClick={() => setView("Pending")}>
										<a
											href="#pending-course"
											className="flex items-center p-2  rounded-lg  hover:text-violet-300"
										>
											<svg
												className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 "
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 18 18"
											>
												<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
											</svg>
											<span className="flex-1 ms-3 whitespace-nowrap">
												Pending Course
											</span>
										</a>
									</button>
								</li>
							</ul>
						</div>
					</aside>

					<div>
						<h2 className="text-xl font-bold my-5"> Your All Courses</h2>
						<div className="grid grid-cols-2 grid-flow-row-dense gap-5">
							{filteredCourses.map((course) => {
								return (
									<div
										key={course._id}
										className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm "
									>
										<div className="relative">
											<span
												className={`inline-flex absolute z-10 top-2 right-2 items-center ${courseProgress[course._id] === 100
													? "bg-green-100"
													: "bg-yellow-100"
													} ${courseProgress[course._id] === 100
														? "text-green-800"
														: "text-yellow-800"
													} text-xs font-medium px-2.5 py-0.5 rounded-full`}
											>
												<span
													className={`w-2 h-2 me-1 ${courseProgress[course._id] === 100
														? "bg-green-500"
														: "bg-yellow-500"
														} rounded-full`}
												></span>
												{courseProgress[course._id] === 100 ? "Completed" : "Pending"}
											</span>
											<a href="#img">
												<img className="rounded-t-lg" src={CourseImg} alt="" />
											</a>
										</div>
										<div className="p-5">
											<a href="#all-courses">
												<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
													{course.title}
												</h5>
											</a>
											<p className="mb-3 font-normal text-gray-700 ">
												{course.content}
											</p>

											<button className=" bg-gray-200 rounded-full "
												style={{ width: "100%" }}>
												<div
													className="bg-violet-600 text-xs font-medium text-violet-100 text-center p-0.5 leading-none rounded-full"
													style={{ width: `${courseProgress[course._id] || 50}%` }}
												>
													{" "}
													{courseProgress[course._id] || 50}%
												</div>
											</button>

											<button className="  border border-violet-500  hover:bg-violet-100 h-8 my-3 rounded text-violet-500 font-semibold">
												<Link
													to={`/student/courses/${course._id}`}
													state={{ course }}
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
												</Link>
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default StudentDashboard;
