import { faStackExchange } from "@fortawesome/free-brands-svg-icons/faStackExchange";
import { faBarChart } from "@fortawesome/free-regular-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Sidebar() {
  return (
    <div className=" fixed flex left-0 flex-col h-80 bg-primaryColors text-black w-64 rounded-md  mt-40 ">
      <div className="p-4">
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="block py-2 px-4 rounded hover:bg-white hover:text-textColors  transition duration-1000 "
            >
              <FontAwesomeIcon className="mr-5" icon={faHome} />
              Home
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="block py-2 px-4  rounded hover:bg-white hover:text-textColors transition duration-1000"
            >
              <FontAwesomeIcon className="mr-5" icon={faBarChart} />
              Popular
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="block py-2 px-4  bg- rounded hover:bg-white transition hover:text-textColors duration-1000"
            >
              <FontAwesomeIcon className="mr-5" icon={faGlobe} />
              All
            </a>
          </li>
        </ul>
      </div>
      <div className="p-4 mt-auto">
        <button className="bg-red-500 text-white py-2 px-4 rounded w-full">
          <FontAwesomeIcon className="mr-5" icon={faSignOut} />
          Logout
        </button>
      </div>
    </div>
  );
}
