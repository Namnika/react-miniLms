import React, { useState } from "react";
import LoginImg from "../../assests/auth-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const [form, setForm] = useState({ email: "", password: "", isAdminLogin });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // for showing loading state
  const {login} = useAuth()


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:5000/login/users",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user } = response.data;

      // // 2. Store token and user in localStorage
      localStorage.setItem("token", token);
      login(user)

      if (user.role === "admin") {
        toast.success(`Hi ${user.name}, Welcome to platform!`);
      } else if (user.role === "owner") {
        toast.success(`Hi ${user.name}!`);
      }
      else {
        toast.success(`Hi ${user.name}, Welcome to your courses!`);
      }


      // 4. Redirect based on role
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "owner") {
          navigate('/admin/dashboard')
        } else {
          navigate("/student/dashboard");
        }
      }, 2000);
    } catch (error) {
      toast.error(
        `Signup failed: ${error?.response?.data?.message || error.message}`,
      );
      setErrorMessage(error.message);
      console.error("Login error:", error);
    }
  };

  return (
    <><div><Toaster /></div>
      <div className="grid min-h-screen grid-cols-1 sm:grid-cols-1 md:grid-cols-2  h-full w-full">
        <div className="login-wrapper sm:order-2 order-2 md:order-1 flex flex-col justify-center px-7 bg-gray-950 py-5 text-white">
          <p className="text-center text-rose-500 text-sm tracking-wide">
            {errorMessage}
          </p>
          <form onSubmit={handleLogin} className=" m-15">
            <div className="login-heading py-3">
              <h2 className="font-bold text-5xl">Login</h2>
              <br />
              <h4 className="text-gray-400">Enter your account details</h4>
            </div>
            <div className="login-inputs my-6 gap-3 flex flex-col">
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
              <div className="flex flex-row justify-left gap-3"><input type="checkbox" name="admin" id="admin" checked={isAdminLogin} onClick={(e) => setIsAdminLogin(e.target.checked)} /> Login as admin? </div>
              <div>
                <button
                  className="w-full bg-violet-500 hover:bg-violet-400 h-8 my-3 rounded"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <BeatLoader size={9} color="#ddd6ff" /> : "Login"}
                </button>
              </div>
            </div>
            <div className="no-login flex gap-5">
              <h4 className="text-gray-400">Don't have an account?</h4>
              <button className="bg-gray-700 hover:bg-gray-500 font-semibold text-gray-300 h-8 w-19 rounded">
                <Link to={"/users"}>Sign up</Link>
              </button>
            </div>
          </form>
        </div>
        <div className="portal order-1 md:order-2 w-full h-full flex right-column ">
          <div className="portal-heading">
            <img
              src={LoginImg}
              className=" w-full h-full "
              alt="portal-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
