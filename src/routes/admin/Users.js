import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import requestOptions from "../../utils/requestOptions";

const AdminUsers = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  // Función que hace el fetch de todos los usuarios
  const fetchUsers = () => {
    fetch("/users", requestOptions('GET', currentUser))
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setIsLoading(false);
        setUsers(data);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.log(error);
        return navigate('/');
      });
  };

  const OnClickDelete = (id) => {
    fetch(`/users/${id}`, requestOptions('DELETE', currentUser)).then(() => {
      setUsers(users.filter((users) => users.id !== id));
    });
  };

  const getUsers = () => {
    let values = null;
    if (users) {
      values = users.map((val, key) => {
        return (
          <tr key={key}>
            <td className="px-6 py-4 font-bold">{val.id}</td>
            <td className="px-6 py-4">{val.firstName + " " + val.lastName}</td>
            <td className="px-6 py-4">{val.email}</td>
            <td className="px-6 py-4">{val.createdAt}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => OnClickDelete(val.id)}
                className="hover:text-blue-700 text-blue-500 mx-1"
              >
                Eliminar
              </button>
              <Link
                to={`/users/${val.id}`}
                className="hover:text-blue-700 text-blue-500 mx-1"
              >
                Detalles
              </Link>
            </td>
          </tr>
        );
      });
    } else {
      values = <p> No hay usuarios</p>;
    }
    return values;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  

  if (isLoading) return <div>Cargando...</div>;
  else if (isError) return <div>Hubo un error :c</div>;

  return (
    <div className="justify-center flex flex-col m-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs bg-red-500 capitalize bg-red-700 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha Creación
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>{getUsers()}</tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
