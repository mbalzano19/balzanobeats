import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as beatsAPI from '../../utilities/beats-api';
import * as categoriesAPI from '../../utilities/categories-api'
import { useLocation } from 'react-router-dom';
import NewOrderPage from '../../pages/NewOrderPage/NewOrderPage';
import './BeatDetail.css';
import AWS from 'aws-sdk';



export default function BeatDetail({ genre, user }) {
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
    console.log('AUDIOELEMENT', audioElement)
    console.log('Beat URL TOggle PLAY', beat.url)
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







// async function fetchFileUrls() {
//     try {
//       // Configure AWS SDK
//       AWS.config.update({
//         accessKeyId: 'AKIA2JNXEQL57AFPQ345',
//         secretAccessKey: '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',
//         region: 'us-east-1',
//       });
  
//       const s3 = new AWS.S3();
//       const bucketName = 'balzanobeats';
  
//       // Fetch audio file URL
//       const audioUrlParams = {
//         Bucket: bucketName,
//         Key: 'beats/' + beat.url,
//       };
//       const audioUrl = await s3.getSignedUrlPromise('getObject', audioUrlParams);
  
//       // Fetch cover art URL
//       const coverArtUrlParams = {
//         Bucket: bucketName,
//         Key: 'cover-art/' + beat.coverArt,
//       };
//       const coverArtUrl = await s3.getSignedUrlPromise('getObject', coverArtUrlParams);
  
//       return {
//         audioUrl,
//         coverArtUrl,
//       };
//     } catch (error) {
//       console.error('Error fetching file URLs:', error);
//       return null;
//     }
//   }
  

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



  



  if (!beat) {
    return <p>Loading...</p>;
  }

  // Move the S3-related code inside the if block
  const s3 = new AWS.S3({
    accessKeyId: 'AKIA2JNXEQL57AFPQ345',
    secretAccessKey: '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',
    region: 'us-east-1',
  });
  
  const bucketName = 'balzanobeats';
  const key = `${beat.url}`;

  console.log("KEYKEYKEY", key)
  console.log("KEYKEYKEY", beat.coverArt)

  
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 3600,
  };
  
  const getObjectUrl = async () => {
    try {
      const url = await s3.getSignedUrlPromise('getObject', params);
      console.log('Object URL:', url);
      return url;
    } catch (error) {
      console.error('Error retrieving object URL:', error);
      return null;
    }
  };
  
  getObjectUrl();

  return (
    <>
    <div className='detail-container'>
      <div style={{"background": `url(${beat.coverArt}) no-repeat center center`, "WebkitBackgroundSize": "cover"}} className="detail-card">
      {/* <p>Name: {beat.name}</p> */}
        <button
          className={`play-pause-button ${isPlaying ? "playing" : "paused"}`}
          onClick={handleTogglePlay}
          >
          {isPlaying ? "Pause" : "Play"}
      <h1 className='title'>{beat.name}</h1>
        </button>
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
            <p>Name: {beat.name}</p>
            <p>Genre: {beat.genre}</p>
            <p>Tempo: {beat.tempo}</p>
            <p>Key: {beat.key}</p>
            <p>Price: {beat.price}</p>
            <p>Category: {beat.category}</p>
        <p>Description: {beat.description}</p>
      </div>
      <audio
        ref={audioRef}
        src={beat.url}
        onTimeUpdate={handleTimeUpdate}
        ></audio>
      <audio ref={audioRef} src={beat.url}></audio>
      <audio ref={audioRef} src={beat.url}></audio>


      

      {user && <NewOrderPage beat={beat} />}

    </>
  );
}