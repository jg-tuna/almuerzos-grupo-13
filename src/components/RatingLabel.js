const RatingLabel = (props) => {
  return(
    <>
    <span className="text-xs font-bold inline-block py-1 px-3 uppercase rounded text-white bg-green-800 uppercase last:mr-0 mr-1">
      {props.rating}
    </span>
    </>
  )
}

export default RatingLabel