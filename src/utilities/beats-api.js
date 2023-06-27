import sendRequest from "./send-request"
// we need a base path that we can use to refer our requests to the location of our routes
const BASE_URL = '/api/beats'

export async function createBeat(beatData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', beatData)
}

export async function getAll() {
    return sendRequest(BASE_URL);
  }

// export async function show(req, res) {
//     const beat = await Beat.findById(req.params.id);
//     res.json(beat);
//   }

  export async function show() {
    return sendRequest(`${BASE_URL}/id`)
  }



//   export async function getById(id) {
//     try {
//       const response = await fetch(`${BASE_URL}/${id}`);
//       console.log('resonse in api', response)
//       if (!response.ok) {
//         throw new Error('Failed to fetch beat');
//       }
//       const beat = await response.json();
//       console.log('beat in api', beat)
//       return beat;
//     } catch (error) {
//       console.error('Error fetching beat:', error);
//       throw error;
//     }
//   }