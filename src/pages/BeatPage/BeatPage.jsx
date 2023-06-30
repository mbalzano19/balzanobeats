import { useState, useEffect, useRef } from 'react'
import { checkToken } from '../../utilities/users-service'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as beatsAPI from '../../utilities/beats-api';
import * as categoriesAPI from '../../utilities/categories-api';
import BeatDetail from '../../components/BeatDetail/BeatDetail';
import './BeatPage.css';
import BeatCard from '../../components/BeatCard/BeatCard';
import NewOrderPage from '../App/NewOrderPage/NewOrderPage';


export default function BeatPage({ user }) {
  // console.log('beatpage prop', user)

  const [beats, setBeats] = useState([]);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const categoriesRef = useRef([]);



  useEffect(() => {
      const fetchBeats = async () => {
        try {
          const response = await beatsAPI.getAll(user._id)
          // console.log('respnse', response)
          setBeats(response)

          // const categoryIds = [...new Set(response.map((beat) => beat.category))]
          // console.log('catIDS', categoryIds)

          // const categoryResponse = await categoriesAPI.getAll(categoryIds)
          // setCategories(categoryResponse)
          // console.log('CATRESPONSE', categoryResponse)




          // console.log('response.category', response[0].name)

          // const catResponse = await beatsAPI.getAll(user._id)
          // console.log('catResponse', catResponse)
          // const categories = await beatsAPI.getAll();
          // categoriesRef.current = [...new Set(categories.map(category => category.category.name))];
          // setCategories(categoriesRef.current[0])

          // console.log('catResponseCATCATCAT', catResponse[0].category)
          // const firstCat = catResponse[0].category
          // const CatCat = response.findOne({name : firstCat})
          // console.log("CAAAAT", CatCat)

          // const categoryIds = response.map((beat) => beat.category)

          // const categoryResponse = await categoriesAPI.getCategoriesByIds(categoryIds)
          
          // // setCategories(categoryResponse)
          // console.log('categoryResponse', categoryResponse)
          // const data = await response.json();

          // setBeats(data);


        } catch (error) {
          console.error('Error fetching beats:', error);
        }
      };
    
      fetchBeats();
  }, [user]);

  // const getCategoryName = (categoryId) => {
  //   const category = categories.find((cat) => cat._id === categoryId);
  //   return category ? category.name : '';
  // };

  // function getCategoryName(response) {
  //   for (let i=0; i < beats.length; i++) {
  //     console.log(response[i].category)
  //     // console.log('for loop', response[i].category)
  //   }
  // }

  // function getCategoryName(response) {
  //   response.forEach((item) => {
  //     console.log(item.category);
  //   });
  // }

console.log('beats in BeatPage', beats)
  
//   return (
//     <>
//       <h1>Beats</h1>
//       <div>
//         {beats.length === 0 ? (
//           <p>Loading beats...</p>
//         ) : (
          

//           // <div className="card-container">
//           //   {beats.map((beat, index) => (
//           //     <div className="card" key={beat._id}>
//           //       <p className="card-title">{beat.name}</p>
//           //       <p className="card-info">{beat.genre}</p>
//           //       <p className="card-info">{beat.tempo}</p>
//           //       <p className="card-info">{beat.key}</p>
//           //       <p className="card-info">{beat.description}</p>
//           //       <p className="card-info">{beat.price}</p>
//           //       <p className="card-info">Category: {beat.category}</p>
//                 {/* <Link
//                     to={{
//                       pathname: `/beats/details/${beat._id}`,
//                       // state: { beat: beat, user: user }
//                     }}
//                     className="button btn-sm"
//                   >
//                     View
//                   </Link> */}
//                   // <BeatDetailPage beats={beats}/>
//               </div>
//             // ))}
//           // </div>
//         // )}
//         <BeatCard beats={beats}/>
//       </div>
//     </>
//   );
// }

  return (
    <>
      <h1>Beats</h1>


        {/* <BeatCard beats={beats}/> */}
        {/* <BeatDetail beats={beats} /> */}

          {/* <NewOrderPage beats={beats}/> */}

        {/* <Link to={`/beat/${id}`} state={{ beats: "beats" }}> */}
        <div className='card-container'>
          {beats.map((beat) => 
            <BeatCard
                id={beat._id}
                name={beat.name}
                genre={beat.genre}
                tempo={beat.tempo}
                songKey={beat.key}
                description={beat.description}
                url={beat.url}
                price={beat.price}
                category={beat.category.name}
                coverArt={beat.coverArt}
                
            />
            )}
        </div>


        {/* </Link> */}
            {/* <BeatDetail beats={beats}/> */}

    </>
  );
}

// <p className="card-title">{beat.name}</p>
// <p className="card-info">{beat.genre}</p>
// <p className="card-info">{beat.tempo}</p>
// <p className="card-info">{beat.key}</p>
// <p className="card-info">{beat.description}</p>
// <p className="card-info">{beat.price}</p>
// <p className="card-info">Category: {beat.category}</p>
// <a href={`/beats/details/${beat._id}`}>Details</a>
  