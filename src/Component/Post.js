import {
  faHandPointDown,
  faHandPointUp,
  faHeart,
  faMessage,
  faSave,
} from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Post() {
  return (
    <div className="max-w-xl mx-auto bg-cardColor shadow-md rounded-md p-4 mb-10 cursor-pointer">
      {/* Add margin-top here */}
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-gray-300 h-8 w-8">
          <img
            src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Paurakh+Saud&rounded=true"
            alt=""
            className=" w-12"
          />
        </div>
        <div className="ml-2 mt-1 flex items-center">
          <p className="font-bold  text-gray-800">@paurakh</p>
          <p className="font-bold ml-2  text-gray-800">.</p>
          <p className="text-sm/[3px] ml-2 text-gray-400 ">2 hours ago</p>

          <button className="bg-gray-200 ml-3 hover:bg-textColors hover:text-white transition duration-700 text-gray-800 py-1 px-4 rounded-full">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
      <p className="text-lg font-semibold mb-2">
        1914 translation by H. Rackham
      </p>
      <p className="text-gray-700 text-justify mb-4">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </p>
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
  );
}
