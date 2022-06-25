import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import requestOptions from '../../utils/requestOptions';
import { useEffect, useState } from 'react';
import { fetchLocals } from '../../utils/restaurantsFetch';

const AdminLocals = () => {
  const [locals, setLocals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const onClickDelete = (id) => {
    fetch(`/restaurants/${id}`, requestOptions('DELETE', currentUser)).then(() =>
      {setLocals(locals.filter(users => users.id !== id))}
    );
  }

  useEffect(() => {
    // Revisa si el token existe, de existir ve si es admin o no
    if(!currentUser){
      console.log({Error: "Acceso no autorizado"});
      return navigate('/');
    }
    if(!jwtDecode(currentUser.token).user.admin){
      console.log({Error: 'Usuario no es administrador'})
      navigate('/');
    }
    fetchLocals(setIsLoading, setIsError, setLocals);
  }, [])

  // Función que retorna la lista de los locales
  const getLocals = () => {
    let values = null;
    if(locals) {
      values = locals.map((val, key) => {
        return (
          <tr key={key}>
            <td className="px-6 py-4 font-bold">{val.id}</td>
            <td className="px-6 py-4">{val.name}</td>
            <td className="px-6 py-4">{val.category}</td>
            <td className="px-6 py-4">{val.stars}</td>
            <td className="px-6 py-4">
              <button 
                onClick={() => onClickDelete(val.id)}
                className="hover:text-blue-700 text-blue-500 mx-1"
              >
                Eliminar
              </button>
              <Link to={`/local/${val.id}`} className="hover:text-blue-700 text-blue-500 mx-1">
                Detalles
              </Link>
            </td>
          </tr>
        )
      })
    } else {
      values = <p> No hay locales </p>
    }
    return values;
  }
  
  // Mensaje cuando esta cargando los datos
  if (isLoading) return <div>Cargando...</div>
  // Mensaje si hubo un error al cargar
  else if (isError) return <div>Hubo un error :c</div>
  return (
    <div className="justify-center flex flex-col m-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs bg-red-500 capitalize bg-red-700 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Categoría</th>
            <th scope="col" className="px-6 py-3">Estrellas</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>{getLocals()}</tbody>
      </table>
    </div>
  );
}

export default AdminLocals