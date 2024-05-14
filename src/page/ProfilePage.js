import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import OwnPost from "../Component/OwnPost";
import { BASE_URL } from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const toDetailPage = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading initially to true
  var userId;
  var userName;
  var randomImageUrl;

  try {
    const accessToken = Cookies.get("accessToken");
    const token = accessToken;
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
    userName = decodedToken.username;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
  }
  const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
    userName
  )}&rounded=true`;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = `${BASE_URL}/api/user/profile/${userId}`;
        const response = await axios.get(apiUrl);
        setUserData(response.data);
        setLoading(false); // Set loading to false after data is fetched

        const unsplashResponse = await axios.get(
          "https://api.unsplash.com/photos/random?query=background&orientation=landscape&client_id=OQlb-NP6IlF6cGRy9cVkeoA59oC2sEly9lNn8d1sDR8"
        );

        randomImageUrl = unsplashResponse.data.urls.regular;
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        console.error("Error fetching random image:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchUserData();
  }, [userId]);


  function passwordChange() {

    toDetailPage("/chanagePassword")
    
  }

  return (
    <>
      {loading ? ( // Display loader while loading
        <div className="flex items-center justify-center h-screen">
          <ClimbingBoxLoader
            color={"#7AB2B2"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="bg-backgroundColor">
          <Header />
          <Sidebar />
          <br />
          <br />
          <br />
          <br />
          <br />
          {userData && (
            <div
              id="profile-background"
              className="bg-cover bg-center shadow-md rounded-lg overflow-hidden bg-white"
              style={{
                backgroundImage:
                  `url('https://source.unsplash.com/random')` || "Loading...",
              }}
            >
              <div className="p-8 ">
                <div className="flex justify-center  ">
                  <img
                    className="h-32 w-32 rounded-full object-cover shadow-md border-4 border-backgroundColors"
                    src={avatarUrl}
                    alt="Profile"
                  />
                </div>
                <div className="text-center mt-4 rounded-xl bg-black p-10 bg-opacity-50">
                  <h2 className="text-3xl font-semibold text-white">
                    Username: @{userData?.userDetails?.username || "Unknown"}
                  </h2>
                  <p className="text-white">
                    Role: {userData?.userDetails?.role || "Unknown"}
                  </p>
                  <p className="text-white">
                    Email: {userData?.userDetails?.email || "Unknown"}
                  </p>

                  <button onClick={passwordChange} className="text-indigo-500 hover:text-indigo-700">
                    Edit
                  </button>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center"></div>
                </div>
              </div>
            </div>
          )}

          <br />
          <OwnPost />
        </div>
      )}
    </>
  );
}
