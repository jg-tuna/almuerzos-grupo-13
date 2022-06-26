import requestOptions from "./requestOptions";

const fetchReservations = (setIsLoading, setIsError, id, setReservation, currentUser) => {
  fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/restaurants/${id}/reservations`, requestOptions('GET', currentUser))
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      setReservation(data);
    })
    .catch((error) => {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    })
}

export { fetchReservations };