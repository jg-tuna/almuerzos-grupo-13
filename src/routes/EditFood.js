import { React , useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function EditFood() {
    //const stringUser = localStorage.getItem('user');
    //const user = JSON.parse(stringUser);
    const { id } = useParams();

    const { currentUser } = useAuth();

    useEffect(() => {
        async function fetchdata() {
            // console.log("fetchdata de food")
            // console.log("id de food")
            // console.log(id)
            const currentData = await fetch(`/foods/${id}`, {
            method: 'GET', 
            headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }
            });
            let info = await currentData.json();
            setDataJson(info);
            // console.log("info");
            // console.log(info);
            setDescription(info.description);
            setPrice(info.price);
            setRestaurantId(info.RestaurantId);
            setName(info.name);
            // console.log("fetchdata de restaurant")
            // console.log("id del restaurante")
            // console.log(info.RestaurantId)
            const currentDataRestaurant = await fetch(`/restaurants/${info.RestaurantId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }
            });
            let infoRestaurant = await currentDataRestaurant.json();
            setUserId(infoRestaurant.UserId);
        }
        fetchdata();
    }, [])


    const [dataJson, setDataJson] = useState({});
    const [name, setName] = useState(dataJson.name);
    const [description, setDescription] = useState(dataJson.description);
    const [price, setPrice] = useState(dataJson.price);
    const [RestaurantId, setRestaurantId] = useState(dataJson.RestaurantId);
    const [UserId, setUserId] = useState();
    const navigate = useNavigate();

    const handleChangeName = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setName(value)
    };

    const handleChangeDes = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setDescription(value)
    };

    const handleChangePrice = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setPrice(value)
    };


    const submit = async (e) => {
        e.preventDefault();
        const intPrice = parseInt(price)
        await fetch(`/foods/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: name,
            description: description,
            price: intPrice,
            RestaurantId: RestaurantId
        }),
        headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' },
        });
        //let resJson = await res.json();
        navigate(`/local/${RestaurantId}`);
    };
    
    if (currentUser?.id === parseInt(UserId)){
    return (
        <>
        <div className="justify-center flex flex-row my-14 ">
            <div className="p-16 m-12  bg-white border-red-400 border-4 rounded-lg">
                <div className="text-center m-4 text-black font-normal text-xl">
                    <h2>Edita tu plato</h2>
                </div>
                <hr></hr>
                <form onSubmit={submit}>
                    <p>
                        <label>Nombre del plato: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="name" 
                        placeholder="Nombre del plato" 
                        value={name || ""}
                        onChange={handleChangeName}
                        />
                    </p>
                    <p>
                        <label>Descripción: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="description" 
                        placeholder="Descripción"
                        value={description || ""}
                        onChange={handleChangeDes}
                        />
                    </p>
                    <p>
                        <label>Precio: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="price" 
                        placeholder="Precio" 
                        value={price || ""}
                        onChange={handleChangePrice}
                        />
                    </p>
                    <hr></hr>
                    <br></br>
                    <input type="submit" name="Edit" value="Edita el plato" 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                </form>
            </div>
            <div>
            </div>
        </div>
        </>
        
    )}
}


export default EditFood;