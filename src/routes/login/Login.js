import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


function Login(props) {
  const { currentUser, handleUserLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleChangePwd = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const submit = async (e) => {
    e.preventDefault();
    let res = await fetch("https://almuerzos-grupo-13-backend.herokuapp.com/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    let resJson = await res.json();
    if (!resJson.message) {
        handleUserLogin(resJson);
        setEmail("");
        setPassword("");
      navigate("/");
    } else {
      console.log(res.message);
    }
  };

  useEffect(() => {
    if(currentUser) {
      console.log({Error: "El usuario ya está logeado"})
      navigate('/')
    }
  }, [])

  return (
    <>
      <div className="justify-center flex flex-row my-14 ">
        <div className="p-16 m-12  bg-white border-red-400 border-4 rounded-lg">
          <div className="text-center m-2 text-black font-normal text-xl">
            <h2>Inicia Sesión</h2>
          </div>
          <br></br>
          <hr></hr>
          <form onSubmit={submit}>
            <p>
              <label>Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={handleChangeEmail}
                required
              />
            </p>
            <p>
              <label>Contraseña: </label>
              <input
                type="password"
                id="password"
                name="pwd"
                placeholder="password"
                onChange={handleChangePwd}
                required
              />
            </p>
            <hr></hr>
            <div className="text-gray-500 hover:text-gray-800 text-sm">
              <Link to="/register">No tienes cuenta? Crea una</Link>
            </div>
            <div className="text-gray-500 hover:text-gray-800 text-sm">
              <Link to="/register">Olvidaste tu contraseña?</Link>
            </div>
            <br></br>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div></div>
      </div>
    </>
  );
}
export default Login;
