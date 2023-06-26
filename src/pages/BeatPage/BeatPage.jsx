import { useState, useEffect, useRef } from 'react'
import { checkToken } from '../../utilities/users-service'
import * as beatsAPI from '../../utilities/beats-api';
import * as categoriesAPI from '../../utilities/categories-api';
import './BeatPage.css';

export default function BeatPage({ user }) {
  // console.log('beatpage prop', user)

  const [beats, setBeats] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoriesRef = useRef([]);



  useEffect(() => {
      const fetchBeats = async () => {
        try {
          const response = await beatsAPI.getAll(user._id)
          // console.log('respnse', response)
          setBeats(response)

          const categoryIds = [...new Set(response.map((beat) => beat.category))]
          console.log('catIDS', categoryIds)

          const categoryResponse = await categoriesAPI.getAll(categoryIds)
          setCategories(categoryResponse)
          console.log('CATRESPONSE', categoryResponse)




          // console.log('response.category', response[0].name)

          // const catResponse = await beatsAPI.getAll(user._id)
          // console.log('catResponse', catResponse)
          // const categories = await beatsAPI.getAll();
          // categoriesRef.current = [...new Set(categories.map(category => category.category.name))];
          // setCategories(categoriesRef.current[0])

          // console.log('catResponseCATCATCAT', catResponse[0].category)
          // const firstCat = catResponse[0].category
          // const CatCat = response.findOne({name : firstCat})
          // console.log("CAAAAT", CatCat)

          // const categoryIds = response.map((beat) => beat.category)

          // const categoryResponse = await categoriesAPI.getCategoriesByIds(categoryIds)
          
          // // setCategories(categoryResponse)
          // console.log('categoryResponse', categoryResponse)
          // const data = await response.json();

          // setBeats(data);


        } catch (error) {
          console.error('Error fetching beats:', error);
        }
      };
    
      fetchBeats();
  }, [user]);

  // const getCategoryName = (categoryId) => {
  //   const category = categories.find((cat) => cat._id === categoryId);
  //   return category ? category.name : '';
  // };

  // function getCategoryName(response) {
  //   for (let i=0; i < beats.length; i++) {
  //     console.log(response[i].category)
  //     // console.log('for loop', response[i].category)
  //   }
  // }

  // function getCategoryName(response) {
  //   response.forEach((item) => {
  //     console.log(item.category);
  //   });
  // }


  
  return (
    <>
      <h1>BeatsBOI</h1>
      <div>
        {beats.length === 0 ? (
          <p>Loading beats...</p>
        ) : (
          <div className="card-container">
            {beats.map((beat, index) => (
              <div className="card" key={index}>
                <p className="card-title">{beat.name}</p>
                <p className="card-info">{beat.genre}</p>
                <p className="card-info">{beat.tempo}</p>
                <p className="card-info">{beat.key}</p>
                <p className="card-info">{beat.description}</p>
                <p className="card-info">{beat.price}</p>
                <p className="card-info">Category: {beat.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
  