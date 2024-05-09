import React from 'react'

import {
    faDashboard,
    faDiamond,
    faGlobe,
 
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarChart } from '@fortawesome/free-regular-svg-icons';

export default function AdminSidebar({openSidebarToggle,OpenSidebar}) {
  return (
    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'> 
            <FontAwesomeIcon icon={faDiamond} className='icon_header' /> ADMIN PANEL
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>

        </div>

        <ul className='sidebar-list'>

            <li className='sidebar-list-item'>
                <a href="#">
                    <FontAwesomeIcon icon={faDashboard} className='icon' /> Dashboard
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="#">
                    <FontAwesomeIcon icon={faGlobe} className='icon' /> All
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="#">
                    <FontAwesomeIcon icon={faBarChart} className='icon' /> Dashboard
                </a>
            </li>

        </ul>
      
    </aside>
  )
}


 //  {/* <FontAwesomeIcon icon={faDashboard} />
    //     <FontAwesomeIcon icon={faGlobe} />
    //     <FontAwesomeIcon icon={faBarChart} />
    //     <FontAwesomeIcon icon={faSignOut} /> */}