import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import SearchBar from './SearchBar';
import NotificationPanel from './NotificationPanel';

const NavBar = ({ currentUser, handleUserLogout }) => {
  const navigate = useNavigate();

  const getBar = () => { 
    if (currentUser) {
      if(jwtDecode(currentUser.token).user.admin)
        return( <AdminBar/>)
    }
    return (<NormalBar/>)
  }

  const LoggedDiv = () => {
    if (currentUser) {
      return (
        <div className='flex items-center justify-end'>
          <button onClick={ () => {
                  handleUserLogout();
                  navigate('/');
                }} 
          className='text-base font-medium text-gray-500 hover:text-gray-900'>
            Cerrar Sesion
          </button>
        </div>
      )
    }
    else {
      return (
        <div className='flex items-center justify-end'>
          <NavLink to='/login' className='text-base font-medium text-gray-500 hover:text-gray-900'>
            Iniciar Sesión
          </NavLink>
          <NavLink to='/register' className='text-base font-medium ml-8 inline-flex text-white bg-red-600 hover:bg-red-700 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm hover:text-white'>
            Inscribirse
          </NavLink>
        </div>
      )
    }
  }

  

  // Elementos que aparecen cuando el usuario logeado es administrador
  const AdminBar = () => {
    return (
      <div className='relative flex-1'>
        <NavLink to='admin/users' className='text-base font-medium text-gray-500 hover:text-gray-900 mx-3'>
          Usuarios
        </NavLink>
        <NavLink to='admin/locals' className='text-base font-medium text-gray-500 hover:text-gray-900 mx-3'>
          Locales
        </NavLink>
      </div>
    )
  }

  // Elementos que aparecen cuando no es administrador
  const NormalBar = () => {
    return(
      <div className='relative flex-1 flex'>
        <SearchBar/>
        <NotificationPanel/>
      </div>
      )
    // PONER ALGO AQUI SI ENCONTRAMOS NECESARIO
    // if (isLogged) return (<SearchBar />)
    // else return(<SearchBar />);
  }

  return (

    <header className='mx-auto px-2'>
      <div className='flex items-center border-b-2 py-5 justify-between space-x-10 border-red-100'>
        <div className='flex justify-start mx-5'>
          <NavLink to='/'>
            <img src="/logo_fries.png" alt="logo" className='App-logo' />
          </NavLink>
        </div>
        <nav className='flex space-x-10'>
        </nav>
        {getBar()}
        <LoggedDiv />
      </div>
    </header>
  );
}

export default NavBar;
