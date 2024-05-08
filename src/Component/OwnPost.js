import {
  faHandPointDown,
  faHandPointUp,
  faHeart,
  faMessage,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import noFound from "../Assets/Images/nodata.png";
export default function OwnPost() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading initially to true

  var userId;

  try {
    const accessToken = Cookies.get("accessToken");
    const token = accessToken;
    const decodedToken = jwtDecode(token); // Decode the token
    userId = decodedToken.id;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
  } // Get the user ID from the token

  // Function to calculate time duration from now
  const getTimeAgo = (createdTime) => {
    const currentTime = new Date();
    const diff = currentTime - new Date(createdTime);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
     

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`; // Return the days
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`; // Return the hours
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`; // Return the minutes
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`; // Return the seconds
    }
  }; // Function to calculate time duration from now

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const apiUrl = `${BASE_URL}/api/user/blog/${userId}`; // API URL
        const response = await axios.get(apiUrl);
        const blogData = response.data.blogComment; // Get the blog data
        setBlogPosts(blogData);
      } catch (error) {
        console.error("Error fetching blog data:", error); // Log the error
      }
    };

    fetchBlogData();
  }, []); // Fetch data when the component mounts

  //on the button click, delete the post
  const handleDelete = (blogId) => {
    axios
      .delete(`${BASE_URL}/api/delete/blog/${blogId}?blogId=${blogId}`)
      .then((response) => {
        console.log("Post deleted successfully:", response.data); // Log the response
        Swal.fire({
          title: "Are you sure?",
          text: "To delete this post!",
          icon: "warning", // Icon warning
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your post has been deleted.", "success"); // Show success message
            window.location.reload(); // Reload the page
          }
        }); // Show the confirmation dialog
      }) // Delete the post
      .catch((error) => {
        console.error("Error deleting blog:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }; // Handle the delete post

  return (
    <div>
      {blogPosts.length > 0 ? (
        blogPosts.map((blog) => (
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

                <button
                  onClick={() => handleDelete(blog.blogId)}
                  className="bg-gray-200 ml-3 hover:bg-textColors hover:text-white transition duration-700 text-gray-800 py-1 px-4 rounded-full"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
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
        ))
      ) : (
        <div className="flex items-center justify-center">
        <img src={noFound} className="mx-auto" alt="" />
      </div>
      
      )}
    </div>
  );
}
