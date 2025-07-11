import React, { useState } from "react";
import LoginImg from "../../assests/auth-img.jpg";
import { Link } from "react-router-dom";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)


  return (
    <div className="grid min-h-screen grid-cols-2 h-full w-full">
      <div className="login-wrapper flex flex-col justify-center px-7 bg-gray-950 py-5 text-white">
        <div className=" m-15">
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
              required
              placeholder="Email"
            />
            <div className="relative w-full">
              <input
                className="rounded placeholder:text-gray-500 w-full p-3 border-b"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
              />
              <span
                className="absolute right-7
    top-3 "
                onClick={() => setShowPassword(!showPassword)}

              >
                {showPassword ? <i className="fa-solid fa-eye "></i> : <i className="fa-solid fa-eye-slash "></i>}
              </span>
            </div>
            <div>
              <button
                className="w-full bg-violet-500 hover:bg-violet-400 h-8 my-3 rounded"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
          <div className="no-login flex gap-5">
            <h4 className="text-gray-400">Don't have an account?</h4>
            <button className="bg-gray-700 hover:bg-gray-500 font-semibold text-gray-300 h-8 w-19 rounded">
              <Link to={"/users"}>Sign up</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="portal w-full h-full flex right-column ">
        <div className="portal-heading">
          <img src={LoginImg} className=" w-full h-full " alt="portal-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
