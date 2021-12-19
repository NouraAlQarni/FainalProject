import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios  from 'axios';
import { BiSend } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';


export default function PlaceDetails (){

    const {countryId,cityId,placeId,userId} = useParams()
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
                    iduser: userId
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
                    <img className="card" src={detail.image} height={230} width={370}/></div>
                    <div class="card-body">
                        <h4>{detail.name}</h4>
                        <br/>
                    </div>
                    <div className="comment">
                    <textarea class="form-control z-depth-1" rows="2" placeholder="Write comment ..." onChange={(e)=>{setCommentBody(e.target.value)}}></textarea>
                     <BiSend onClick={(e)=>addComment(e)} className="send"/></div>
                        {comment?.map((element)=>{
                            console.log(element)
                         return (
                            <div>
                                <p>{element.name}{element.commentBody}</p>     
                                <TiDelete onClick={(e)=>deleteComment(e,element._id)}/>
                            </div>)})}
            </div>
        </div>
    )
}