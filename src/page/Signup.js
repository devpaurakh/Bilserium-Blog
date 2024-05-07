import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Users/ace/Documents/Code/bisleriumblog/src/Assets/Images/logo.png";
import illustration from "/Users/ace/Documents/Code/bisleriumblog/src/Assets/Images/illustration.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../constants";



export default function SignUp() {
  const toLogin = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error message when the user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate username
    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate password
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Your signup logic here
      try {
        const apiUrl = `${BASE_URL}api/authenticate/register`;
        const response = await axios.post(apiUrl, formData);
        console.log("Response:", response.data);

        // Check if status is true or false
        if (response.data.status) {
          
          toast.success(response.data.message, {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
         
          setTimeout(() => {
            toLogin('/login')
          }, 4000); 
          
        } else {
          console.error("Error:", response.data.message);

          toast.error(response.data.message, {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        if (error.response) {
          // If there's a response object attached to the error
          console.error("Error Response:", error.response.data);
        } else {
          // If there's no response object attached to the error
          console.error("Error:", error.message);
        }
      }

      // console.log("Signup form submitted:", formData);
    }
  };
  return (
    <div className="flex h-screen">
      {/* <!-- Left Pane --> */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-primaryColors text-black">
        <div className="max-w-md text-center">
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

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Your Username"
                className={`mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className={`mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create Your Password"
                  className={`mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none
            focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account? {/* I have Set Route for Login */}
              <a href="/login" className="text-black hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
