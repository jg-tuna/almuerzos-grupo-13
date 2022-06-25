const fetchFoods = (setIsLoading, setIsError, id, setFoods) => {
  fetch(`/restaurants/${id}/foods`)
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