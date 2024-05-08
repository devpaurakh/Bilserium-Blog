import React, { useState } from "react";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faRandom, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DropDown({ onSortByRandom, onSortByRecent }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleHover = () => {
    setIsOpen(true);
  };

  const handleLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
        type="button"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <FontAwesomeIcon icon={faSort} className="mr-2" />
        Sort
      </button>

      {isOpen && (
        <div
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 rounded-sm">
            <li>
              <button
                className="block px-4 py-2 text-black hover:bg-black rounded-xl hover:text-white"
                onClick={onSortByRandom}
              >
                <FontAwesomeIcon icon={faRandom} className="mr-2" />
                Random
              </button>
            </li>
            <li>
              <button
                className="block px-4 py-2 text-black hover:bg-black rounded-xl hover:text-white"
                onClick={onSortByRecent}
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                Recent
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
