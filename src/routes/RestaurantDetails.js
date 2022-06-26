
import { useParams, Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoRestaurant from "../components/InfoRestaurant";
import FoodCard from "../components/FoodCard";
import StarButton from "../components/StarButton";
import Comment from "../components/Comment";
import ReservationTable from "../components/ReservationTable";
import RestaurantPictures from "../components/RestaurantPictures";

import { fetchLocal } from '../utils/restaurantsFetch';
import { fetchFoods } from '../utils/foodFetch';
import { fetchRating, fetchRatings } from '../utils/ratingFetch';
import { fetchReviews } from '../utils/reviewsFetch';
import useAuth from '../hooks/useAuth';


const ResturantDetails = (props) => {
  const [local, setLocal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  //const stringUser = localStorage.getItem('user');
  const [foods, setFoods] = useState([]);
  //const user = JSON.parse(stringUser);
  const [rating, setRating] = useState();

  const [reviews, setReviews] = useState();

  const [meanRating, setMeanRating] = useState();

  const params = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    fetchLocal(setIsLoading, setIsError, params.id, setLocal)
    fetchFoods(setIsLoading, setIsError, params.id, setFoods)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    fetchRatings(setMeanRating, currentUser?.id, params.id, currentUser)
    fetchReviews(setReviews, params.id, currentUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating])


  const food = () => {
    return foods || [];
  };

  const comments = () => {
    return reviews || [];
  };

  

  const addFav = async (e) => {
    e.preventDefault();
    // console.log('funciona');
    // let aux = JSON.stringify({UserId: user.id});
    await fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/restaurants/${params.id}/favorite`, {
      method: 'POST',
      body: JSON.stringify({UserId: currentUser?.id}),
      headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }
    })
    navigate('/');
  }

  const removeFav = async (e) => {
    e.preventDefault();
    // console.log('funciona');
    // let aux = JSON.stringify({UserId: user.id});
    await fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/restaurants/${params.id}/favorite`, {
      method: 'DELETE',
      body: JSON.stringify({UserId: currentUser.id}),
      headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }
    })
    navigate('/');
  }

  useEffect(() => {
    async function fetchData() {
    const ratingData = await fetchRating(setRating, currentUser?.id, params.id, currentUser);
    }
    fetchData();
  }, [rating])

  const submitRating = async (value) => {
    // console.log("valor nuevo rating")
    // console.log(value)
    // console.log("valor rating antiguo")
    // console.log(rating)
    // e.preventDefault();
    if (!rating) {
      console.log("no encuentra rating")
      await fetch('https://almuerzos-grupo-13-backend.herokuapp.com/ratings/',{
      method : 'POST', 
      body : JSON.stringify({
        value: value,
        UserId : currentUser?.id,
        RestaurantId : local.id
      }),
      headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }}
      )
      .then((data) => setRating(data.value))
      // .then(window.location.reload())
    }
    else {
      // console.log("detecta rating")
      await fetch('https://almuerzos-grupo-13-backend.herokuapp.com/ratings/',{
        method : 'PUT', 
        body : JSON.stringify({
          value: value,
          UserId : currentUser?.id,
          RestaurantId : local.id
        }),
        headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }}
        )
        .then((data) => setRating(data.value))
        // .then(window.location.reload())
    }
    // window.location.reload();
  }

  const deleteRestaurant = async (id) => {
    await fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/restaurants/${id}`, { method: "DELETE", 
    headers : {Authorization: `Bearer ${props.userToken}` }})
      .then(navigate("/"))
  }


  if (isLoading) return <div>Cargando...</div>
  else if (isError && currentUser) return <div>Hubo un error :c</div>
  else if (!currentUser){
    navigate("/login");
  }

  return (
    <div className="mx-20 justify-center flex flex-col p-0">
      <div className="mx-5 my-3">
        {
          local.img_1 &&
          <RestaurantPictures key={local.id} img_1={local.img_1}
            img_2={local.img_2} img_3={local.img_3} alt_1={local.alt_1}
            alt_2={local.alt_2} alt_3={local.alt_3} />
        }
      </div>
      <div className="mx-5">
        <InfoRestaurant key={local.id} id={local.id} name={local.name} category={local.category}
          details={local.details} img={local.img} favorite={local.favorite} stars={meanRating}
          lvl_price={local.lvl_price} contact={local.contact} />
            
        {currentUser?.id !== parseInt(local.UserId) && rating &&
        <Link to={`/restaurants/${local.id}/newreview`}>
          <button className="bg-red-500 hover:bg-red-700 mx-2 my-1 text-white font-semibold py-1 px-4 rounded border border-red-500">
            Escribir comentario
          </button>
        </Link>
        }
        {currentUser?.id !== parseInt(local.UserId) && currentUser &&
        <button onClick={addFav} className="bg-transparent mx-2 my-1 text-gray font-semibold py-1 px-4 rounded border border-gray-500">
          Guardar en favoritos
        </button>
        }
        {currentUser?.id !== parseInt(local.UserId) && currentUser &&
        <button onClick={removeFav} className="bg-transparent mx-2 my-1 text-gray font-semibold py-1 px-4 rounded border border-gray-500">
          Sacar de favoritos
        </button>
        }
        {currentUser?.id === parseInt(local.UserId) &&
        <Link to={`/restaurants/edit/${params.id}`}>
          <button className="bg-transparent mx-2 my-1 text-gray font-semibold py-1 px-4 rounded border border-gray-500">
          Editar
          </button>
        </Link>
        }
        {currentUser?.id === parseInt(local.UserId) &&
          <button onClick={() => deleteRestaurant(params.id)} className="bg-transparent mx-2 my-1 text-gray font-semibold py-1 px-4 rounded border border-gray-500">
          Eliminar restaurante
          </button>
        }
      </div>
      <div>
        <ReservationTable currentUser={currentUser} ownerId={local.UserId} localId={params.id}/>
      </div>
      <div className="mx-5">
        <div className="my-5">
          <h3 className="mx-2 my-5 text-gray-2000 font-medium">Sobre este lugar</h3>
          <h4 className="mx-2 my-5 text-gray-500 font-medium">Menú</h4>
          <div className="mx-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {food &&
              food().map((food) => (
                <FoodCard key={food.id} id={food.id} name={food.name} description={food.description}
                  price={food.price} RestaurantId={local.id} RestaurantOwnerId={local.UserId}
                  currentUserId={currentUser?.id} userToken={currentUser?.token}/>
              ))
            }
          </div>
            {currentUser?.id === parseInt(local.UserId) &&
              <div className="mx-20 my-8">
                <NavLink to={`/restaurants/${local.id}/newfood`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded">
                  Agrega un nuevo plato
                </NavLink>
              </div>
            }
        </div>

        {currentUser && currentUser?.id !== parseInt(local.UserId) &&
        <div className="my-7">
          <h4 className="mx-2 my-5 text-gray-500 font-medium">Califica tu experiencia</h4>
          <div className="flex flex-row mx-1">
            <button onClick={() => submitRating(1)}
            className="mx-1 bg-transparent text-gray-400 font-bold py-0.5 px-3 border border-gray-400 rounded">
              1
            </button>
            <button onClick={() => submitRating(2)}
            className="mx-1 bg-transparent text-gray-400 font-bold py-0.5 px-3 border border-gray-400 rounded">
              2
            </button>
            <button onClick={() => submitRating(3)}
            className="mx-1 bg-transparent text-gray-400 font-bold py-0.5 px-3 border border-gray-400 rounded">
              3
            </button>
            <button onClick={() => submitRating(4)}
            className="mx-1 bg-transparent text-gray-400 font-bold py-0.5 px-3 border border-gray-400 rounded">
              4
            </button>
            <button onClick={() => submitRating(5)}
            className="mx-1 bg-transparent text-gray-400 font-bold py-0.5 px-3 border border-gray-400 rounded">
              5
            </button>
          </div>
          {rating &&
            <div className="mx-2 my-2">
              <h5 className="text-gray-400 font-big">Has calificado a este local con {rating} estrellas</h5>
            </div>
          }
          {!rating &&
            <div className="mx-2 my-2">
              <h5 className="text-gray-400 font-big">Para escribir una reseña debes haber calificado al restaurante</h5>
            </div>
          }
        </div>
        }
        <div className="my-7">
          <h4 className="mx-2 my-5 text-gray-500 font-medium">Comentarios</h4>
          <div className="flex flex-col">
            {!reviews &&
            <div className="mx-2 my-2">
              <h5 className="text-gray-400 font-big">Aun no hay comentarios</h5>
            </div>
            }
            {comments &&
              comments().map((comment) => (
                <Comment key={comment.id} id={comment.id} username={comment.User.firstName} 
                  lastname={comment.User.lastName}
                  rating={comment.Rating.value} img={comment.img} content={comment.content} date={comment.createdAt}
                  alt={comment.alt} userid ={comment.User.id} currentUserId={currentUser.id}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResturantDetails