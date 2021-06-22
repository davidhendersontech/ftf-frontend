import { useEffect } from 'react'
export default function CloseWindow({ setSpotifyUC }) {


  useEffect(() => {
    const spotifyUserCode = window.location.search.split('=')[1]
    const storeToken = async () => {
      localStorage.setItem('spotifyUC', spotifyUserCode)
    }
    storeToken()
      .then(window.close)
  }, [])

  return (
    <div>
      <h1>You're all set!</h1>
      <p>please close this window to continue</p>

    </div>
  )
}
