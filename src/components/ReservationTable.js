import { useEffect, useState } from "react";

import { fetchReservations } from "../utils/reservationFetch";

const ReservationTable = ({currentUser, ownerId, localId}) => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(()=>{
    if(currentUser){
      if(currentUser.id === parseInt(ownerId))
        fetchReservations(setIsLoading, setIsError, localId, setReservations, currentUser)
    }
  },[currentUser, localId, ownerId])


  const buttonHandle = (id, ready, accepted) => {
    fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/reservations/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${currentUser?.token}`,
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        ready: ready,
        accepted: accepted
      })
    }).then(()=>{
      setIsUpdate(true)
      setIsLoading(true)
    });
  }

  useEffect(()=>{
    if(isUpdate){
      setIsUpdate(false)
      fetchReservations(setIsLoading, setIsError, localId, setReservations, currentUser)
    }
  }, [isUpdate, currentUser, localId])

  const reservation = () => { 
    return reservations || []
  }

  const acceptedValue = (reservation) => {
    if(reservation.accepted=== null)
      return(<td className="flex py-4 justify-evenly">
        <button onClick={()=> buttonHandle(reservation.id, false, true)} className="hover:text-blue-700 text-blue-500 mx-5">Aceptar</button>
        <button onClick={()=> buttonHandle(reservation.id, false, false)} className="hover:text-blue-700 text-blue-500 mx-5">Rechazar</button>
        </td>)
    else if(reservation.accepted)
      return(<td className="flex py-4 justify-center">
        <button onClick={()=> buttonHandle(reservation.id, true, true)} className="hover:text-blue-700 text-blue-500 mx-3">Terminar el pedido</button>
        </td>)
  }

  if(currentUser){
    if(currentUser.id !== parseInt(ownerId))
      return
  }
  // Mensaje cuando esta cargando los datos
  if (isLoading) return <div>Cargando...</div>
  // Mensaje si hubo un error al cargar
  else if (isError) return <div>Hubo un error :c</div>

  if(currentUser){
    if(currentUser.id !== parseInt(ownerId))
      return
  }

  return (
    <div className="justify-center flex flex-col m-5">
      <h3 className="mx-2 my-5 text-gray-2000 font-medium">Reservas</h3>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs bg-red-500 capitalize bg-red-700 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">Cliente</th>
            <th scope="col" className="px-6 py-3">Comida</th>
            <th scope="col" className="px-6 py-3" >Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservation && reservation().map((val, key) => (
              <tr key={key}>
                <td className="px-6 py-4 font-bold">{val.User.firstName + " " + val.User.lastName}</td>
                <td className="px-6 py-4">{val.Food.name}</td>
                {acceptedValue(val)}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable