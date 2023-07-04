import sendRequest from "./send-request"

const BASE_URL = '/api/beats'

export async function createBeat(beatData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', beatData)
}

export async function getAll() {
    return sendRequest(BASE_URL)
  }

  export async function show() {
    return sendRequest(`${BASE_URL}/id`)
  }
