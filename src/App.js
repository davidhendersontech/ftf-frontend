import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm'
import Home from './container/Home'
import CloseWindow from './components/CloseWindow'
import Top from './components/Top'
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  useEffect(() => {
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
    }

  }, [])

  return (
    <div className="h-screen flex flex-col font-body">
      <Router>
        <Top isLoggedIn={isLoggedIn}></Top>
        <Route exact path="/" component={Home}></Route>
        <Route path="/callback" render={() => <CloseWindow />}></Route>
        <Route path="/signup" component={SignUpForm}></Route>
        <Route path="/login" render={() => <LogInForm
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
        />}></Route>
      </Router>

    </div >
  );
}

export default App;
