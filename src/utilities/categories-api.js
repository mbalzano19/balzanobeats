import axios from 'axios'
import sendRequest from "./send-request"

const BASE_URL = '/api/beat'


export async function getCategoriesByIds(categoryIds) {
  try {
    const response = await axios.get(`${BASE_URL}/categories?ids=${categoryIds.join(',')}`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
    return sendRequest(`${BASE_URL}/categories`)
}

export async function getAll() {
  return sendRequest(BASE_URL)
}

export async function getById(id) {
    const response = await sendRequest(`${BASE_URL}/${id}`)
    console.log('RUSPONSE', response)
    return response
}