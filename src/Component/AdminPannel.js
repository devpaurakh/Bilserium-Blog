import React,{useState} from "react";
import "./AdminPannel.css";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminPage from "./AdminPage";
export default function AdminPannel() {
  
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <AdminHeader OpenSidebar={OpenSidebar}/>
      <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <AdminPage />
    </div>
  )
}
