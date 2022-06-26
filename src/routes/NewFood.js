import { React , useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function NewFood() {
    const stringUser = localStorage.getItem('user');
    const user = JSON.parse(stringUser);
    const [food, setFood] = useState({
        "name" : "",
        "description" : "",
        "price" : "",
        "RestaurantId" : ""
    });

    const params = useParams();

    const navigate = useNavigate();

    const handleChange = (event) => {
        const variableName = event.target.name;
        const value = event.target.value;
        setFood(values => ({...values, [variableName]: value}))
    };

    const submit = async (e) => {
        e.preventDefault();
        //console.log(user);
        //console.log(user['id']);
        let foodData = food;
        foodData.RestaurantId = parseInt(params.id);
        foodData.price = parseInt(food.price)
        //console.log(foodData);
        await fetch(`https://almuerzos-grupo-13-backend.herokuapp.com/foods`, {
        method: 'POST', 
        body: JSON.stringify(foodData),
        headers: { 'Content-Type': 'application/json' },
        });
        navigate(`/local/${params.id}`);
        //.then(res => res.json())
        //.then(json => setUser(json.user))
    };
    
    if (user) {
    return (
        <>
        <div className="justify-center flex flex-row my-14 ">
            <div className="p-16 m-12  bg-white border-red-400 border-4 rounded-lg">
                <div className="text-center m-4 text-black font-normal text-xl">
                    <h2>Crea un nuevo plato</h2>
                </div>
                <hr></hr>
                <form onSubmit={submit}>
                    <p>
                        <label>Nombre del plato: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="name" 
                        placeholder="Nombre del plato" 
                        value={food.name || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <p>
                        <label>Descripción:</label>
                        <input className="w-auto" 
                        type="text" 
                        name="description" 
                        placeholder="Descripción del producto"
                        value={food.description || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <p>
                        <label>Precio:</label>
                        <input className="w-auto" 
                        type="text" 
                        name="price"
                        placeholder="Precio del plato" 
                        value={food.price || ""}
                        onChange={handleChange}
                        required />
                    </p>
                    <hr></hr>
                    <br></br>
                    <input type="submit" name="Sign Up" value="Crear plato" 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                </form>
            </div>
            <div>
            </div>
        </div>
        </>
        
    )}
}

export default NewFood;