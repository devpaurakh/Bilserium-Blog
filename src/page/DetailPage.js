import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { BASE_URL } from "../constants";
import { useState } from "react";
import axios from "axios";
import {
  faHandPointDown,
  faHandPointUp,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function DetailPage() {
  const [comment, setComment] = useState("");

  const location = useLocation();
  const blogDetails = location.state ? location.state.blogDetails : null; // Get the blog details from the location state
  console.log(
    "Blog details:",
    blogDetails?.blogDetails[0]?.commentDTOs[0]?.comments ?? ""
  );
  const blogId =
    blogDetails && blogDetails.blogDetails.length > 0
      ? blogDetails.blogDetails[0].blogId
      : ""; //`blogId=${blogDetails.blogDetails[0].id}`;

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
  };

  function getTimeAgoAdjusted(originalTime) {
    const adjustedTime = new Date(originalTime);
    adjustedTime.setHours(adjustedTime.getHours() + 5); // Add 5 hours
    adjustedTime.setMinutes(adjustedTime.getMinutes() + 45); // Add 45 minutes
    adjustedTime.setSeconds(adjustedTime.getSeconds() + 4); // Add 4 seconds
    return getTimeAgo(adjustedTime);
  }

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    // Check if the comment is empty
    if (!comment.trim()) {
      // Display an error message or perform any desired action
      Swal.fire({
        title: "Comment cannot be empty",
        text: "Add a comment to submit",
        icon: "question",
      });
      return; // Exit the function early if the comment is empty
    }

    try {
      const apiUrl = `${BASE_URL}/api/post/comment?connectionId=${blogId}`;
      const response = await axios.post(apiUrl, {
        content: comment,
        blogId:
          blogDetails && blogDetails.blogDetails.length > 0
            ? blogDetails.blogDetails[0].blogId
            : "",
        userId:
          blogDetails && blogDetails.blogDetails.length > 0
            ? blogDetails.blogDetails[0].userDTO.id
            : "",
      });
      console.log("Comment submitted:", response.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }

    setComment("");
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="pt-40 bg-backgroundColor">
        <div className="flex items-center justify-center text-black text-center font-bold text-2xl">
          <div className="flex items-center">
            <h1 className="ml-2 ">Blog Detail</h1>
          </div>
        </div>
        <br />
        <br />
        {/* Pass blogDetails as a prop to the PostDetail component */}
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-4 mb-10">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-4 mb-10 cursor-pointer">
            <div className="flex items-center mb-2">
              <div className="rounded-full bg-gray-300 h-8 w-8">
                <img
                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
                    blogDetails && blogDetails.blogDetails.length > 0
                      ? blogDetails.blogDetails[0].userDTO.username
                      : ""
                  )}&rounded=true`}
                  alt=""
                  className=" w-12"
                />
              </div>
              <div className="ml-2 mt-1 flex items-center">
                <p className="font-bold  text-gray-800">
                  @
                  {blogDetails && blogDetails.blogDetails.length > 0
                    ? blogDetails.blogDetails[0].userDTO.username
                    : ""}
                </p>
                <p className="font-bold ml-2  text-gray-800">.</p>
                <p className="text-sm ml-2 text-gray-400 ">
                  {getTimeAgoAdjusted(
                    blogDetails && blogDetails.blogDetails.length > 0
                      ? blogDetails.blogDetails[0].createdTime
                      : ""
                  )}
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold mb-2">
              {blogDetails && blogDetails.blogDetails.length > 0
                ? blogDetails.blogDetails[0].title
                : ""}
            </p>
            <p className="text-gray-700 text-justify mb-4">
              {blogDetails && blogDetails.blogDetails.length > 0
                ? blogDetails.blogDetails[0].content
                : ""}
            </p>
            <div className="overflow-hidden mb-4">
              <img
                src={`${BASE_URL}${
                  blogDetails && blogDetails.blogDetails.length > 0
                    ? blogDetails.blogDetails[0].imageUrl
                    : ""
                }`}
                alt=""
                className="w-full rounded-md"
              />
            </div>
            <div className="flex items-center">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2">
                <FontAwesomeIcon icon={faHandPointUp} />
              </button>
              {blogDetails && blogDetails.totalUpvotes && (
                <p className="py-1 px-1 rounded-full mr-2">
                  {blogDetails.totalUpvotes}
                </p>
              )}
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2">
                <FontAwesomeIcon icon={faHandPointDown} />
              </button>
              <p className="py-1 px-1 rounded-full mr-2">
                {blogDetails?.totalDownvotes || ""}
              </p>

              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded-full mr-2">
                <FontAwesomeIcon icon={faMessage} />
              </button>
              <p className="py-1 px-1 rounded-full mr-2">
                {blogDetails?.totalComments}
              </p>
            </div>
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Comment"
              value={comment}
              onChange={handleInputChange}
              className="border w-full border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-r ml-5 hover:bg-blue-600 focus:outline-none"
            >
              Comment
            </button>
          </div>
          <br />
          <h2 className="text-lg font-bold mb-4">Comments</h2>
          {blogDetails &&
          blogDetails.blogDetails &&
          blogDetails.blogDetails.length > 0 ? (
            blogDetails.blogDetails.map((blogDetail, blogIndex) =>
              blogDetail.commentDTOs && blogDetail.commentDTOs.length > 0 ? (
                blogDetail.commentDTOs.map((comment, commentIndex) => (
                  <div
                    key={`${blogIndex}-${commentIndex}`}
                    className="bg-white shadow-sm rounded-md p-4 mb-4"
                  >
                    <div className="flex items-center">
                      {/* Display user avatar */}
                      <img
                        src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
                          comment.userDTO.username ?? "Unknown"
                        )}&rounded=true`}
                        alt=""
                        className="w-6 rounded-full mr-2"
                      />

                      {/* Display username */}
                      <p className="font-1sm text-gray-800">
                        @{comment.userDTO.username ?? "Unknown"}
                      </p>

                      {/* Display timestamp */}
                      <p className="font-xs ml-3 text-gray-400">
                        {getTimeAgoAdjusted(comment.createdTime)}
                      </p>
                    </div>
                    <br />

                    {/* Display comment content */}
                    <p className="text-gray-800">{comment.comments}</p>

                    {/* Display upvotes and downvotes */}
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600 mr-4 flex items-center">
                        <FontAwesomeIcon icon={faHandPointUp} />{" "}
                        {comment.totalUpvotes}
                      </span>
                      <span className="text-gray-600 flex items-center">
                        <FontAwesomeIcon icon={faHandPointDown} />{" "}
                        {comment.totalDownvotes}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  key={blogIndex}
                  className="bg-white shadow-sm rounded-md p-4 mb-4"
                >
                  <p className="text-gray-800">No comments</p>
                </div>
              )
            )
          ) : (
            <div className="bg-white shadow-sm rounded-md p-4 mb-4">
              <p className="text-gray-800">No comments</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
