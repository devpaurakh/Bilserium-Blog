import React from "react";
import Post from "../../Component/Post";
import Header from "../../Component/Header";
import Sidebar from "../../Component/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="pt-40">
      <div className="flex items-center justify-center text-black text-center font-bold text-2xl">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faHome} />
        <h1 className="ml-2">Home</h1>
      </div>
    </div>
        <br />
        <Post />
      </div>
    </>
  );
}
