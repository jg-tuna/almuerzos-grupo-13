import RatingLabel from "./RatingLabel";
import imagen from "../no-imagen.png"
import { NavLink } from "react-router-dom";

const Comment = (props) => {
  const getImage = () => {
    return (props.img) ? props.img : imagen;
  }

  const date = props.date.toString()
  const year = date.slice(0,4)
  const month = date.slice(5,7)
  const day = date.slice(8,10)

  const deleteReview = async (id) => {
    await fetch(`/reviews/${id}`, { method: "DELETE", Authorization: `Bearer ${props.userToken}` })
      .then(window.location.reload())
  }
  return (
    <>
    <div className="flex flex-col my-3 bg-gray-100 rounded">
      <div className="m-6">
        <div className="flex justify-start items-center flex-row">
          <div className="max-h-10 max-w-10 aspect-w-1 aspect-h-1 rounded-full overflow-hidden border">
            <img src={getImage()} alt={props.alt} className="max-h-10 max-w-10 object-scale-down object-center object-contain object-cover lg:w-full lg:h-full" />
          </div>
          <div>
            <h6 className="mx-3 text-gray-600 font-semibold">{props.username} {props.lastname}</h6>
          </div>
        </div>
        <div className="my-3 flex flex-row">
          <div>
            {<RatingLabel key={props.username} rating={parseFloat(props.rating).toFixed(1)}/>}
          </div>
          <div>
            <h6 className="mx-3 text-gray-400">Reseña escrita el {day}/{month}/{year}</h6>
          </div>
        </div>
        <div>
          <p>{props.content}</p>
        </div>
        {props.currentUserId === props.userid &&
          <div className="flex flex-row mx-8 my-6 space-x-20">
            <NavLink to={`/reviews/${props.id}`} className="text-gray">
              Editar
            </NavLink>
            <button onClick={() => deleteReview(props.id)} className="text-gray">
              Eliminar
            </button>
          </div>
        }
      </div>
    </div>
    </>
  )
}

export default Comment