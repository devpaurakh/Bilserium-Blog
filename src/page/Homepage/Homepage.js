import React, { useState, useEffect } from "react";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../constants";
import Post from "../../Component/Post";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import DropDown from "../../Component/DropDown";

export default function Homepage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading initially to true
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [sortBy, setSortBy] = useState("recency"); // Sort by random initially

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const apiUrl = `${BASE_URL}/api/all/blog/by/sorting?pageNumber=${currentPage}&pageSize=10&sortBy=${sortBy}`; // API URL
        const response = await axios.get(apiUrl);
        const { blogComment, totalPages } = response.data; 
        setBlogPosts(blogComment);
        setTotalPages(totalPages);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchBlogData();
  }, [currentPage, sortBy]); // Fetch data when currentPage changes

  // Function to handle sorting by random
  const handleSortByRandom = () => {
    setTimeout(() => {
      setSortBy("random");
      setLoading(false); // Scroll to the top of the page
    }, 2000);
    setLoading(true);
  };

  // Function to handle sorting by recency
  const handleSortByRecent = () => {
    setTimeout(() => {
      setSortBy("recent");
      setLoading(false); // Scroll to the top of the page
    }, 2000);
    setLoading(true);
  }; // Function to handle sorting by recency

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
        setLoading(false); // Scroll to the top of the page
      }, 2000);
      setLoading(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        window.scrollTo(0, 0);
        setLoading(false); // Scroll to the top of the page
      }, 2000);

      setLoading(true);
    }
  };

  return (
    <>
      {loading ? (
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
        <div>
          <Header />
          <Sidebar />
          <div className="pt-40 bg-backgroundColor">
            <div className="flex items-center justify-center text-black text-center font-bold text-2xl">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faHome} />
                <h1 className="ml-2 ">Home</h1>
              </div>
            </div>
            <br />

            <div className="flex justify-around  items-center">
              <div className="mt-4 ml-12">
                {" "}
                <DropDown
                  onSortByRandom={handleSortByRandom}
                  onSortByRecent={handleSortByRecent}
                />
              </div>
              <div className="flex justify-center mr-12 mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l mr-2"
                  onClick={handlePrevPage}
                >
                  Prev
                </button>
                <p className="py-2 px-4 text-black">{currentPage}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ml-2"
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </div>
            </div>
            <br />
            <Post blogPosts={blogPosts} />
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l mr-2"
                onClick={handlePrevPage}
              >
                Prev
              </button>
              <p className="py-2 px-4 text-black">{currentPage}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ml-2"
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
