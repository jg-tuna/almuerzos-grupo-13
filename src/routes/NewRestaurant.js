import { React , useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { fetchLocal } from '../utils/restaurantsFetch';
import { fetchRatingId } from '../utils/ratingFetch';

function NewRestaurant() {
    // const stringUser = localStorage.getItem('user');
    // const user = JSON.parse(stringUser);
    const [restaurant, setRestaurant] = useState({
        "name" : "",
        "category" : "",
        "details" : "",
        "location" : "",
        "contact": "",
        "UserId" : ""
    });
    

    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const handleChange = (event) => {
        const variableName = event.target.name;
        const value = event.target.value;
        setRestaurant(values => ({...values, [variableName]: value}))
    };

    const submit = async (e) => {
        e.preventDefault();
        let restaurantData = restaurant;
        restaurantData.UserId = currentUser.id;
        await fetch('https://almuerzos-grupo-13-backend.herokuapp.com/restaurants', {
        method: 'POST',
        body: JSON.stringify(restaurantData),
        headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' },
        });
        navigate('/');
        //.then(res => res.json())
        //.then(json => setUser(json.user))
    };
    
    if (currentUser) {
    return (
        <>
        <div className="justify-center flex flex-row my-14 ">
            <div className="p-16 m-12  bg-white border-red-400 border-4 rounded-lg">
                <div className="text-center m-4 text-black font-normal text-xl">
                    <h2>Crea un nuevo restaurante</h2>
                </div>
                <hr></hr>
                <form onSubmit={submit}>
                    <p>
                        <label>Nombre del restaurante: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="name" 
                        placeholder="Nombre" 
                        value={restaurant.name || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <p>
                        <label>Categoría: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="category" 
                        placeholder="Categoría"
                        value={restaurant.category || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <p>
                        <label>Detalles: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="details" 
                        placeholder="Detalles" 
                        value={restaurant.details || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <p>
                        <label>Ubicación: </label>
                        <input className="w-auto"
                        type="text" 
                        name="location" 
                        placeholder="Ubicación del restaurante"
                        value={restaurant.location || ""}
                        onChange={handleChange}
                        required  />
                    </p>
                    <p>
                        <label>Contacto: </label>
                        <input type="text" 
                        name="contact" 
                        placeholder="Número de conctacto"
                        value={restaurant.contact || ""}
                        onChange={handleChange}
                        required  />
                    </p>
                    <hr></hr>
                    <br></br>
                    <input type="submit" name="Sign Up" value="Crear restaurante" 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                </form>
            </div>
            <div>
            </div>
        </div>
        </>
        
    )}
}


export default NewRestaurant;