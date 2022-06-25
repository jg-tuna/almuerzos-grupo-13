import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import requestOptions from '../utils/requestOptions';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const NotificationPanel = (props) => {
  const bell = <FontAwesomeIcon icon="fa-solid fa-bell" />
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(true);
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetch(`/users/${currentUser.id}/reservations`, requestOptions('GET', currentUser))
        .then((response) => response.json())
        .then((data) => {
          setReservation(data)
          setIsLoading(false);
        })
        .catch((error) => {
          setIsError(true);
          setIsLoading(false);
          console.log(error);
        })
    }
  }, [currentUser])

  const Notification = () => {

    const message = (reservation) => {
      if (reservation.accepted === null)
        return `Su orden de ${reservation.Food.name} en ${reservation.Restaurant.name} se esta procesando`
      else if (!reservation.accepted)
        return `Su orden de ${reservation.Food.name} en ${reservation.Restaurant.name} fue cancelado :c`
      else if (reservation.accepted && !reservation.ready)
        return `Su orden de ${reservation.Food.name} en ${reservation.Restaurant.name} está confirmada`
      else if (reservation.accepted && reservation.ready)
        return `Su orden de ${reservation.Food.name} en ${reservation.Restaurant.name} ya fue entregado`

    }

    return (
      <div onClick={() => { setShow(!show) }} className='bg-red-700 modal-content'>

        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex-1 flex items-center">
              <p className="ml-3 font-medium text-white">
                {reservation && reservation.map((val, key) => (
                  <div key={key}>{message(val)}</div>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }


  if (!currentUser) {
    return
  }
  // Mensaje cuando esta cargando los datos
  if (isLoading) return <div>Cargando...</div>
  // Mensaje si hubo un error al cargar
  else if (isError) return <div>Hubo un error :c</div>
  return (
    <div className='self-center mx-2'>
      <button onClick={() => { setShow(!show) }} className='self-center'>
        {bell}
      </button>
      {!show ? <Notification /> : null}
    </div>
  )
};




export default NotificationPanel;
