

const fetchRating = (setRating, userId, restaurantId, currentUser) => {
  // console.log("-------------")
  // console.log("función fetchRating")
  // console.log(`userid : ${userId}`);
  // console.log(`restaurantid : ${restaurantId}`)
  if (!currentUser) {
    return 
  }
  fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/ratings/${restaurantId}`, {
    method: 'GET', 
    headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' },})
    .then((response) => response.json())
    .then((data) => {
      //setIsLoading(false);
      if (data) {
      // console.log("La data de fetchRating es");
      // console.log(data);
      // console.log(data.value);
      // console.log("-------------");//aca se puede generar problemas si es q data es null
      setRating(data.value);}
      else{
        //console.log("No había un rating para este usuario y este restaurante")
      }
    })
    .catch((error) => {
      //setIsError(true);
      //setIsLoading(false);
      console.log(error);
    })
}

const fetchRatingId = (setRatingId, userId, restaurantId, currentUser) => {
  // console.log("-------------")
  // console.log("función fetchRating")
  // console.log(`userid : ${userId}`);
  // console.log(`restaurantid : ${restaurantId}`)
  if (!currentUser) {
    return
  }
  fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/ratings/${restaurantId}`, {
    method: 'GET', 
    headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' },})
    .then((response) => response.json())
    .then((data) => {
      //setIsLoading(false);
      if (data) {
      // console.log("La data de fetchRating es");
      // console.log(data);
      // console.log(data.value);
      // console.log("-------------");//aca se puede generar problemas si es q data es null
      setRatingId(data.id);}
      else{
        //console.log("No había un rating para este usuario y este restaurante")
      }
    })
    .catch((error) => {
      //setIsError(true);
      //setIsLoading(false);
      console.log(error);
    })
}

const fetchRatings = (setMeanRating, userId, restaurantId, currentUser) => {
  // console.log("-------------")
  // console.log("función fetchRating")
  // console.log(`userid : ${userId}`);
  // console.log(`restaurantid : ${restaurantId}`)
  if (!currentUser) {
    return
  }
  fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/ratings/${restaurantId}/all`, {
    method: 'GET', 
    headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' },})
    .then((response) => response.json())
    .then((data) => {
      //setIsLoading(false);
      if (data) {
      // console.log("La data de fetchRating es");
      // console.log(data);
      // console.log(data.value);
      // console.log("-------------");//aca se puede generar problemas si es q data es null
      //console.log(`el promedio de ratings es ${data}`)
      setMeanRating(parseFloat(data).toFixed(1));}
      else{
        //console.log("No había ratings para este restaurante")
      }
    })
    .catch((error) => {
      //setIsError(true);
      //setIsLoading(false);
      console.log(error);
    })
}

export { fetchRating, fetchRatingId, fetchRatings };