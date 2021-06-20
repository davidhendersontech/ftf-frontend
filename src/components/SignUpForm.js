import React from 'react'
import { useState, useEffect } from 'react'
export default function SignUpForm(props) {
  const { history } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3001/users', {
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
        history.push('/')
      })
  }



  return (
    <div className="flex flex-col">
      <h1>We're glad to have you!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <label for="username">Username</label>
        <input
          name="username"
          className="shadow border-2 border-gray-500"
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label for="password">Password</label>
        <input
          name="password"
          type="password"
          className="shadow border-2 border-gray-500"
          value={password}
          placeholder="hunter2"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input type="submit" value="create user" />
      </form>
    </div>
  )
}
