import React,{useState,useEffect} from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { BASE_URL } from "../constants";
import LoaderAnimation from "./LoaderAnimation";
import { faPager } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminPost from "./AdminPost";



export default function AdminAllPost() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [blogPosts, setBlogPost] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading initially to true
 


  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const apiUrl = `${BASE_URL}/api/all/blog/by/sorting?pageNumber=1&pageSize=1000&sortBy=popularity`; // API URL
        const response = await axios.get(apiUrl);
        const { blogs } = response.data; 
        setBlogPost(blogs);
       
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchBlogData();
  }, []); // Fetch data when currentPage changes


  return (
    <div className="grid-container">
    <AdminHeader OpenSidebar={OpenSidebar} />
    <AdminSidebar
      openSidebarToggle={openSidebarToggle}
      OpenSidebar={OpenSidebar}
    />
    {loading ? (
      <LoaderAnimation />
    ) : (
      <div className="main">
           <div className="">
            <div className="flex items-center justify-center text-black text-center font-bold text-2xl">
                <br />
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPager} />
                <h1 className="ml-2 ">All Post</h1>
              </div>
            </div>
            <br />
            <AdminPost blogPosts={blogPosts} />
           
          </div>
      </div>
    )}
  </div>

  );

}


