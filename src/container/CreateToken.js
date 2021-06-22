import { useEffect, useState } from 'react'
import ArtistCard from '../components/ArtistCard'
export default function CreateToken() {

  const [AT, setAT] = useState(localStorage.getItem('spotifyAT'))
  const [RT, setRT] = useState(localStorage.getItem('spotifyRT'))
  const [band, setBand] = useState('')
  const [bandsResponse, setBandsResponse] = useState([])
  useEffect(() => {

  }, [])

  const findArtist = (event) => {
    event.preventDefault()
    const authString = `Bearer ${AT}`
    const url = 'https://api.spotify.com/v1/search?q=' + band + '&type=artist&market=US&limit=5'
    const options = {
      headers: {
        "Accept": "application/json",
        'content-type': 'application/json',
        'Authorization': authString
      }
    }
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const artists = response.artists.items
        const bands = []
        artists.forEach(artist => {
          const bandObj = [
            artist.name,
            artist.id,
            artist.followers,
            artist.images,
            artist.popularity
          ]
          bands.push(bandObj)
        })
        console.log(bands)
        setBandsResponse(bands)
      })
  }
  const createBandCards = () => {
    return bandsResponse.map(band => {
      return <ArtistCard
        band={band}
        key={band.id}
      />
    })
  }

  return (
    <div>
      <form onSubmit={(event) => findArtist(event)}>
        <label for="band" >Band Name</label>
        <input
          className="shadow "
          type="text"
          name="band"
          value={band}
          onChange={(event) => setBand(event.target.value)}></input>
        <button className="border-2 border-black" type="submit">Search</button>
      </form>
      {createBandCards()}
    </div>
  )
}
