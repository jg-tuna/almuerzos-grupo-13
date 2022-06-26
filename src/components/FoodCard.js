//import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
//import useAuth from '../hooks/useAuth';

const FoodCard = (props) => {

  const deleteFood = async (id) => {
    await fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/foods/${id}`, { method: "DELETE", Authorization: `Bearer ${props.userToken}` })
      .then(window.location.reload())
  }

  const createReservation = () => {
    const values = {
      RestaurantId: props.RestaurantId,
      UserId: props.currentUserId,
      FoodId: props.id
    }
    
    fetch("https://almuerzos-grupo-13-backend.herokuapp.com/reservations", {
      method:"POST", body: JSON.stringify(values),
      headers: { Authorization: `Bearer ${props.userToken}`, 'Content-Type': 'application/json' }
    })
    return alert("Reserva exitosa. Pronto recibirás una confirmación.")
  }



  return (
    <>
      <div className="m-2 flex flex-col justify-between group relative shadow-lg hover:bg-gray-100 rounded-md transition ease-in-out 
          delay-150 hover:-translate-y-1 hover:scale-105 z-10">
        <div className="mx-10 my-4">
          <h3 className="my-1 text-gray-700 font-medium text-lg">{props.name}</h3>
          <p className="my-2 text-gray-400 text-sm">{props.description}</p>
          <p className="text-gray-400 text-sm">${props.price}</p>
        </div>
        {props.currentUserId === props.RestaurantOwnerId &&
          <div className="flex flex-row mx-8 my-6 space-x-6">
            <NavLink to={`/foods/edit/${props.id}`} className="text-gray">
              Editar
            </NavLink>
            <button onClick={() => deleteFood(props.id)} className="text-gray">
              Eliminar
            </button>
          </div>
        }
        {(props.currentUserId !== props.RestaurantOwnerId) &&
          <div className="flex flex-row mx-8 my-6 space-x-6">
            <button onClick={() => createReservation()} className="text-gray">
              Reservar
            </button>
          </div>
        }
      </div>
    </>
  );
}

export default FoodCard