import { React , useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

function EditRestaurant() {
    // const stringUser = localStorage.getItem('user');
    // const user = JSON.parse(stringUser);
    const { id } = useParams();

    const { currentUser } = useAuth();

    useEffect(() => {
        async function fetchdata() {
            const currentData = await fetch(`/restaurants/${id}`, {
            method: 'GET', Authorization: `Bearer ${currentUser?.token}`
            });
            let info = await currentData.json();
            setDataJson(info);
            //console.log(info);
            setCategory(info.category);
            setContact(info.contact);
            setDetails(info.details);
            setLocation(info.location);
            setName(info.name);
            setUserId(info.UserId);
        }
        fetchdata();
    }, [id])

    const [dataJson, setDataJson] = useState({});
    const [name, setName] = useState(dataJson.name);
    const [category, setCategory] = useState(dataJson.category);
    const [details, setDetails] = useState(dataJson.details);
    const [location, setLocation] = useState(dataJson.location);
    const [contact, setContact] = useState(dataJson.contact);
    const [UserId, setUserId] = useState();

    const navigate = useNavigate();

    const handleChangeName = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setName(value)
    };

    const handleChangeCat = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setCategory(value)
    };

    const handleChangeDet = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setDetails(value)
    };

    const handleChangeLoc = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setLocation(value)
    };

    const handleChangeCont = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setContact(value)
    };

    const submit = async (e) => {
        e.preventDefault();
        // const currentData = await fetch(`/restaurants/${id}`, {
        //     method: 'GET'
        // });
        // let dataJson = await currentData.json();
        // console.log(dataJson);
        if (name === ""){
            setName(dataJson.name)
        }
        if (category === ""){
            console.log("entra aca");
            setCategory(dataJson.category)
        }
        if (details === ""){
            setDetails(dataJson.details)
        }
        if (location === ""){
            setLocation(dataJson.location)
        }
        if (contact === ""){
            setContact(dataJson.contact)
        }
        // //console.log(user);
        //console.log(user['id']);
        //let restaurantData = restaurant;
        setUserId(currentUser.id);
        // console.log(typeof user.id);
        console.log(name);
        // console.log(userId);
        console.log(category);
        console.log(contact);
        //console.log(restaurantData);
        console.log('primer log')
        let res = await fetch(`/restaurants/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: name,
            category: category,
            details: details,
            location: location,
            contact: contact,
            UserId: UserId
        }),
        headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' },
        });
        let resJson = await res.json();
        console.log(resJson);
        navigate(`/local/${id}`);

        //.then(res => res.json())
        //.then(json => setUser(json.user))
    };
    
    if (currentUser.id === parseInt(UserId)) {
    return (
        <>
        <div className="justify-center flex flex-row my-14 ">
            <div className="p-16 m-12  bg-white border-red-400 border-4 rounded-lg">
                <div className="text-center m-4 text-black font-normal text-xl">
                    <h2>Edita tu restaurante</h2>
                </div>
                <hr></hr>
                <form onSubmit={submit}>
                    <p>
                        <label>Nombre del restaurante: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="name" 
                        placeholder="Nombre" 
                        value={name || ""}
                        onChange={handleChangeName}
                         />
                    </p>
                    <p>
                        <label>Categoría: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="category" 
                        placeholder="Categoría"
                        value={category || ""}
                        onChange={handleChangeCat}
                         />
                    </p>
                    <p>
                        <label>Detalles: </label>
                        <input className="w-auto" 
                        type="text" 
                        name="details" 
                        placeholder="Detalles" 
                        value={details || ""}
                        onChange={handleChangeDet}
                         />
                    </p>
                    <p>
                        <label>Ubicación: </label>
                        <input className="w-auto"
                        type="text" 
                        name="location" 
                        placeholder="Ubicación del restaurante"
                        value={location || ""}
                        onChange={handleChangeLoc}
                         />
                    </p>
                    <p>
                        <label>Contacto: </label>
                        <input type="text" 
                        name="contact" 
                        placeholder="Número de conctacto"
                        value={contact || ""}
                        onChange={handleChangeCont}
                         />
                    </p>
                    <hr></hr>
                    <br></br>
                    <input type="submit" name="Edit" value="Edita tu restaurante" 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                </form>
            </div>
            <div>
            </div>
        </div>
        </>
        
    )}
}


export default EditRestaurant;