import SpotifyLogin from '../components/SpotifyLogin'
import CreateToken from './CreateToken'
import { useState } from 'react'
export default function Home() {

  const [spotifyUserCode, setSpotifyUC] = useState('')  //user token to authenticate spotify login
  const [spotifyAccessToken, setSpotifyAT] = useState('')
  const [spotifyRefreshToken, setSpotifyRT] = useState('')


  return (
    <div>
      <h1>Create a new token?</h1>

      {spotifyUserCode && spotifyAccessToken && spotifyRefreshToken
        ? <CreateToken />
        : <SpotifyLogin
          spotifyUserCode={spotifyUserCode}
          setSpotifyUC={setSpotifyUC}
          setSpotifyAT={setSpotifyAT}
          setSpotifyRT={setSpotifyRT}
        />}
    </div>
  )
}
