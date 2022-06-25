import { fetchFavorites, fetchLocals } from '../utils/restaurantsFetch';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LocalCard from "../components/LocalCard";
import useAuth from '../hooks/useAuth';

const LandingPage = (props) => {
  const [locals, setLocals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const {currentUser} = useAuth();
  
  // const stringUser = localStorage.getItem('user');
  // const user = JSON.parse(stringUser);
  // const { currentUser } = useAuth();

  const popularLocals = () => { 
    const plocals = locals.filter((local) => {
      return local.stars >= 4;
    });
    return plocals;
  };

  useEffect(()=>{
    fetchLocals(setIsLoading, setIsError, setLocals);
    if (currentUser){
      fetchFavorites(setIsLoading, setIsError, currentUser.id, setFavorites)};
  },[currentUser])

  if (isLoading) return <div>Cargando...</div>
  else if (isError) return <div>Hubo un error :c</div>

  return (
    <div className="justify-center flex flex-col p-0">
      <div className="p-36 bg-cover bg-food">
        <h1 className="text-center m-5 text-white">Almuerzos San Joaquín</h1>
        <h2 className="text-center font-normal text-white">¡Descubre locales donde ir a almorzar en la universidad!</h2>
      </div>
      <div className="m-5 ">
        {currentUser &&
        <div className="mx-20 my-8">
          <NavLink to='/restaurants/new' className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded">
            Agrega tu local
          </NavLink>
        </div>
        }
        <h3 className="m-5 font-semibold"> Los más populares </h3>
        <div className="mx-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {
            popularLocals().map((local) => (
              <LocalCard key={local.id} id={local.id} name={local.name} category={local.category}
                details={local.details} img={local.img} favorite={local.favorite} stars={local.stars} 
                lvl_price={local.lvl_price}/>
            ))
          }
        </div>

        {(currentUser && favorites) &&
        <div>
          <h3 className="m-5 font-semibold"> Tus Favoritos </h3>
          <div className="mx-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {
              favorites.map((local) => (
                <LocalCard key={local.id} id={local.id} name={local.name} category={local.category}
                  details={local.details} img={local.img} stars={local.stars} 
                  />
              ))
            }
          </div>
        </div>
        }
      </div>

      <div className="m-5 ">
        <h3 className="m-5 font-semibold"> Todos los locales </h3>
        <div className="mx-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {
            locals.map((local) => (
              <LocalCard key={local.id} id={local.id} name={local.name} category={local.category}
                details={local.details} img={local.img} favorite={local.favorite} stars={local.stars}
                lvl_price={local.lvl_price}/>
            ))
          }
        </div>
      </div>
    </div>

  );
}

export default LandingPage