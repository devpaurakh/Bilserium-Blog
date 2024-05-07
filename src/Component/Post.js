import {
  faHandPointDown,
  faHandPointUp,
  faHeart,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import axios from "axios";


export default function Post() {
  const [blogPosts, setBlogPosts] = useState([]);
  
  // Function to calculate time duration from now
  const getTimeAgo = (createdTime) => {
    const currentTime = new Date();
    const diff = currentTime - new Date(createdTime);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const apiUrl = `${BASE_URL}api/all/blog?pageNumber=1&pageSize=10`;
        const response = await axios.get(apiUrl);
        const blogData = response.data.blogComment;
        setBlogPosts(blogData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  return (
    <div>
      {blogPosts.map((blog) => (
        <div
          key={blog.blogId}
          className="max-w-3xl mx-auto bg-cardColor shadow-md rounded-md p-4 mb-10 cursor-pointer"
        >
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-gray-300 h-8 w-8">
              <img
                src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
                  blog.userDTO.username
                )}&rounded=true`}
                alt=""
                className=" w-12"
              />
            </div>
            <div className="ml-2 mt-1 flex items-center">
              <p className="font-bold  text-gray-800">
                @{blog.userDTO.username}
              </p>
              <p className="font-bold ml-2  text-gray-800">.</p>
              <p className="text-sm/[3px] ml-2 text-gray-400 ">
                {getTimeAgo(blog.createdTime)}
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
                src={`${BASE_URL}/${blog.imageUrl}`}
                alt=""
                className="w-full rounded-md"
              />
            </div>
          )}
          <div className="flex items-center">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2">
              <FontAwesomeIcon icon={faHandPointUp} />
            </button>
            <p className="py-1 px-1 rounded-full mr-2">1</p>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2">
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
}
