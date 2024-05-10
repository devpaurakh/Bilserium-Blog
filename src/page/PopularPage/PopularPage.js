import React, { useState, useEffect } from "react";
import Post from "../../Component/Post";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../../constants";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { faBarChart} from "@fortawesome/free-solid-svg-icons";
export default function PopularPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading initially to true
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const apiUrl = `${BASE_URL}/api/all/blog/by/sorting?pageNumber=${currentPage}&pageSize=10&sortBy=popularity`; // API URL
        const response = await axios.get(apiUrl);
        const { blogs, totalPages } = response.data;
        setBlogPosts(blogs);
        setTotalPages(totalPages);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchBlogData();
  }, [currentPage]); // Fetch data when currentPage changes

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
                <FontAwesomeIcon icon={faBarChart} />
                <h1 className="ml-2 ">Popular Blog</h1>
              </div>
            </div>
            <br />
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
