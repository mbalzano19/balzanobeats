import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NewBeatPage from '../NewBeatPage/NewBeatPage'
import AuthPage from '../AuthPage/AuthPage'
import BeatPage from '../BeatPage/BeatPage'
import NavBar from '../../components/NavBar/NavBar'
import { getUser } from '../../utilities/users-service'

export default function App() {
  const [user, setUser] = useState(getUser())

  return (
   <main className="App">
      { user ? 
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path='/beats/new' element={<NewBeatPage />} />
          <Route path='/beats' element={<BeatPage user={user}/>} />
        </Routes>
      </>
        : 
        <AuthPage setUser={setUser} /> 
      }
   </main>
  )
}


