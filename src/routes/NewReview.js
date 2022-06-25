import { React , useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { fetchLocal } from '../utils/restaurantsFetch';
import { fetchRatingId } from '../utils/ratingFetch';

function NewReview() {
    // const stringUser = localStorage.getItem('user');
    // const user = JSON.parse(stringUser);
    const [review, setReview] = useState({
        "content" : "",
        "UserId" : "",
        "RestaurantId" : "",
        "RatingId" : ""
    });

    const [local, setLocal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [ratingId, setRatingId] = useState();

    const { currentUser } = useAuth();

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetchLocal(setIsLoading, setIsError, params.id, setLocal)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        async function fetchData() {
        const ratingData = await fetchRatingId(setRatingId, currentUser?.id, params.id, currentUser);
        }
        fetchData();
    }, [])

    const handleChange = (event) => {
        const variableName = event.target.name;
        const value = event.target.value;
        setReview(values => ({...values, [variableName]: value}))
    };

    const submit = async (e) => {
        e.preventDefault();
        //console.log(user);
        //console.log(user['id']);
        //console.log(review.content)
        let reviewData = review;
        reviewData.RestaurantId = parseInt(params.id);
        reviewData.UserId = currentUser.id
        reviewData.RatingId = ratingId
        console.log(reviewData)
        //console.log(foodData);
        await fetch(`/reviews`, {
        method: 'POST', 
        body: JSON.stringify(reviewData),
        headers: { Authorization: `Bearer ${currentUser?.token}`, 'Content-Type': 'application/json' },
        });
        navigate(`/local/${params.id}`);
        //.then(res => res.json())
        //.then(json => setUser(json.user))
    };
    
    if (currentUser && currentUser.id !== local.UserId && ratingId) {
    return (
        <>
        <div className="justify-center flex flex-row my-14 ">
            <div className="p-16 m-12  bg-white border-red-400 border-4 rounded-lg">
                <div className="text-center m-4 text-black font-normal text-xl">
                    <h2>Escribe una reseña del restaurante</h2>
                </div>
                <hr></hr>
                <form onSubmit={submit}>
                    <p>
                        <br></br>
                        <label>Contenido:</label>
                        <br></br>
                        <br></br>
                        <textarea className="w-auto border" 
                        type="text" 
                        name="content" 
                        placeholder="" 
                        value={review.content || ""}
                        onChange={handleChange}
                        cols="100"
                        rows="10"
                        required />
                    </p>
                    <hr></hr>
                    <br></br>
                    <input type="submit" name="Sign Up" value="Publica la reseña" 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
                </form>
            </div>
            <div>
            </div>
        </div>
        </>
        
    )}
}

export default NewReview;