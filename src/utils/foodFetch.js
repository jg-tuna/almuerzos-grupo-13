const fetchFoods = (setIsLoading, setIsError, id, setFoods) => {
  fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/restaurants/${id}/foods`)
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      setFoods(data);
    })
    .catch((error) => {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    })
}

export { fetchFoods };