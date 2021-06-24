import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import history from './History'
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
          history.push('/profile')
        }
      })


  }

  return (
    <div className="flex flex-wrap flex-col m-40 bg-gray-300 shadow-lg justify-center flex-auto">
      <h1 className="text-center text-xl font-medium">Welcome back!</h1>
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
        <input type="submit" value="Log In" className="shadow-lg my-10 text-xl h-12 w-24 mx-auto justify-center hover:bg-white" />

      </form>
      <Link to="/signup" className="text-center border-b-2 border-transparent hover:border-black">New Here? Create an account.</Link>
    </div>
  )
}
