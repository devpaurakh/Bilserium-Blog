import React from "react";
import {
  faHandPointDown,
  faHandPointUp,
  faHeart,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { BASE_URL } from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Post({ blogPosts }) {
  var userId;
  // Function to calculate time duration from now
  const getTimeAgo = (createdTime) => {
    const currentTime = new Date();
    const diff = currentTime - new Date(createdTime);
    const seconds = Math.floor(diff / 1000); // Calculate the seconds
    const minutes = Math.floor(seconds / 60); // Calculate the minutes
    const hours = Math.floor(minutes / 60); // Calculate the hours
    const days = Math.floor(hours / 24); // Calculate the days

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }; // Function to calculate time duration from now

  function getTimeAgoAdjusted(originalTime) {
    const adjustedTime = new Date(originalTime);
    adjustedTime.setHours(adjustedTime.getHours() + 5); // Add 5 hours
    adjustedTime.setMinutes(adjustedTime.getMinutes() + 45); // Add 45 minutes
    return getTimeAgo(adjustedTime);
  }

  const handleVote = async (voteType, blogId) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const token = accessToken;
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;

      // Concurrently send POST and GET requests
      const [postResponse, getResponse] = await Promise.all([
       

        axios.post(`http://localhost:5142/api/react/blog/vote`, {
          voteType: voteType,
          blogId: blogId,
          userId: userId,
        }),

        axios.get(`${BASE_URL}/api/blog/vote?blogId=${blogId}`),
      ]);

      // Handle responses
      console.log(getResponse.data.message); // Log the message
      const voteCount = getResponse.data.message.split(" ")[3]; // Extract the vote count from the message
      console.log(voteCount); // Log the vote count
      console.log(postResponse); // Log the POST response
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div>
      {blogPosts.map((blog) => (
        <div
          key={blog.blogId}
          className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-4 mb-10 cursor-pointer"
        >
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-gray-300 h-8 w-8">
              {/* Check if userDTO exists before accessing username */}
              {blog.userDTO && blog.userDTO.username && (
                <img
                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
                    blog.userDTO.username
                  )}&rounded=true`}
                  alt=""
                  className=" w-12"
                />
              )}
            </div>
            <div className="ml-2 mt-1 flex items-center">
              <p className="font-bold  text-gray-800">
                @{blog.userDTO?.username || "Unknown User"}
              </p>
              <p className="font-bold ml-2  text-gray-800">.</p>
              <p className="text-sm/[3px] ml-2 text-gray-400 ">
                {getTimeAgoAdjusted(blog.createdTime)}
              </p>
              <button className="bg-gray-200 ml-3 hover:bg-textColors hover:text-white transition duration-700 text-gray-800 py-1 px-4 rounded-full">
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
          <p className="text-lg font-semibold mb-2">{blog.title}</p>
          <p className="text-gray-700 text-justify mb-4">{blog.content}</p>
          {/* Conditionally render the image */}
          {blog.imageUrl && (
            <div className="overflow-hidden mb-4">
              <img
                src={`${BASE_URL}${blog.imageUrl}`}
                alt=""
                className="w-full rounded-md"
              />
            </div>
          )}
          <div className="flex items-center">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2"
              onClick={() => handleVote(true, blog.blogId)}
            >
              <FontAwesomeIcon icon={faHandPointUp} />
            </button>
            <p className="py-1 px-1 rounded-full mr-2">20</p>{" "}
            {/* Display upvote count */}
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2"
              onClick={() => handleVote(false, blog.blogId)}
            >
              <FontAwesomeIcon icon={faHandPointDown} />
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2">
              <FontAwesomeIcon icon={faMessage} />
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full">
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  //this compmnent will render the blog post with the user details and the post details
}

Post.propTypes = {
  blogPosts: PropTypes.array.isRequired, // Prop validation for blogPosts
};
