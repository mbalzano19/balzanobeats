import axios from 'axios';
import { useState, useEffect } from 'react';
import * as categoriesAPI from '../../utilities/categories-api';

export default function NewBeatForm() {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    tempo: 0,
    key: '',
    description: '',
    price: 0,
    category: 'Hip Hop',
  });

  const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch the categories from the backend and set them in state
//     axios.get('/api/categories')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch the categories from the backend and set them in state
//     axios.get('/api/categories')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
// console.log('formdata before try', formData)
  async function addBeat(evt) {
    evt.preventDefault();

    try {
      const response = await axios.post('/api/beats/new', formData);
    //   console.log('form data', formData)
    //   console.log('Beat added:', response.data);
      // Reset the form
      setFormData({
        name: '',
        genre: '',
        tempo: 0,
        key: '',
        description: '',
        price: 0,
        category: 'Hip Hop',
      });
    } catch (error) {
      console.error('Error adding beat:', error);

    }
  }
  


    return(
        <>
        <h1>hey</h1>
        <div>
        <div className="form-container">
            <form autoComplete="off" onSubmit={addBeat} >
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                <label>Genre</label>
                <input type="text" name="genre" value={formData.genre} onChange={handleInputChange}  required />
                <label>Tempo</label>
                <input type="number" name="tempo" value={formData.tempo} onChange={handleInputChange} required />
                <label>Key</label>
                <input type="text" name="key" value={formData.key} onChange={handleInputChange} required />
                <label>Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                {/* <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required /> */}
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

