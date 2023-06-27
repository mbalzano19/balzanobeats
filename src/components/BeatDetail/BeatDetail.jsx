import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as beatsAPI from '../../utilities/beats-api';
import * as categoriesAPI from '../../utilities/categories-api'
import { useLocation } from 'react-router-dom';
import NewOrderPage from '../../pages/App/NewOrderPage/NewOrderPage';


export default function BeatDetail({genre}) {
    console.log("GENRE", genre)
  const { id } = useParams();
  const [beat, setBeat] = useState();

//   let location = useLocation()
//   console.log('uselocation', location.state.genre)

const location = useLocation();
const currentPage = location.pathname;
console.log("CURRENTPAGETHINGBEAAAAT", currentPage)

  useEffect(() => {
    const fetchBeat = async () => {
      try {
        const response = await beatsAPI.getAll(id);
        const beatArray = response.find(beat => beat._id === id);

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

  return (
    <>
      <h1>{beat.name}</h1>
      {/* <p>Name: {beat.name}</p> */}
      <p>Genre: {beat.genre}</p>
      <p>Tempo: {beat.tempo}</p>
      <p>Key: {beat.key}</p>
      <p>Description: {beat.description}</p>
      <p>Price: {beat.price}</p>
      <p>Category: {beat.category}</p>
      

      <NewOrderPage beat={beat} />
    </>
  );
}