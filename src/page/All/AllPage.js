import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Header from '../../Component/Header'
import Sidebar from '../../Component/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AllPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="pt-40">
      <div className="flex items-center justify-center text-black text-center font-bold text-2xl">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faGlobe} />
        <h1 className="ml-2">All</h1>
      </div>
    </div>
        <br />
       
      </div>
    </>
  )
}
