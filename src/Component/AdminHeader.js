import {
  faAlignJustify
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function AdminHeader({OpenSidebar}) {
  const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=PaurakhSaud&rounded=true`;
  return (
   

    <header className="header">
      <div className="menu-icon">
        <FontAwesomeIcon className="icon" icon={faAlignJustify} onClick={OpenSidebar} />
      </div>

      <div className='header-left'>
            
        </div>

      <div className="header-right">
        <img className="icon"  src={avatarUrl} alt="Profile" />
      </div>
    </header>
  );
}
