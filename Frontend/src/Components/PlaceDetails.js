import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios  from 'axios';
import { BiSend } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';
import jwt_decode from "jwt-decode";


export default function PlaceDetails (){

    const {countryId,cityId,placeId,userId} = useParams()
    const [comment,setComment] = useState([]);
    const [commentBody,setCommentBody] = useState();
    const [loading,setLoading] = useState(true);
    const [detail,setDetail] = useState()


    let decodedData ;
      const storedToken = localStorage.getItem("token");
      if (storedToken){
          decodedData = jwt_decode(storedToken, { payload: true });
          console.log(decodedData);
          let expirationDate = decodedData.exp;
          let current_time = Date.now() / 1000;
          if(expirationDate < current_time)
          {
              localStorage.removeItem("token");
          }
     }

    //  const decode = (element) => {
    //     if (decodedData != undefined){
    //       console.log(decodedData);
    //           if ( decodedData._id == ""){
    //              return (
    //                 <div>
    //                 </div>
    //              )}
    //           }
    //         } 

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
                    iduser: decodedData.id
                    } 
              ).then(
                (response) => {
                    console.log("Add", response.data);
                    setDetail(response.data.places[0]);
                    setComment(response.data.result);
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
                    <img className="card" src={detail.image} height={330} width={500}/></div>
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
                                <p>{element.user.name} :<br/>{element.commentBody}</p>   
                                <TiDelete onClick={(e)=>deleteComment(e,element._id)}/><hr/> 
                            </div>)})}
                            <br/>
            </div>
            <br/>
        </div>
    )
}