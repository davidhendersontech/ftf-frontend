import { useState, useEffect } from 'react'

export default function SpotifyLogin(props) {

  const [hasUserCode, setHasUserCode] = useState(false)

  const getSpotifyUserCode = () => {

    const clientId = '6c33cdb5e2154f16bb2d68649c8b5f4e'
    let spotifyWindow = null;
    if (spotifyWindow === null) {
      spotifyWindow = window.open(
        'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback', '_blank'
      )

    }
    const checkWindowStatus = setInterval(() => {
      if (spotifyWindow.closed) {
        clearInterval(checkWindowStatus)
        setHasUserCode(true)
      }
    }, 500)
  }

  const getSpotifyAccessCode = () => {
    const spotifyUC = localStorage.getItem('spotifyUC')
    props.setSpotifyUC(spotifyUC)
    const clientId = '6c33cdb5e2154f16bb2d68649c8b5f4e'
    const clientSecret = '9ec21b7ca3254ec48933cee44aee28ab'
    var encodedData = window.btoa(clientId + ':' + clientSecret)
    const redirect_uri = "http%3A%2F%2Flocalhost%3A3000%2Fcallback"
    var authorizationHeaderString = 'Basic ' + encodedData


    // have to use URLSearchParams to comply with x-www-form-urlencoded
    let data = new URLSearchParams();
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", "http://localhost:3000/callback");
    data.append("code", localStorage.getItem('spotifyUC'))

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorizationHeaderString,
      },
      body: data
    })
      .then(response => response.json())
      .then(response => {
        if (response.refresh_token) {
          props.setSpotifyAT(response.access_token)
          props.setSpotifyRT(response.refresh_token)
          localStorage.setItem('spotifyAT', response.access_token)
          localStorage.setItem('spotifyRT', response.refresh_token)
        }

        // localStorage.setItem('spotifyAT', response.access_token)
        // localStorage.setItem('spotifyRT', response.refresh_token)
      })
  }

  useEffect(() => {
    if (hasUserCode) {
      console.log('user code accquried')
      getSpotifyAccessCode()
    }

  }, [hasUserCode])

  return (
    <div>
      <button className="shadow border-2 border-black" onClick={() => getSpotifyUserCode()}>Log In to Spotify</button>
    </div>
  )
}
