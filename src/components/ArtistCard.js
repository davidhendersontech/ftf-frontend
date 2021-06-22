import React from 'react'

export default function ArtistCard({ band }) {
  console.log(band)
  return (
    <div>
      <h1>{band[0]}</h1>
      <img src={band[3][1].url}></img>
      <h2>followers {band[2].total}</h2>
      <p>popularity: {band[4]}</p>
    </div>
  )
}
