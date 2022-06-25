import React, { createContext, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

let logoutTimer;

export const AuthContext = createContext();
// contexto encargado del manejo del currentUser. Obtenido de la capsula entregada.
const AuthContextProvider = ({ children }) => {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage("user");
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] = useLocalStorage("sessionExpiration");
  const navigate = useNavigate();

  // Función encargada del inicio de sesión de los usuarios
  const handleUserLogin = (user) => {
    const expiration = new Date(jwtDecode(user.token).exp * 1000);
    storeUser(user);
    storeSessionExpDate(expiration);
  };

  // Función encargada de cerrar sesión cuando el usuario quiere
  const handleUserLogout = () => {
    clearStoredUser();
    clearSessionExpDate();
  };

  // Función encargada del cerrado de sesión automatico
  const handleAutoLogout = useCallback(() => {
    clearStoredUser();
    clearSessionExpDate();
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if(currentUser && sessionExpDate){
      const remainingTime = new Date(sessionExpDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(handleAutoLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, sessionExpDate, handleAutoLogout]);

  return (
    <AuthContext.Provider value={{ currentUser, handleUserLogin, handleUserLogout}}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;
