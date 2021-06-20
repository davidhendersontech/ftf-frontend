import React from 'react'
import { Link } from 'react-router-dom'

export default function Top({ isLoggedIn }) {
  return (
    <header className=" bg-white border-b-4 border-gray-100 flex flex-wrap items-center h-12 ">
      <div className="h-full justify-item-center bg-yellow-500">Found Them First</div>
      <nav className="flex-col float-right">
        {!isLoggedIn
          ? <Link to="/login">Log In</Link>
          : <Link to="">loggedin</Link>
        }
      </nav>

    </header>
  )
}
