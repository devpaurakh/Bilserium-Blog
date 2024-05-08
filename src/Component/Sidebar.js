import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faBarChart } from "@fortawesome/free-regular-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Sidebar() {
  const toHome = useNavigate();
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  // Function to handle logout
  const handleLogout = () => {
    // Remove all data from cookies

    Swal.fire({
      title: "Are you sure?",
      text: "To logout from the application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
        toHome("/home");
      }
    }); // Show the confirmation dialog

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }; // Function to handle logout

  // Check if access token exists in cookies
  const isLoggedIn = document.cookie.includes("accessToken"); // Check if access token exists in cookies

  return (
    <div className="fixed flex left-0 flex-col h-80 bg-primaryColors text-black w-64 rounded-md mt-40">
      <div className="p-4">
        <ul>
          <li className="mb-2">
            <Link
              to="/home"
              className={`block py-2 px-4 rounded hover:bg-white hover:text-textColors transition duration-1000 ${
                activeLink === "/home" ? "bg-white text-textColors" : "" // Check if the active link is home
              }`}
              onClick={() => setActiveLink("/home")}
            >
              <FontAwesomeIcon className="mr-5" icon={faHome} />
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/popular"
              className={`block py-2 px-4 rounded hover:bg-white hover:text-textColors transition duration-1000 ${
                activeLink === "/popular" ? "bg-white text-textColors" : ""
              }`}
              onClick={
                () => setActiveLink("/popular") // Check if the active link is popular
              }
            >
              <FontAwesomeIcon className="mr-5" icon={faBarChart} />
              Popular
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 mt-auto">
        {isLoggedIn && (
          // Check if user is logged in
          <button
            className="bg-red-500 text-white py-2 px-4 rounded w-full"
            onClick={handleLogout}
          >
            <FontAwesomeIcon className="mr-5" icon={faSignOut} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
