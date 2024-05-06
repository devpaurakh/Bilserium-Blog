import React from "react";

import LogoWhite from "/Users/ace/Documents/Code/bisleriumblog/src/Assets/Images/logo.png";


export default function Header() {
  return (
    
    <header className="bg-primaryColors   fixed top-0 mx-auto flex w-full items-center justify-between border-b p-2 ">
      <img src={LogoWhite} alt="logo" className="w-23 h-24" />

      <div className="w-2/5">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
        />
      </div>

      {/* Create+ button */}
      <div className="flex items-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ">
          Create +
        </button>

        <button className="px-4 ml-10 py-2 bg-transprant text-black rounded-md hover:bg-blue-600 hover:text-white ">
          <a href="">SignUp/Login</a>
        </button>
        {/* <img
          src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Paurakh+Saud&rounded=true"
          alt=""
          className="ml-10 w-12"
        /> */}
        {/* Add margin to the left */}
      </div>
    </header>
  );
}
