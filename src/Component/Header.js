import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import LogoWhite from "/Users/ace/Documents/Code/bisleriumblog/src/Assets/Images/logo.png";

export default function Header() {
  // Check if access token is present in cookies
  const accessToken = document.cookie.includes("accessToken");

  // const getAccessToken = Cookies.get("accessToken");
  // const token = getAccessToken;
  // const decodedToken = jwtDecode(token);
  // const userName = decodedToken.username;
  // const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent( userName )}&rounded=true`;
  const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent( "hero" )}&rounded=true`;

  return (
    <header className="bg-primaryColors   fixed top-0 mx-auto flex w-full items-center justify-between border-b p-2 ">
      <a href="/home">
        <img src={LogoWhite} alt="logo" className="w-23 h-24" />
      </a>

      <div className="w-2/5">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
        />
      </div>

      {/* Conditional rendering based on access token */}
      {accessToken ? (
        <div className="flex items-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ">
            <a href="/create"> Create +</a>
          </button>
          <a href="/profile"><button className="px-4 ml-10 py-2 bg-transprant text-black rounded-md ">
            <img src={avatarUrl} alt="" className="ml-10 w-12" />
          </button></a>
        </div>
      ) : (
        <div className="flex items-center">
          <a href="/login">
            <button className="px-4 ml-10 py-2 bg-transprant text-black rounded-md hover:bg-blue-600 hover:text-white ">
              SignUp/Login
            </button>
          </a>
        </div>
      )}
    </header>
  );
}
