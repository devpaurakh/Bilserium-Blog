import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ChanagePassword() {
    const toDetailPage = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
        const accessToken = Cookies.get("accessToken"); // Get access token from cookies
        const apiUrl = `http://localhost:5142/api/forgotpassword?email=${email}&password=${password}`;
        
        // Include access token in the headers object
        const response = await axios.patch(apiUrl, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        toDetailPage("/profile")
    
        console.log("Password reset successful:", response.data);
        // Handle success, e.g., show a success message to the user
      } catch (error) {
        console.error("Error resetting password:", error);
        // Handle error, e.g., show an error message to the user
      }
    }
  return (
    <>
      <Header />
      <Sidebar />
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-black bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
