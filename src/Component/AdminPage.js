import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faHandPointUp,
  faMessage,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import noFound from "../Assets/Images/nodata.png";
import Swal from "sweetalert2";

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
};

const handleDelete = (blogId) => {
  axios
    .delete(`${BASE_URL}/api/delete/${blogId}`) //this the delete API with the blogId
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
      }) // Show the confirmation dialog
        .then((result) => {
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
      }); // Log the error
    });
};

export default function AdminPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [timeBlogPosts, setTimeBlogPosts] = useState([0]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading initially to true
  const [error, setError] = useState(null);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const api = `${BASE_URL}/api/activity/status?year=${selectedYear}&month=${selectedMonth}&pageNumber=1&pageSize=100000`; // API URL
      const responsePostBlog = await axios.get(api);
      console.log("aa", responsePostBlog.data.blogs);
      setTimeBlogPosts(responsePostBlog.data.blogs);
    } catch (error) {}

    // You can perform further actions here, such as fetching data based on the selected year and month
  };
  

  // Generate options for years from 2000 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 1999), (val, index) =>
    (currentYear - index).toString()
  );

  
  // Define options for months
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5142/api/authenticate/getUserDetails"
        );
        setUserData(response.data);
        setLoading(false);

        const apiUrl = `${BASE_URL}/api/all/blog/by/sorting?pageNumber=1&pageSize=1000&sortBy=recency`; // API URL

        const responsePost = await axios.get(apiUrl);

        setBlogPosts(responsePost.data.blogs);

        // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []); // Fetch data when the component mounts
  // Fetch data when the component mounts

  const userDataLength = userData ? userData.length : 0;
  const postLength = blogPosts ? blogPosts.length : 0;

  return (
    <main className="main-container">
      <div className="main-title">
        <h3 id="title-text">DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total User</h3>
          </div>
          <h1>{userDataLength}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Post</h3>
          </div>
          <h1>{postLength}</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="year" className=" text-black">
          Select Year:
        </label>
        <select
          id="year"
          onChange={handleYearChange}
          value={selectedYear}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 text-black"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="month" className=" text-black">
          Select Month:
        </label>
        <select
          id="month"
          onChange={handleMonthChange}
          value={selectedMonth}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 text-black"
        >
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Post Post
        </button>
      </div>
      <div className="">
        <div className="flex items-center justify-center text-black text-center font-bold text-2xl">
          <br />
          <div className="flex items-center"></div>
        </div>
        <br />

        {timeBlogPosts.length > 0 ? (
          timeBlogPosts.map((blog) => (
            <div
              key={blog.blogId}
              className="max-w-3xl mx-auto bg-cardColor shadow-md rounded-md p-4 mb-10 cursor-pointer"
            >
              <div className="flex items-center mb-2">
                <div className="rounded-full bg-gray-300 h-8 w-8">
                  {blog.userDTO && blog.userDTO.username ? (
                    // Check if userDTO exists and username is not null
                    <img
                      src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
                        blog.userDTO.username
                      )}&rounded=true`}
                      alt=""
                      className="w-12"
                    />
                  ) : (
                    // Provide a fallback if userDTO or username is null
                    <span>No Avatar</span>
                  )}
                </div>
                <div className="ml-2 mt-1 flex items-center">
                  <p className="font-bold text-gray-800">
                    @
                    {blog.userDTO && blog.userDTO.username
                      ? blog.userDTO.username
                      : "Unknown"}
                    {/* Use a fallback value if username is null */}
                  </p>
                  <p className="font-bold ml-2 text-gray-800">.</p>
                  <p className="text-sm/[3px] ml-2 text-gray-400 ">
                    {getTimeAgo(blog.createdTime)}
                  </p>
                  <button
                    onClick={() => handleDelete(blog.blogId)}
                    className="bg-gray-200 ml-3 hover:bg-textColors hover:text-white transition duration-700 text-gray-800 py-1 px-4 rounded-full"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
              <p className="text-lg text-black font-semibold mb-2">{blog.title}</p>
              <p className=" text-black text-justify mb-4">{blog.content}</p>
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
                <p className="py-1 px-1 rounded-full mr-2">{blog.totalUpvotes || 0 }</p>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2">
                  <FontAwesomeIcon icon={faHandPointDown} />
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2">
                  <FontAwesomeIcon icon={faMessage} />
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
    </main>
  );
}
