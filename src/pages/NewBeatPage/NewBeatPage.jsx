import { useState, useEffect, useRef } from 'react'
import NewBeatForm from "../../components/NewBeatForm/NewBeatForm";
import * as categoriesAPI from '../../utilities/categories-api';

export default function NewBeatPage(props) {
  const categoriesRef = useRef([]);

//   useEffect(function() {
//     async function getCategories() {
//       const categories = await categoriesAPI.getAll();
//       categoriesRef.current = [...new Set(categories.map(beat => beat.category.name))];
//       // setMenuItems(items);
//       // setActiveCat(categoriesRef.current[0]);
//     }
//     getCategories();
//     console.log(getCategories())
// })
  // console.log('props in newBeatPage', props)
    return (
      <>
      <h1>Add those beats </h1>
      <NewBeatForm />
      </>
    )
    }