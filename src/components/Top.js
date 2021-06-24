import React from 'react'
import { Link } from 'react-router-dom'

export default function Top({ isLoggedIn }) {
  return (
    <header className=" bg-white border-b-4 border-gray-100 flex flex-wrap items-center h-12 ">
      <div className="flex-1 flex justify-between items-center">
        <Link to="/" className="text-5xl">Found Them First</Link>
      </div>
      <div className="flex items-center w-auto">
        <nav className="flex-col float-right ml-20">
          {!isLoggedIn
            ? <span className="text-2xl mr-20 border-b-2 border-transparent hover:border-black h-12"><Link to="/login">Log In</Link></span>
            : <span className="text-2xl  mr-20 border-b-2 border-transparent hover:border-black h-12"><Link to="/profile">Profile</Link></span>
          }
          <span className="text-2xl mr-20 border-b-2 border-transparent hover:border-black h-12"><Link to="/about">About</Link></span>
        </nav>
      </div>
    </header>
  )
}
