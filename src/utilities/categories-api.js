import axios from 'axios';
import sendRequest from "./send-request";

const BASE_URL = '/api/beat';


export async function getCategoriesByIds(categoryIds) {
  try {
    const response = await axios.get(`${BASE_URL}/categories?ids=${categoryIds.join(',')}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
    return sendRequest(`${BASE_URL}/categories`);
}

export async function getAll() {
  return sendRequest(BASE_URL);
}

// This function is never actually used in SEI CAFE,
// it's only provided here to remind you to follow
// RESTful routing, etc.
export async function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}