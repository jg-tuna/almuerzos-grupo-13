import { React , useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

function Register() {
    const { currentUser, handleUserLogin } = useAuth();
    const [user, setUser] = useState({
        "firstName" : "",
        "lastName" : "",
        "email" : "",
        "password" : "",
        "passwordConfirmation": ""
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(value);
        setUser(values => ({...values, [name]: value}))
        //console.log(user);
    };

    const submit = async (e) => {
        e.preventDefault();
        
        let res = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
        });

        let resJson = await res.json();
        if (!resJson.message) {
            handleUserLogin(resJson);
            navigate('/');
        } else {
            console.log(res.message);
        }
    };

    useEffect(()=>{
        if(currentUser){
            console.log({Error: "Ya hay un usuario con sesión iniciada"});
            navigate('/');
        }
    }, [])

    return (
        <>
        <div className="justify-center flex flex-row my-14 ">
            <div className="p-16 m-12  bg-white border-red-400 border-4 rounded-lg">
                <div className="text-center m-4 text-black font-normal text-xl">
                    <h2>Crea tu cuenta</h2>
                </div>
                <hr></hr>
                <form onSubmit={submit}>
                    <p>
                        <label>Nombre: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="firstName" 
                        placeholder="Nombre" 
                        value={user.firstName || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <p>
                        <label>Apellido: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="lastName" 
                        placeholder="Apellido"
                        value={user.lastName || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <p>
                        <label>Email: </label>
                        <input className="w-auto" 
                        type="email" 
                        name="email" 
                        placeholder="email" 
                        value={user.email || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <p>
                        <label>Contraseña: </label>
                        <input type="password" 
                        name="password" 
                        placeholder="contraseña"
                        value={user.password || ""}
                        onChange={handleChange}
                        required  />
                    </p>
                    <p>
                        <label>Confirma la contraseña: </label>
                        <input type="password" 
                        name="passwordConfirmation" 
                        placeholder="confirmación contraseña"
                        value={user.passwordConfirmation || ""}
                        onChange={handleChange}
                        required  />
                    </p>
                    <hr></hr>
                    <br></br>
                    <input type="submit" name="Sign Up" value="Regístrate" 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                </form>
            </div>
            <div>
            </div>
        </div>
        </>
        
    )
}


export default Register;