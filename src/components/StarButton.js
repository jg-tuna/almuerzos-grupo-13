import { fetchRating } from '../utils/ratingFetch';
import { useEffect, useState } from "react";
import useAuth from '../hooks/useAuth';

const StarButton = (props) => {

  const [rating, setRating] = useState();
  const { currentUser } = useAuth();


  useEffect(() => {
    async function fetchData() {
    const ratingData = await fetchRating(setRating, props.currentUserId, props.RestaurantId, currentUser);
    }
    fetchData();
  }, [rating])

  const submitRating = async (value) => {
    console.log("valor nuevo rating")
    console.log(value)
    console.log("valor rating antiguo")
    console.log(rating)
    if (!rating) {
      console.log("no encuentra rating")
      await fetch('https://almuerzos-grupo-13-backend.herokuapp.com/ratings/',{
      method : 'POST', 
      body : JSON.stringify({
        value: value,
        UserId : props.currentUserId,
        RestaurantId : props.RestaurantId
      }),
      headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }}
      )
      .then((data) => setRating(data.value))
      .then(window.location.reload())
    }
    else {
      console.log("detecta rating")
      await fetch('https://almuerzos-grupo-13-backend.herokuapp.com/ratings/',{
        method : 'PUT', 
        body : JSON.stringify({
          value: value,
          UserId : props.currentUserId,
          RestaurantId : props.RestaurantId
        }),
        headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }}
        )
        .then((data) => setRating(data.value))
        .then(window.location.reload())
    }
  } 

  return(
    <>
    <button onClick={() => submitRating(props.rating)}
      className="mx-1 bg-transparent text-gray-400 font-bold py-0.5 px-3 border border-gray-400 rounded">
        {props.rating} 
    </button>
    </>
  )
}

export default StarButton