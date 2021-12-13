import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios  from 'axios';

export default function Comments (){

    const {countryId,cityId, placeId} = useParams()
    const [comment,setComment] = useState([])
    const [loading,setLoading] = useState(true)

        
    useEffect (()=> {
        axios.get(`http://localhost:3001/place/getComment/${countryId}/${cityId}/${placeId}`)
        .then((response) => {
        console.log(response.data);
        setPlace(response.data);
        setLoading(false)
    })
    }, []);

        // Add Comment

        const addComment = (e) => {
            e.preventDefault()
              axios.post(`http://localhost:3001/place/createComment/${countryId}/${cityId}/${placeId}`, {
                   data: {
                    commentBody: e.target.value,
                    }} 
              ).then(
                (response) => {
                    console.log("Add", response.data);
                        setComment(response.data);
                    }
                )
        }

         // Delete Comment

       const deleteComment = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/place/deleteComment/${countryId}/${cityId}/${placeId}/${_id}`
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
                        <textarea>{element.commentBody}</textarea>
                        <button className="btn" onClick={(e)=>addComment(e)}>Add</button><br/><br/>
                        <button className="btn" onClick={(e)=>deleteComment(e,element._id)}>Delete</button>
                    </div>
                 )
             })}

        </div>
    )
}