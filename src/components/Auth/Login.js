import React from "react";
import LoginImg from "../../assests/login-portal-img.jpg";

const Login = () => {
  return (
    <div className="grid min-h-screen grid-cols-2 h-full w-full content-center items-center">
      <div className="login-wrapper bg-gray-950 py-5 text-white">
        <div className=" ml-15">
          <div className="login-heading">
            <h2 className="font-bold text-5xl">Login</h2>
            <h4 className="text-gray-400">Enter your account details</h4>
          </div>
          <div className="login-inputs my-6 gap-3 flex flex-col">
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
              <button className="w-full bg-violet-500 h-8 rounded" type="submit">Login</button>
            </div>
          </div>
          <div className="no-login flex gap-5">
            <h4 className="text-gray-400">Don't have an account?</h4>
            <button className="bg-gray-700 font-semibold text-gray-300 h-8 w-19 rounded">Sign up</button>
          </div>
        </div>
      </div>
      <div className="portal w-full h-full bg-white right-column bg-white">
        <div className="portal-heading">
          <img src={LoginImg} className=" w-full object-cover " />
        </div>
      </div>
    </div>
  );
};

export default Login;
