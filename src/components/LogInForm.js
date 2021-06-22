import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function LogInForm(props) {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    fetch('http://ftf-backend.herokuapp.com/login', {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ user: { username, password } })
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          console.error(result.error)
        } else {
          localStorage.setItem('token', result.token)
          props.handleLogin()
        }
      })
      .then(result => {
        return <Redirect to="/" />
      })

  }

  return (
    <div className="flex flex-wrap flex-col">
      <h1>Welcome back!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
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
        <input type="submit" value="login" />
      </form>
      <Link to="/signup" className="text-center">New Here?</Link>
    </div>
  )
}
