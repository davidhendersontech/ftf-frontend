import React from 'react'

export default function ArtistCard(props) {


  const createToken = (event) => {
    const authToken = localStorage.getItem('token')
    const authString = 'Bearer ' + authToken
    fetch('https://ftf-backend.herokuapp.com/users/createtoken', {
      method: "POST",
      headers: {
        'Authorization': authString,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ "band_name": props.band[0], "followers": props.band[2].total })
    })
      .then(response => response.json())
    props.createAlert(event)

  }

  const colors = {
    0: 'bg-green-100',
    1: 'bg-green-300',
    2: 'bg-green-400',
    3: 'bg-green-500',
    4: 'bg-yellow-300',
    5: 'bg-yellow-400',
    6: 'bg-yellow-500',
    7: 'bg-red-300',
    8: 'bg-red-400',
    9: 'bg-red-500',
    10: 'bg-red-600'
  }
  const hottness = Math.floor(props.band[4] / 10)
  const classList = `p-10 border-2 border-black m-2 hover:bg-gray-200 ${colors[hottness]}`

  return (
    <div className={classList} id="card" onClick={createToken}>
      <h1>{props.band[0]}</h1>
      {/* <img src={props.band[3][1].url}></img> */}
      <h2>followers {props.band[2].total}</h2>
      <p>popularity: {props.band[4]}</p>
    </div>
  )
}
