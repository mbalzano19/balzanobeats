import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as beatsAPI from '../../utilities/beats-api';
import * as categoriesAPI from '../../utilities/categories-api'
import { useLocation } from 'react-router-dom';
import NewOrderPage from '../../pages/App/NewOrderPage/NewOrderPage';
import './BeatDetail.css';



export default function BeatDetail({genre}) {
    console.log("GENRE", genre)
  const { id } = useParams();
  const [beat, setBeat] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const audioRef = useRef(null);

//   let location = useLocation()
//   console.log('uselocation', location.state.genre)

const location = useLocation();
const currentPage = location.pathname;
console.log("CURRENTPAGETHINGBEAAAAT", currentPage)

const handleTogglePlay = () => {
    const audioElement = audioRef.current;
    if (audioElement.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;
    setCurrentTime(audioElement.currentTime);
  };

  const handleSeek = (e) => {
    const audioElement = audioRef.current;
    const seekTime = parseFloat(e.target.value);
    audioElement.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

//   const handleSeekMouseDown = () => {
//     setIsSeeking(true);
//   };

//   const handleSeekMouseUp = () => {
//     setIsSeeking(false);
//   };

  useEffect(() => {
    const fetchBeat = async () => {
      try {
        const response = await beatsAPI.getAll(id);
        const beatArray = response.find(beat => beat._id === id);
        console.log('cover art beat', beatArray.coverArt)

        // const catResponse = await categoriesAPI.getById(beat.category)

        // console.log('CATREPONSEEE', beatArray.category)
        const setBeatWithCategory = {...beatArray, category: beatArray.category.name};
        console.log('setbeatwithcategory', setBeatWithCategory)
        setBeat(setBeatWithCategory);
        console.log('response in detail', beatArray)

      } catch (error) {
        console.error('Error fetching beat:', error);
      }
    };

    fetchBeat();
  }, [id]);

  

//   console.log('beat cover art', beat.name)

  if (!beat) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className='detail-container'>
      <div style={{"background": `url(${beat.coverArt}) no-repeat center center`, "WebkitBackgroundSize": "cover"}} className="detail-card">
      <h1>{beat.name}</h1>
      {/* <p>Name: {beat.name}</p> */}
      <p>Genre: {beat.genre}</p>
      <p>Tempo: {beat.tempo}</p>
      <p>Key: {beat.key}</p>
      <p>Price: {beat.price}</p>
      <p>Category: {beat.category}</p>
      </div>
      </div>
      <div className="audio-player">
        <div className="progress-bar">
          <input
            type="range"
            min={0}
            max={audioRef.current?.duration}
            value={currentTime}
            step={0.1}
            onChange={handleSeek}
            // onMouseDown={handleSeekMouseDown}
            // onMouseUp={handleSeekMouseUp}
            />
        </div>
        <p>Description: {beat.description}</p>
        <button
          className={`play-pause-button ${isPlaying ? "playing" : "paused"}`}
          onClick={handleTogglePlay}
          >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <audio
        ref={audioRef}
        src={beat.url}
        onTimeUpdate={handleTimeUpdate}
        ></audio>
      <audio ref={audioRef} src={beat.url}></audio>
      <audio ref={audioRef} src={beat.url}></audio>

      

      <NewOrderPage beat={beat} />

    </>
  );
}