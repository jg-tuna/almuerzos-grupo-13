
const fetchLocals = (setIsLoading, setIsError, setLocals) => {
  fetch("/restaurants")
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      setLocals(data);
    })
    .catch((error) => {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    })
}

const fetchLocal = (setIsLoading, setIsError, id, setLocal) => {
  fetch(`/restaurants/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      setLocal(data);
    })
    .catch((error) => {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    })
}

const fetchFavorites = async (setIsLoading, setIsError, userId, setFavorites) => {
  const currentData = await fetch(`/users/${userId}/favorites`, {
    method: 'GET'
    });
  let info = await currentData.json();
  let array = info.favorites;
  setIsLoading(false);
  setFavorites(array);

  // fetch(`/users/${userId}/favorites`)
  //   .then((response) => response.json())
  //   .then((data) => console.log(data.favorites))
  //   .then((data) => {
  //     setIsLoading(false);
  //     let array = data.favorites;
  //     setFavorites(array);
  //   })
  //   .catch((error) => {
  //     setIsError(true);
  //     setIsLoading(false);
  //     console.log(error);
  //   })
}

export { fetchLocals, fetchLocal, fetchFavorites };