import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import Post from "../Component/Post";
import { BASE_URL } from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  const accessToken = Cookies.get("accessToken");

  const token = accessToken;

  const decodedToken = jwtDecode(token);

  const userId = decodedToken.id;

  const userName = decodedToken.username;
  const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(userName)}&rounded=true`;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = `${BASE_URL}api/user/profile?userId=${userId}`;
        const response = await axios.get(apiUrl);
        setUserData(response.data);
        console.log("userinfo: ", response.data.userDetails);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <>
      <Header />
      <Sidebar />
      <br />
      <br />
      <br />
      <br />
      <br />
      {userData && ( // Check if userData is available
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center">
              <img
                className="h-32 w-32 rounded-full object-cover"
                src={avatarUrl}
                alt="Profile"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                {userData.userDetails.username}
              </h2>
              <p className="text-gray-500">{userData.userDetails.role}</p>
              <p>{userData.userDetails.email}</p> 
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <button className="text-indigo-500 hover:text-indigo-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <br />
      <Post />
    </>
  );
}
