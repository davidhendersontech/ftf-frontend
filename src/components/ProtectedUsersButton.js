import React from 'react'

export default function ProtectedUsersButton() {

  const handleClick = () => {
    fetch('http://localhost:3001/users', {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(result => console.log(result))
  }

  return (
    <button onClick={handleClick}>Get Users</button>
  )
}
