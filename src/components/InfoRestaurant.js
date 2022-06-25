import RatingLabel from "./RatingLabel";
const InfoRestaurant = (props) => {
  return (
    <>
    <div className="mx-2 justify-between">
      <h2 className="text-gray-2000 font-semibold capitalize">{props.name}</h2>
    </div>
    <div className="m-2 justify-between">
      <h4 className="text-gray-700 font-big">{props.details}</h4>
      <h5 className="text-gray-400 font-big capitalize">{props.category}</h5>
      <h5 className="text-gray-400 font-big">Contacto {props.contact}</h5>
      <h5 className="text-gray-400 font-big">Valoración {<RatingLabel key={props.name} rating={props.stars}/>}</h5>
    </div>
    </>
  );
};

export default InfoRestaurant