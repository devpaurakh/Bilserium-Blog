import React, { useState } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatePost() {
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
      toast.success("Blog is Created Succesfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
