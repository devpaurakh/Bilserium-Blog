import React, { useState } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

export default function CreatePost() {
  const toHome = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const isFormValid = () => {
    return title.trim() !== "" && content.trim() !== "";
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      var userId;

      try {
        const accessToken = Cookies.get("accessToken");
        const token = accessToken;
        const decodedToken = jwtDecode(token);
        userId = decodedToken.id;
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }

      // Construct the request body
      const requestBody = {
        Title: title,
        Content: content,
        UserId: userId,
      };

      // Create FormData object to append the image file if it exists
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Content", content);
      formData.append("UserId", userId);
      if (selectedImage) {
        formData.append("BlogImage", selectedImage);
      }

      // Send the request using Axios
      axios
        .post(`${BASE_URL}/api/blog/post`, formData, { //
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status === true) {
            toast.success(`${response.data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setTimeout(() => {
              toHome("/home");
            }, 3000);
          } else {
            toast.error(`${response.data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

          }
        })
        .catch((error) => {
          // Handle errors
          console.error("Error creating blog:", error);
          toast.error("An error occurred. Please try again later.");
        });
    } else {
      toast.error("Please fill out all fields!");
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <br />
      <div className="h-screen bg-gray-100 flex justify-center items-center">
        <div className="max-w-3xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg relative">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full mb-4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={handleContentChange}
            className="w-full h-80 mb-4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="custom-file-input"
          />
          <button
            disabled={!isFormValid()}
            onClick={handleSubmit}
            className={`absolute bottom-4 right-4 ${
              isFormValid()
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-2 px-4 rounded`}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
