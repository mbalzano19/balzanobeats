import axios from 'axios'
import { useState } from 'react'
import AWS from 'aws-sdk'
import './NewBeatForm.css'

export default function NewBeatForm() {
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    tempo: 0,
    key: '',
    description: '',
    price: 0,
    url: '',
    coverArt: '',
    category: 'Hip Hop',
  })
  const [audio, setAudio] = useState()
  const [image, setImage] = useState()

  const [categories, setCategories] = useState([])


  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  
    if (event.target.name === "url") {
      setAudio(event.target.files[0])
    }
  
    if (event.target.name === "coverArt") {
      setImage(event.target.files[0])
    }
  }

  async function addBeat(evt) {
    evt.preventDefault()

    try {
        AWS.config.update({
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
          region: process.env.REACT_APP_AWS_REGION,
        })
  
        const s3 = new AWS.S3()
        const bucketName = 'balzanobeats'
        const audioFile = formData.url
        const imageFile = formData.coverArt
  
        const audioKey = `beats/${audioFile}`
        const newAudioKey = audioKey.replace("C:\\fakepath\\", "")
        await s3
          .upload({
            Bucket: bucketName,
            Key: newAudioKey,
            Body: audio,
            ACL: 'public-read',
          })
          .promise()
  
        const imageKey = `cover-art/${imageFile}`
        const newImageKey = imageKey.replace("C:\\fakepath\\", "")
        await s3
          .upload({
            Bucket: bucketName,
            Key: newImageKey,
            Body: image,
            ACL: 'public-read',
          })
          .promise()

        const beatData = {
          name: formData.name,
          artist: formData.artist,
          tempo: formData.tempo,
          key: formData.key,
          description: formData.description,
          price: formData.price,
          url: newAudioKey,
          coverArt: newImageKey,
          category: formData.category,
        }
  
        const response = await axios.post('https://balzanobeats-api.onrender.com/api/beats/new', beatData)
  
        setFormData({
          name: '',
          artist: '',
          tempo: 0,
          key: '',
          description: '',
          price: 0,
          url: '',
          coverArt: '',
          category: 'Hip Hop',
        })
        setAudio('')
        setImage('')
    } catch (error) {
      console.error('Error adding beat:', error)
    }
  }
  
return(
    <>
    <div>
    <div className="form-container">
        <form autoComplete="off" onSubmit={addBeat} >
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            <label>Artist</label>
            <input type="text" name="artist" value={formData.artist} onChange={handleInputChange}  required />
            <label>Tempo</label>
            <input type="number" name="tempo" value={formData.tempo} onChange={handleInputChange} required />
            <label>Key</label>
            <input type="text" name="key" value={formData.key} onChange={handleInputChange} required />
            <label>Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            <label>Upload beat:</label>
            <input type="file" name="url" value={formData.url} onChange={handleInputChange} required />
            <label>Upload Cover Art:</label>
            <input type="file" name="coverArt" value={formData.coverArt} onChange={handleInputChange} required />
            <label>Category</label>
            <select id="categories" name="category" value={formData.category} onChange={handleInputChange}>
                <option value=''>Hip Hop</option>
                <option value="Trap">Trap</option>
                <option value="RnB">RnB</option>
                <option value="Pop">Pop</option>
                <option value="House">House</option>
                <option value="Dnb">DnB</option>
                <option value="Afro">Afro</option>
                <option value="Ambient">Ambient</option>
            </select>
            <button type="submit">Add Beat</button>
        </form>
    </div>
    <p className="error-message">&nbsp;</p>
</div>
</>
)
}