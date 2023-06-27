import { Link } from "react-router-dom"
import BeatDetail from "../BeatDetail/BeatDetail"

export default function BeatCard({name, genre, tempo, songKey, description, price, category, id,}) {
    console.log('BEATCARD ID', id)
    // console.log('beatcard props', beats)
//     return (
//         <div>
//         {beats.length === 0 ? (
//           <p>Loading beats...</p>
//         ) : (
//           <div className="card-container">
//             {beats.map((beat, index) => (
//               <div className="card" key={beat._id}>
//                 <p className="card-title">{beat.name}</p>
//                 <p className="card-info">{beat.genre}</p>
//                 <p className="card-info">{beat.tempo}</p>
//                 <p className="card-info">{beat.key}</p>
//                 <p className="card-info">{beat.description}</p>
//                 <p className="card-info">{beat.price}</p>
//                 <p className="card-info">Category: {beat.category}</p>
//                 <a href={`/beats/details/${beat._id}`}>Details</a>
//                 {/* <BeatDetail beats={beats}/> */}

//               </div>
//             ))}
//           </div>
//         )}
//         </div>
//     )
// }

return (
    <Link to={`${id}`} className="beat-card">

          <div className="card" key={id}>
            <p className="card-title">Name: {name}</p>
            <p className="card-info">Genre: {genre}</p>
            <p className="card-info">Tempo: {tempo}</p>
            <p className="card-info">Key: {songKey}</p>
            <p className="card-info">Description: {description}</p>
            <p className="card-info">Price: {price}</p>
            <p className="card-info">Category: {category}</p>
            <a href={`/beats/${id}`}>Details</a>
          </div>
            {/* <BeatDetail name={name}/> */}


      </Link>
    )}

