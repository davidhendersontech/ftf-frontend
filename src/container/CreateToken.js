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
    const authString = `Bearer ${localStorage.getItem('spotifyAT')}`
    const url = 'https://api.spotify.com/v1/search?q=' + band + '&type=artist&market=US&limit=10'
    const options = {
      headers: {
        "Accept": "application/json",
        'content-type': 'application/json',
        'Authorization': authString
      }
    }
    console.log(url, options)
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        try {
          let artists = response.artists.items
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
        } catch (error) {
          console.error(error)
        }


      })
  }
  const createBandCards = () => {
    return bandsResponse.map(band => {
      return <ArtistCard
        band={band}
        key={band.id}
        createAlert={createAlert}
      />


    })
  }

  const createAlert = (event) => {
    const tokens = document.querySelector('#tokens')
    const alert = document.createElement('p')
    alert.innerText = "Token Created!"

  }



  return (
    <div className="flex flex-col m-20">
      <h1 className="text-4xl font-bold text-center">Would you like to make a new token?</h1>
      <form onSubmit={(event) => findArtist(event)} className="flex flex-col my-2 ">
        <label for="band" className="text-center font-medium my-2" >Enter Your Hot New Band</label>
        <input
          className="shadow border-2 border-gray-200 text-center my-4 h-12 font-bold text-3xl"
          type="text"
          name="band"
          placeholder="the greeting committee"
          value={band}
          onChange={(event) => setBand(event.target.value)}></input>
        <button className="border-2 border-black hover:bg-gray-300" type="submit">Search</button>
      </form>
      <div className="flex flex-row flex-wrap flex-1" id="tokens">
        {createBandCards()}
      </div>

    </div>
  )
}
