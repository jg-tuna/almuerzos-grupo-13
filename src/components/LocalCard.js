import { Link } from "react-router-dom";
import imagen from "../no-imagen.png"

const LocalCard = (props) => {
  const getImage = () => {
    return (props.img) ? props.img : imagen;
  }

  const priceFormat = (price) => { 
    let s = ''  
    for (let i = 0; i < price; i++) {
      s += '$';
    }
    return s;
  }

  return (
    <Link to={`local/${props.id}`} key={props.id} id={props.id} className="group relative hover:bg-gray-100 rounded-md transition ease-in-out 
          delay-150 hover:-translate-y-1 hover:scale-105 z-10">
      <div className="w-full min-h-50 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden group-hover:opacity-75 h-40">
        <img src={getImage()} alt={props.alt} className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
      </div>
      <div className="m-2 flex justify-between">
        <div>
          <h3 className="text-gray-700 font-medium text-lg">{props.name}</h3>
          <p className="text-gray-400 text-sm">{priceFormat(props.lvl_price)}</p>
          <p className="text-gray-400 text-sm">{props.category}</p>
        </div>
        <p className="text-gray-400 text-sm">{props.stars}</p>
      </div>
    </Link>
  );
}

export default LocalCard