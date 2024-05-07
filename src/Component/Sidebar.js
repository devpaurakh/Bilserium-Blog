import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faBarChart } from "@fortawesome/free-regular-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  // Function to handle logout
  const handleLogout = () => {
    // Remove all data from cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    
  };

  // Check if access token exists in cookies
  const isLoggedIn = document.cookie.includes("accessToken");

  return (
    <div className="fixed flex left-0 flex-col h-80 bg-primaryColors text-black w-64 rounded-md mt-40">
      <div className="p-4">
        <ul>
          <li className="mb-2">
            <Link
              to="/home"
              className={`block py-2 px-4 rounded hover:bg-white hover:text-textColors transition duration-1000 ${activeLink === '/home' ? 'bg-white text-textColors' : ''}`}
              onClick={() => setActiveLink('/home')}
            >
              <FontAwesomeIcon className="mr-5" icon={faHome} />
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/popular"
              className={`block py-2 px-4 rounded hover:bg-white hover:text-textColors transition duration-1000 ${activeLink === '/popular' ? 'bg-white text-textColors' : ''}`}
              onClick={() => setActiveLink('/popular')}
            >
              <FontAwesomeIcon className="mr-5" icon={faBarChart} />
              Popular
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/all"
              className={`block py-2 px-4 rounded hover:bg-white hover:text-textColors transition duration-1000 ${activeLink === '/all' ? 'bg-white text-textColors' : ''}`}
              onClick={() => setActiveLink('/all')}
            >
              <FontAwesomeIcon className="mr-5" icon={faGlobe} />
              All
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 mt-auto">
        {isLoggedIn && (
          <button className="bg-red-500 text-white py-2 px-4 rounded w-full" onClick={handleLogout}>
            <FontAwesomeIcon className="mr-5" icon={faSignOut} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
