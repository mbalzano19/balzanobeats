import { useState, useEffect, Navigate } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import * as beatsAPI from '../../utilities/beats-api';
import NewBeatPage from '../NewBeatPage/NewBeatPage'
import AuthPage from '../AuthPage/AuthPage'
import BeatPage from '../BeatPage/BeatPage'
import NavBar from '../../components/NavBar/NavBar'
import HomePage from '../HomePage/HomePage';
import BeatDetailPage from '../BeatDetailPage/BeatDetailPage'
import BeatDetail from '../../components/BeatDetail/BeatDetail'
import NewOrderPage from '../NewOrderPage/NewOrderPage'
import MyBeatsPage from '../MyBeatsPage/MyBeatsPage';
import { getUser } from '../../utilities/users-service'
import { useLocation } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [beats, setBeats] = useState()

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const response = await beatsAPI.getAll(user._id)
        // console.log('respnse', response)
        setBeats(response)

      } catch (error) {
        console.error('Error fetching beats:', error);
      }
    };
  
    fetchBeats();
}, [user]);

const location = useLocation();
const currentPage = location.pathname;

return (
  <main className="App">
    {user ? (
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/new" element={<NewBeatPage />} />
          <Route path="/beats" element={<BeatPage user={user} />} />
          {/* <Route path="/beats/:userId" element={<MyBeatsPage user={user} />} /> */}
          <Route path="/beats/:id" element={<BeatDetail user={user} />} />
          <Route
            path="/orders/new"
            element={<NewOrderPage beat={beats} currentPage={currentPage} />}
          />
        </Routes>
      </>
    ) : (
      <>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/beats" element={<BeatPage user={user} />} />
          <Route path="/beats/:id" element={<BeatDetail user={user} />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          {/* <Route
            path="/new"
            element={
              <>
                <Navigate to="/login" replace={true} />
              </>
            }
          /> */}
        </Routes>
      </>
    )}
  </main>
);
          }