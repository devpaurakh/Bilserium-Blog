import React from "react";
import {
  faHandPointDown,
  faHandPointUp,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { BASE_URL } from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function AdminPost({ blogPosts }) {
  const toDetailPage = useNavigate();
  // const [blogUpVote, setBlogVote] = useState(null);
  var userId;

  if (!Array.isArray(blogPosts)) {
    console.error("blogPosts is not an array");
    return null;
  }
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
    adjustedTime.setSeconds(adjustedTime.getSeconds() + 4); // Add 4 seconds
    return getTimeAgo(adjustedTime);
  }

  const handleVote = async (voteType, blogId) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const token = accessToken;
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;

      // Concurrently send POST and GET requests
      const postResponse = await axios.post(
        `${BASE_URL}/api/react/blog/vote/`,
        {
          VoteType: voteType,
          BlogId: blogId,
          UserId: userId,
        }
      );

      const totalUpVotes = postResponse.data.totalUpVotes;
      console.log("Total upvotes:", totalUpVotes);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const detailPage = async (blogId) => {
    try {
      const url = `${BASE_URL}/api/blog/${blogId}`;
      const response = await axios.get(url); // Fetch blog details
      toDetailPage("/adminPostDetail", {
        state: { blogDetails: response.data },
      }); // Navigate to the detail page
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  }; // Function to navigate to the detail page

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
            <p className="py-1 px-1 rounded-full mr-2">7</p>
            {/* Display upvote count */}
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2"
              onClick={() => handleVote(false, blog.blogId)}
            >
              <FontAwesomeIcon icon={faHandPointDown} />
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2"
              onClick={() => detailPage(blog.blogId)}
            >
              <FontAwesomeIcon icon={faMessage} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
AdminPost.propTypes = {
  blogPosts: PropTypes.array.isRequired, // Prop validation for a single blog post
};
