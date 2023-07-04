import { useState, useEffect, useRef } from 'react'
import NewBeatForm from "../../components/NewBeatForm/NewBeatForm"
import * as categoriesAPI from '../../utilities/categories-api'

export default function NewBeatPage(props) {
  const categoriesRef = useRef([])

    return (
      <>
      <h1>Add Beat: </h1>
      <NewBeatForm />
      </>
    )
    }