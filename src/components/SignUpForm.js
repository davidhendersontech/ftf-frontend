import React from 'react'
import { useState, useEffect } from 'react'
export default function SignUpForm(props) {
  const { history } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://ftf-backend.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: { username, password } })
    })
      .then(response => response.json())
      .then(newUser => {
        console.log(newUser)
        history.push('/login')
      })
  }



  return (
    <div className="flex flex-wrap flex-col m-40 bg-gray-300 shadow-lg justify-center flex-auto">
      <h1 className="text-center text-xl font-medium">We're glad to have you!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <div className="w-full m-5 flex justify-center px-20 ">
          {/* <label for="username" className="font-bold text-lg mx-10 ">Username</label> */}
          <input
            name="username"
            className="shadow border-2 border-gray-500 text-center flex-auto"
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="w-full m-5 flex justify-center px-20 ">
          {/* <label for="password" className="font-bold text-lg mx-10">Password</label> */}
          <input
            name="password"
            type="password"
            className="shadow border-2 border-gray-500 text-center flex-auto"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <input type="submit" value="Sign Up" className="shadow-lg my-10 text-xl h-12 w-24 mx-auto justify-center hover:bg-white" />

      </form>
    </div>
  )
}
