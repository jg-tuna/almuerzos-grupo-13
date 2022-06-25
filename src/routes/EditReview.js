import { React , useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function EditReview() {
    //const stringUser = localStorage.getItem('user');
    //const user = JSON.parse(stringUser);
    const { id } = useParams();

    const { currentUser } = useAuth();

    useEffect(() => {
        async function fetchdata() {
            // console.log("fetchdata de food")
            // console.log("id de food")
            // console.log(id)
            const currentData = await fetch(`/reviews/${id}`, {
            method: 'GET', 
            headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }
            });
            let info = await currentData.json();
            setDataJson(info);
            // console.log("info");
            // console.log(info);
            setContent(info.content);
            setRestaurantId(info.RestaurantId);
            setUserId(info.UserId);
            setRatingId(info.RatingId);
            // console.log("fetchdata de restaurant")
            // console.log("id del restaurante")
            // console.log(info.RestaurantId)SSSSSSS
            // const currentDataRestaurant = await fetch(`/restaurants/${info.RestaurantId}`, {
            // method: 'GET',
            // headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' }
            // });
            // let infoRestaurant = await currentDataRestaurant.json();
            // setUserId(infoRestaurant.UserId);
        }
        fetchdata();
    }, [])


    const [dataJson, setDataJson] = useState({});
    const [content, setContent] = useState();
    const [RestaurantId, setRestaurantId] = useState();
    const [UserId, setUserId] = useState();
    const [RatingId, setRatingId] = useState();
    const navigate = useNavigate();

    const handleChangeCont = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setContent(value)
    };


    const submit = async (e) => {
        e.preventDefault();
        await fetch(`/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            content: content,
            UserId: UserId,
            RestaurantId: RestaurantId,
            RatingId : RatingId
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
                    <h2>Edita la reseña</h2>
                </div>
                <hr></hr>
                <form onSubmit={submit}>
                    <p>
                        <br></br>
                        <label>Contenido: </label>
                        <br></br>
                        <br></br>
                        <textarea className="w-auto border" 
                        type="text" 
                        name="content" 
                        placeholder="" 
                        value={content || ""}
                        onChange={handleChangeCont}
                        cols="100"
                        rows="10"
                        required
                        />
                    </p>
                    <hr></hr>
                    <br></br>
                    <input type="submit" name="Edit" value="Edita tu reseña" 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                </form>
            </div>
            <div>
            </div>
        </div>
        </>
    )}
}

export default EditReview;