const RestaurantPictures = (props) => {
  //recibe una lista de imágenes
  return(
    <>
    <div className="flex flex-row space-x-2">
      <div className="min-w-200 w-900 overflow-hidden">
        <img src={props.img_1} alt={props.alt_1} width="1400" className="object-cover w-100" />
      </div> 
      <div className="flex flex-col space-y-2">
        <div className="max-w-20 overflow-hidden">
          <img src={props.img_2} alt={props.alt_2} height="680" className="object-cover"/>
        </div> 
        <div className="overflow-hidden">
          <img src={props.img_3} alt={props.alt_3} height="680" className="object-cover" />
        </div>
      </div>
    </div>
    </>
  )
}

export default RestaurantPictures