import SpotifyLogin from '../components/SpotifyLogin'
import CreateToken from './CreateToken'
import { useState } from 'react'
import About from '../components/About'
export default function Home(props) {

  const [spotifyUserCode, setSpotifyUC] = useState(localStorage.getItem('spotifyUC'))  //user token to authenticate spotify login
  const [spotifyAccessToken, setSpotifyAT] = useState(localStorage.getItem('spotifyAT'))
  const [spotifyRefreshToken, setSpotifyRT] = useState(localStorage.getItem('spotifyRT'))

  const displayItems = () => {
    if (props.isLoggedIn) {

      if (spotifyAccessToken && spotifyRefreshToken) {
        return <CreateToken />
      } else {
        return <>
          <h1>Please log in to spotify to access bands</h1>
          <SpotifyLogin
            spotifyUserCode={spotifyUserCode}
            setSpotifyUC={setSpotifyUC}
            setSpotifyAT={setSpotifyAT}
            setSpotifyRT={setSpotifyRT}
          />
        </>
      }

    } else {
      return <About />
    }
  }

  return (
    <div>

      {displayItems()}

    </div>
  )
}
