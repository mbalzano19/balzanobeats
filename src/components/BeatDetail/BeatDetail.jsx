import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as beatsAPI from '../../utilities/beats-api';
import AWS from 'aws-sdk';
import NewOrderPage from '../../pages/NewOrderPage/NewOrderPage';
import './BeatDetail.css';


export default function BeatDetail({ user }) {
  const { id } = useParams();
  const [beat, setBeat] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const audioRef = useRef(null);
  const location = useLocation();

  const handleTogglePlay = () => {
    const audioElement = audioRef.current;
    if (!audioElement || !url) return;

    if (audioElement.paused) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Play promise error:', error);
          });
      }
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
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    audioRef.current.currentTime = seekTime;
  };

  useEffect(() => {
    const fetchBeat = async () => {
      try {
        const response = await beatsAPI.getAll(id);
        const beatArray = response.find((beat) => beat._id === id);
        const setBeatWithCategory = {
          ...beatArray,
          category: beatArray.category.name,
        };
        setBeat(setBeatWithCategory);
      } catch (error) {
        console.error('Error fetching beat:', error);
      }
    };

    fetchBeat();
  }, [id]);

  useEffect(() => {
    if (!beat) return;

    const getObjectUrl = async () => {
      try {
        const s3 = new AWS.S3({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            region: process.env.REACT_APP_AWS_REGION,
        });

        const bucketName = 'balzanobeats';
        const key = beat.url;

        const params = {
          Bucket: bucketName,
          Key: key,
          Expires: 3600,
        };

        const url = await s3.getSignedUrlPromise('getObject', params);
        setUrl(url);
      } catch (error) {
        console.error('Error retrieving object URL:', error);
      }
    };

    getObjectUrl();
  }, [beat]);

  useEffect(() => {
    if (!beat) return;

    const getImageUrl = async () => {
      try {
        const s3 = new AWS.S3({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            region: process.env.REACT_APP_AWS_REGION,
        });

        const bucketName = 'balzanobeats';
        const key = beat.coverArt;

        const params = {
          Bucket: bucketName,
          Key: key,
          Expires: 3600,
        };

        const image = await s3.getSignedUrlPromise('getObject', params);
        setImage(image);
      } catch (error) {
        console.error('Error retrieving object URL:', error);
      }
    };

    getImageUrl();
  }, [beat]);

  console.log('IMAGE URL', image)

  if (!beat) {
    return <p>Loading...</p>;
  }

  console.log('beat.url', beat.url)

  return (
    <>
    <div className='detail-container'>
      <div
        className="detail-card"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
        src={url} 
        onTimeUpdate={handleTimeUpdate}
        ></audio>



      

      {user && <NewOrderPage beat={beat} />}

    </>
  );
}