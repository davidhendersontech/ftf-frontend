import { useState, useEffect } from 'react'
import {
  Router as Router,
  Route
} from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm'
import Home from './container/Home'
import CloseWindow from './components/CloseWindow'
import Top from './components/Top'
import Profile from './container/Profile'
import history from './components/History'
import About from './components/About'
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    history.push('/')
  }

  useEffect(() => {
    console.log('trying to log in')
    if (localStorage.token) {
      fetch('http://localhost:3001/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(response => response.json())
        .then(result => {
          result.error ? console.error(result.error) : handleLogin(); console.log(result)
        })
      handleLogin()
    }

  }, [])

  return (
    <div className="h-screen flex flex-col font-body">
      <Router history={history}>
        <Top isLoggedIn={isLoggedIn}></Top>
        <Route exact path="/" render={() => <Home
          isLoggedIn={isLoggedIn}
        />}></Route>
        <Route path="/callback" render={() => <CloseWindow />}></Route>
        <Route path="/signup" component={SignUpForm}></Route>
        <Route path="/login" render={() => <LogInForm
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
        />}></Route>
        <Route path="/profile" render={() => <Profile
          handleLogout={handleLogout}
        />} ></Route>
        <Route path="/about" component={About}></Route>
      </Router>

    </div >
  );
}

export default App;
