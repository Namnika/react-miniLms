import React, { useState } from "react";
import SignUpImg from "../../assests/auth-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post("http://localhost:5000/users", form, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      toast.success("You've entered successfully. Please log in.");

      setTimeout(() => {
        navigate("/login/users");
      }, 2000);
    } catch (error) {
      // Show server response message if available
      toast.error(
        `Signup failed: ${error?.response?.data?.message || error.message}`,
      );
      setErrorMessage(error.message);

      console.error("Signup error:", error);
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-right" />
      </div>
      <div className="grid min-h-screen grid-cols-1 sm:grid-cols-1 md:grid-cols-2 h-full w-full">
        <div className="signup-wrapper sm:order-2 order-2 md:order-1 flex flex-col justify-center px-7 bg-gray-950 py-5 text-white">
          <p className="text-center text-rose-500 text-sm tracking-wide">
            {errorMessage}
          </p>
          <form onSubmit={handleSubmit} className=" m-15">
            <div className="signup-heading py-3">
              <h2 className="font-bold text-5xl">Sign up</h2>
              <br />
              <h4 className="text-gray-400">Enter your account details</h4>
            </div>
            <div className="signup-inputs my-6 gap-3 flex flex-col">
              <input
                className="placeholder:text-gray-500 rounded p-3 border-b"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Name"
              />
              <input
                className="placeholder:text-gray-500 rounded p-3 border-b"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
              <div className="relative w-full">
                <input
                  className="rounded placeholder:text-gray-500 w-full p-3 border-b"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
                <span
                  className="absolute right-7
    top-3 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye "></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash "></i>
                  )}
                </span>
              </div>
              <div>
                <button
                  className="w-full bg-violet-500 hover:bg-violet-400 h-8 my-3 rounded"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <div className="no-signup flex gap-5">
            <h4 className="text-gray-400">Already have an account?</h4>
            <button className="bg-gray-700 hover:bg-gray-500 font-semibold text-gray-300 h-8 w-19 rounded">
              <Link to={"/users/params"}>Login</Link>
            </button>
          </div>
        </div>
        <div className="portal order-1 md:order-2order-1 md:order-2 w-full h-full flex right-column ">
          <div className="portal-heading">
            <img
              src={SignUpImg}
              className=" w-full h-full "
              alt="portal-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
