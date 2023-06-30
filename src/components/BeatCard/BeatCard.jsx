import { Link } from "react-router-dom"
import BeatDetail from "../BeatDetail/BeatDetail"
import './BeatCard.css';

export default function BeatCard({name, genre, tempo, songKey, description, price, category, id, url, coverArt}) {
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
    <div className="card shadow  card-containers" key={id}>
        <div style={{"background": `url(${coverArt}) no-repeat center center`, "WebkitBackgroundSize": "cover"}} className="beat-card">
            <div >
            <p className="card-title">{name}</p>

            <p className="card-text">{genre}</p>
            <p className="card-text">{tempo} bpm</p>
            <p className="card-text">{songKey}</p>
            {/* <p className="card-info">Description: {description}</p> */}
            {/* <p className="card-info">Price: {price}</p> */}
            {/* <a href={url} className="card-info">Url</a> */}
            <p className="card-text">Category: {category}</p>
            {/* <p className="card-text"><button>Play
                <audio src={url}></audio>
            </button></p> */}
            <Link to={{ pathname: `/beats/${id}`, state: { genre: 'genre' } }} className="card-details">View Beat

            {/* <a href={`/beats/${id}`}>Details</a> */}
            </Link>

            {/* <BeatDetail genre={genre}/> */}
            </div>
    </div>
    </div>



        // <BeatDetail tempo={tempo}/>

    )}

