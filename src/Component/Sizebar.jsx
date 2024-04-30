import React from 'react'

import logo from "/Users/ace/Documents/Code/bisleriumblog/src/Assets/Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from '@fortawesome/free-solid-svg-icons';

export default function Sizebar({children}) {
  return (
    <aside className="h-screen">
    <nav className="h-full flex flex-col bg-white border-r shadow-sm">
      <div className="p-4 pb-2 flex justify-between items-center">
        <img
          src={logo}
          className="w-32" 
          alt=""
        />
        <button
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">

            <FontAwesomeIcon icon={faBackward}/>
        </button>
      </div>
      <ul className='flex-1 p-3'>{children}</ul>
      <div className='border-t flex p-3'>
        <img src="https://ui-avatars.com/api/?name=Paurakh+Saud" alt="" className="w-10 h-10 rounded-md"/>
        <div className={`flex justify-between items-center w-52 ml-3`}>
            <div className='leading-4'>
               <h4 className="font-semibold">Paurakh Saud</h4>
               <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                </div>
        </div>
      </div>
    </nav>
  </aside>
  )
}

export function SideBarItem({icon, text, active, alert}){
    return(
        <li>
            {icon}
            <span>{text}</span>
        </li>
    )
}

