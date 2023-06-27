import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import * as beatsAPI from '../../utilities/beats-api';
import * as categoriesAPI from '../../utilities/categories-api';

export default function BeatDetail({user}) {

//     useEffect(() => {
//         const fetchBeats = async () => {
//           try {
//             const response = await beatsAPI.getAll(user._id)
//             // console.log('respnse', response)
//             setBeats(response)
  
//             const categoryIds = [...new Set(response.map((beat) => beat.category))]
//             console.log('catIDS', categoryIds)
  
//             const categoryResponse = await categoriesAPI.getAll(categoryIds)
//             setCategories(categoryResponse)
//             console.log('CATRESPONSE', categoryResponse)
  

  
  
//           } catch (error) {
//             console.error('Error fetching beats:', error);
//           }
//         };
      
//         fetchBeats();
//     }, [user]);
    console.log('BDP PROPS', )
  const { id } = useParams();
  console.log('id in BDP', id)

  return (
    <>
    <h1>Beat Detail Page for ID: {id}</h1>

    </>
  );
}
