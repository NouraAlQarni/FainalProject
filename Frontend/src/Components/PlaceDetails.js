import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios  from 'axios';


export default function PlaceDetails (){

    const {countryId,cityId,placeId} = useParams()
    const [comment,setComment] = useState([]);
    const [commentBody,setCommentBody] = useState();
    const [loading,setLoading] = useState(true);
    const [detail,setDetail] = useState()


    // GET Specific Place

    useEffect (()=> {
        axios.get(`http://localhost:3001/city/getPlace/${countryId}/${cityId}/${placeId}`)
        .then((response) => {
        setDetail(response.data);
        setLoading(false)
        axios.get(`http://localhost:3001/place/getComment/${countryId}/${cityId}/${placeId}`)
        .then((response) => {   
            console.log(response.data);
        setComment(response.data.comments);
        setLoading(false)
    })
    })}, []);

  
        // Add Comment

        const addComment = (e) => {
            e.preventDefault()
            console.log(commentBody)
            axios.post(`http://localhost:3001/place/createComment`, {
                    
                    commentBody: commentBody,
                    idCountry: countryId,
                    idCity: cityId,
                    idplace: placeId,
                    iduser: "61b0a766fbac4fc92dca35f7"
                    } 
              ).then(
                (response) => {
                    console.log("Add", response.data);
                    setDetail(response.data[0]);
                    setComment(response.data[0].comments);
                    }
                )
        }

        // Delete Comment

       const deleteComment = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/place/deleteComment/${countryId}/${cityId}/${placeId}/${_id}`
        // ,{
        //         commentBody: e.target.value,
        //         // idCountry: countryId,
        //         // idCity: cityId,
        //         // idplace: placeId,
        //         iduser: "61b0a766fbac4fc92dca35f7",       
        // }
        ).then((response) => {
        console.log(" deleted", response)
        setDetail(response.data);
        setComment(response.data.comments);
        })
        }

    if (loading){
        return (<p>loading...</p>)
    }

    return (
        <div className="PlaceDetails">
            <div class="card text-center col-5 mx-auto m-3">
                <div class="card-header">
                    <img className="card" src={detail.image} height={230} width={370}></img></div>
                    <div class="card-body">
                        <h4>{detail.name}</h4>
                        <br/><p>{detail.location}</p>
                    </div>
                    <textarea class="form-control z-depth-1" rows="2" placeholder="Write comment ..." onChange={(e)=>{setCommentBody(e.target.value)}}></textarea>
                     <button className="btn" onClick={(e)=>addComment(e)}>post</button><br/><br/>
                        {comment?.map((element)=>{
                            console.log(element)
                         return (
                            <div>
                                <p>{element.commentBody}</p>     
                                <button className="btn" onClick={(e)=>deleteComment(e,element._id)}>Delete</button>
                            </div>)})}
            </div>
        </div>
    )
}