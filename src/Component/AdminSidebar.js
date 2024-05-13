import React, { useState } from "react";

import {
  faDashboard,
  faDiamond,
  faGlobe,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminSidebar({ openSidebarToggle, OpenSidebar }) {
  const toHome = useNavigate();
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const handleLogout = () => {
    // Remove all data from cookies
    Swal.fire({
      title: "Are you sure?",
      text: "To logout from the application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
        toHome("/home");
      }
    }); // Show the confirmation dialog

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }; // Function to handle logout

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FontAwesomeIcon icon={faDiamond} className="icon_header" /> ADMIN
          PANEL
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <Link
          to="/admin"
          className={activeLink === "/admin" ? "bg-textColors text-white" : ""}
          onClick={() => setActiveLink("/admin")}
        >
          <li className="sidebar-list-item">
            <FontAwesomeIcon icon={faDashboard} className="icon" />
            Dashboard
          </li>
        </Link>

        <Link
          to="/adminUserlist"
          className={activeLink === "/adminUserlist" ? "bg-textColors text-white" : ""}
          onClick={() => setActiveLink("/adminUserlist")}
        >
          <li className="sidebar-list-item">
            <FontAwesomeIcon icon={faGlobe} className="icon" /> All User
          </li>
        </Link>

        <Link
          to="/adminAllPost"
          className={activeLink === "/adminAllPost" ? "bg-textColors text-white" : ""}
          onClick={() => setActiveLink("/adminAllPost")}
        >
          <li className="sidebar-list-item">
            <FontAwesomeIcon icon={faBarChart} className="icon" /> All Post
          </li>
        </Link>
        <li className="sidebar-list-item" id="logout" onClick={handleLogout}>
          <a href="#">
            <FontAwesomeIcon icon={faSignOut} className="icon" /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}
