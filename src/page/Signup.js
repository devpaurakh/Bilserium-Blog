import React, { useState } from "react";
import logo from "/Users/ace/Documents/Code/bisleriumblog/src/Assets/Images/logo.png";
import illustration from "/Users/ace/Documents/Code/bisleriumblog/src/Assets/Images/illustration.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex h-screen">
      {/* <!-- Left Pane --> */}
      <div class="hidden lg:flex items-center justify-center flex-1 bg-primaryColors text-black">
        <div class="max-w-md text-center">
          <img
            src={illustration}
            alt={"logo"}
            className="h-1000 w-20000 rounded-lg"
          />
          <br />
          <h1 className=" font-bold">Welcome to the Bilserium</h1>
        </div>
      </div>
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-primaryColor lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <center>
            <img src={logo} alt={"logo"} className=" w-50 h-40" />{" "}
          </center>
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Sign up
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Belserium for all time access and free
          </h1>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-2 lg:mb-0"></div>
            <div className="w-full lg:w-1/2 ml-0 lg:ml-2"></div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center"></div>
          <form action="#" method="POST" className="space-y-4">
            {/* <!-- Your form elements go here --> */}
            <div>
              <label
                for="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Create Your Username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                for="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter Your Email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                for="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Create Your Password"
                  name="password"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Create an Account
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account? {/* I have Set Route for Login */}
              <a href="./Login.js" className="text-black hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
