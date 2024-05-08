import React, { useState } from "react";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faRandom, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DropDown({ onSortByRandom, onSortByRecent }) {
  const [isOpen, setIsOpen] = useState(false); // this will set the initial state of isOpen to false

  const handleHover = () => {
    setIsOpen(true);
  }; //this function will set the state of isOpen to true when the mouse enters the button

  const handleLeave = () => {
    setIsOpen(false); 
  };  //this function will set the state of isOpen to false when the mouse leaves the button

  return (
    <div >
      <button
        className="text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
        type="button"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave} // this will trigger the handleLeave function when the mouse leaves the button
      >
        <FontAwesomeIcon icon={faSort} className="mr-2" /> 
        {/* // this will display the sort icon */}
        Sort
      </button>

      {isOpen && (
        <div
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow"  
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
                {/* // this will display the random icon */}
                Random
              </button>  
              {/* // this will display the random button */}
            </li>
            <li>
              <button
                className="block px-4 py-2 text-black hover:bg-black rounded-xl hover:text-white"
                onClick={onSortByRecent} 
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />  
                {/* // this will display the calendar icon */}
                Recent
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  ); 
}
