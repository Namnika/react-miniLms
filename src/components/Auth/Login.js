import React from "react";
import LoginImg from "../../assests/login-pic.jpg"

const Login = () => {
  return (
    <div className="grid min-h-screen grid-cols-2 h-full w-full content-center items-center">
      <div className="login-wrapper flex flex-col gap-4 justify-left bg-gray-950 items-left py-5  text-white">
        <div className="login-heading">
          <h2 className="font-bold text-5xl">Login</h2>
          <h4 className="text-gray-400">Enter your account details</h4>
        </div>
        <div className="login-inputs my-5">
          <input
            className="placeholder:text-gray-500"
            type="email"
            name="email"
            required
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
          />
          <div>
            <button type="submit">Login</button>
          </div>
        </div>
        <div className="no-login">
          <h4 className="text-gray-400">Don't have an account?</h4>
          <button>Sign up</button>
        </div>
      </div>
      <div className="portal w-full h-full bg-white right-column bg-white flex items-center justify-center">
        <div className="portal-heading">
          <h1>
            <span>Welcome to</span> student portal
          </h1>
          <h4 className="text-gray-400">Login to access your account</h4>
          <img src={LoginImg} className=" w-full object-cover "/>
        </div>
      </div>
    </div>
  );
};

export default Login;
