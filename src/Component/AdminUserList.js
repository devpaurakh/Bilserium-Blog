import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../constants";
import LoaderAnimation from "./LoaderAnimation";

export default function AdminUserList() {
  const [loading, setLoading] = useState(true); // Set loading initially to true
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5142/api/authenticate/getUserDetails"
        );
        setUserData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []); // Fetch data when the component mounts

  //update role
  const handleRoleChange = async (userId, currentRole, newRole) => {
    try {
      // Make a request to your API to update the user's role
      const response = await axios.patch(
        `${BASE_URL}/api/update/user/role?userId=${userId}&userRole=${newRole}`
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Update the role of the user in the state
        const updatedUserData = userData.map((user) => {
          if (user.id === userId) {
            setLoading(false);
            return { ...user, role: newRole };
          }

          return user;
          // Set loading to false after data is fetched
        });

        // Update the state with the new user data
        setUserData(updatedUserData);
      } else {
        console.error("Failed to update user role");
        setLoading(false); // Set loading to false after data is fetched
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      setLoading(false); // Set loading to false after data is fetched
    }
  };

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
          <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex p-5 items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4  bg-white dark:bg-textColors">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 ps-10 text-sm border-none rounded-lg w-80 bg-gray-50  0 dark:placeholder-gray-400 dark:text-black  "
                  placeholder="Search for users"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <h1>User ID</h1>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData &&
                  userData.map((user, index) => (
                    <tr className="bg-white border-b dark:bg-white dark:border-gray-700 hover:bg-gray-50">
                      <td className="w-4 p-4">
                        <h1>{user.id}</h1>
                      </td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
                            user.username ? user.username : "unknown"
                          )}&rounded=true`}
                          alt="Jeseimage"
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold text-black">
                            {user.username ? user.username : "No Name"}
                          </div>
                          <div className="font-normal text-black">
                            {user.email ? user.email : "No Email"}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <div className="relative">
                          {loading ? (
                            <LoaderAnimation />
                          ) : (
                            <select
                              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={user.role}
                              onChange={(e) =>
                                handleRoleChange(
                                  user.id,
                                  user.role,
                                  e.target.value
                                )
                              }
                            >
                              <option value="Admin">Admin</option>
                              <option value="SuperAdmin">SuperAdmin</option>
                              <option value="Blogger">Blogger</option>
                            </select>
                          )}

                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.293 11.293a1 1 0 011.414 0L10 12.586l.293-.293a1 1 0 011.414 1.414l-1 1a1 1 0 01-1.414 0l-1-1a1 1 0 010-1.414zM10 6a1 1 0 011 1v5a1 1 0 01-2 0V7a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center text-black">
                          {user.phoneNumber ? user.phoneNumber : "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
