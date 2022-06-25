const fetchReviews = (setReviews, localId, currentUser) => {
  if (!currentUser){
    return
  }
  fetch(`/reviews/${localId}/all`)
    .then((response) => response.json())
    .then((data) => {
      //setIsLoading(false);
      //console.log("data de reviews")
      //console.log(data)
      setReviews(data);
    })
    .catch((error) => {
      //setIsError(true);
      //setIsLoading(false);
      console.log(error);
    })
}

export { fetchReviews };