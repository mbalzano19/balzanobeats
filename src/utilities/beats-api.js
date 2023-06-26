import sendRequest from "./send-request"
// we need a base path that we can use to refer our requests to the location of our routes
const BASE_URL = '/api/beats'

export async function createBeat(beatData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', beatData)
}

export async function getAll() {
    return sendRequest(BASE_URL);
  }