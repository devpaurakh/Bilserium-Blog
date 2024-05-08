import React from 'react'
import Post from '../../Component/Post'
import { faBarChart } from '@fortawesome/free-regular-svg-icons'
import Header from '../../Component/Header'
import Sidebar from '../../Component/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function PopularPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="pt-40">
      <div className="flex items-center justify-center text-black text-center font-bold text-2xl">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBarChart} />
        <h1 className="ml-2">Popular</h1>
      </div>
    </div>
        <br />
       
      </div>
    </>
  )
}

