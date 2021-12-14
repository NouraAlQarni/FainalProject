import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios  from 'axios';

export default function Comments (){

    const {countryId,cityId, placeId} = useParams()
    const [comment,setComment] = useState([])
    const [loading,setLoading] = useState(true)
    const [commentBody,setCommentBody] = useState()

        
    useEffect (()=> {
        axios.get(`http://localhost:3001/place/getComment/${countryId}/${cityId}/${placeId}`)
        .then((response) => {
        setComment(response.data);
        setLoading(false)
    })
    }, []);

        // Add Comment

        const addComment = (e) => {
            e.preventDefault()
            console.log(commentBody)
              axios.post(`http://localhost:3001/place/createComment`, {
                   data: {
                    commentBody: commentBody,
                    idCountry: countryId,
                    idCity: cityId,
                    idplace: placeId,
                    iduser: "61b0a766fbac4fc92dca35f7"
                    }} 
              ).then(
                (response) => {
                    console.log("Add", response);
                        setComment(response.data);
                    }
                )
        }

         // Delete Comment

       const deleteComment = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/place/deleteComment`,{
            data: {
                commentBody: e.target.value,
                idCountry: countryId,
                idCity: cityId,
                idplace: placeId,
                iduser: "61b0a766fbac4fc92dca35f7",
                commentID: e.target.value,

                }
        }
        ).then((response) => {
        console.log(" deleted", response)
        setComment(response.data);
        })
        }

        if (loading){
            return (
                <p>loading...</p>
            )
        }
    return (
        <div className="Comments">
            {comment.map((element)=>{
                 return (
                     <div>
                        <p>{element.commentBody}</p>
                        <textarea class="form-control z-depth-1" rows="3" placeholder="Write comment ..." onChange={(e)=>{setCommentBody(e.target.value)}} ></textarea>
                        
                        <button className="btn" onClick={(e)=>addComment(e)}>post</button><br/><br/>
                        <button className="btn" onClick={(e)=>deleteComment(e,element._id)}>Delete</button>
                    </div>
                 )})}
        </div>
    )
}