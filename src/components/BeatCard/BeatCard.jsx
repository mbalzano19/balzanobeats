import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom"
import BeatDetail from "../BeatDetail/BeatDetail"
import './BeatCard.css'
import AWS from 'aws-sdk'

export default function BeatCard({ beat, name, artist, tempo, songKey, description, price, category, id, url, coverArt}) {
    // console.log('BEATCARD ID', id)
    const [image, setImage] = useState('')

useEffect(() => {
    if (!beat) return

    const getImageUrl = async () => {
      try {
        const s3 = new AWS.S3({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            region: process.env.REACT_APP_AWS_REGION,
        })

        const bucketName = 'balzanobeats'
        const key = beat.coverArt

        const params = {
          Bucket: bucketName,
          Key: key,
          Expires: 3600,
        }

        const image = await s3.getSignedUrlPromise('getObject', params)
        setImage(image)
      } catch (error) {
        console.error('Error retrieving object URL:', error)
      }
    }

    getImageUrl()
  }, [beat])

//   console.log('IMAGE IN BEAT CARD', image)

return (
    <div className="card shadow  card-containers" key={id}>
        <div
            className="beat-card"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
        <div >
            <p className="card-title">{name}</p>
            <p className="card-text">{artist}</p>
            <Link to={{ pathname: `/beats/${id}`, state: { genre: 'genre' } }} className="card-details">View Beat</Link>
        </div>
        </div>
    </div>
)
}

