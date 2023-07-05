import { useState, useEffect } from 'react'
import * as beatsAPI from '../../utilities/beats-api'
import './BeatPage.css'
import BeatCard from '../../components/BeatCard/BeatCard'

export default function BeatPage({ user }) {
  const [beats, setBeats] = useState([])


  useEffect(() => {
      const fetchBeats = async () => {
        try {
          const response = await beatsAPI.getAll()
          setBeats(response)
        } catch (error) {
          console.error('Error fetching beats:', error)
        }
      }
    
      fetchBeats()
  }, [user])
  

  return (
    <>
      <h1>Beats</h1>
        <div className='card-container'>
          {beats.map((beat) => 
            <BeatCard
                id={beat._id}
                name={beat.name}
                artist={beat.artist}
                tempo={beat.tempo}
                songKey={beat.key}
                description={beat.description}
                url={beat.url}
                price={beat.price}
                category={beat.category.name}
                coverArt={beat.coverArt}
                beat={beat} 
            />
            )}
        </div>
    </>
  )
}
  