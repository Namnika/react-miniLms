import React, {useState} from 'react'
import SignUpImg from "../../assests/auth-img.jpg"
import { Link } from 'react-router-dom';

const Signup = () => {
  
    const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="grid min-h-screen grid-cols-2 h-full w-full">
      <div className="signup-wrapper flex flex-col justify-center px-7 bg-gray-950 py-5 text-white">
        <div className=" m-15">
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
              required
              placeholder="Name"
            />
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
                Sign Up
              </button>
            </div>
          </div>
          <div className="no-signup flex gap-5">
            <h4 className="text-gray-400">Already have an account?</h4>
            <button className="bg-gray-700 hover:bg-gray-500 font-semibold text-gray-300 h-8 w-19 rounded">
              <Link to={"/users/params"}>Login</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="portal w-full h-full flex right-column ">
        <div className="portal-heading">
          <img src={SignUpImg} className=" w-full h-full " alt="portal-image" />
        </div>
      </div>
    </div>
  );
}

export default Signup