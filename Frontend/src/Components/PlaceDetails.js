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
            console.log(response.data)
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
            if (storedToken == undefined){
                return alert("you most login to add comment")
            }
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

       const deleteComment = (e,element) => {
        e.preventDefault()
        axios.delete(`http://localhost:3001/place/deleteComment/${countryId}/${cityId}/${placeId}/${element._id}`
        ).then((response) => {
        console.log(" deleted", response)
        setDetail(response.data);
        setComment(response.data.comments);
        })
        }

        const decode = (element) => {
            if (decodedData != undefined){ 
                console.log( element.user._id);
                console.log(decodedData.id );
                console.log(decodedData.id == element.user._id);
                  if ( decodedData.id == element.user._id){
                     return (
                        <div>
                           <TiDelete onClick={(e)=>deleteComment(e,element)}/><hr/>
                        </div>
                     )}
                  }
                }

    if (loading){
        return (<p>loading...</p>)
    }

    return (
        <>
         <br/><br/><h3>Place Details</h3><br/><br/>
        <div className="PlaceDetails">
            <div class="card text-center col-5 mx-auto m-3">
                <div class="card-header">
                    <img className="card" src={detail.image} height={330} width={500}/></div>
                    <div class="card-body">
                      <br/><h4>{detail.name}</h4><br/>
                        <iframe src={detail.location}
                          width="500" height="300" 
                          frameborder="0"
                          tabindex="-1"
                          allowfullscreen="" loading="lazy" >   
                        </iframe>
                        <br/>
                    </div>
                    <h5 className="reviewTexet">REVIEWS</h5><br/>
                    <div className="comment">
                    <textarea class="form-control z-depth-1" rows="2" placeholder="Write comment ..." onChange={(e)=>{setCommentBody(e.target.value)}}></textarea>
                     <BiSend onClick={(e)=>addComment(e)} className="send"/></div>
                        {comment?.map((element)=>{
                            console.log(element)
                         return (
                            <div><br/>
                               <hr/> <small>{element.user.name}: {element.commentBody}</small>{decode(element)}
                            </div>)})}
                            <br/>
            </div>
            <br/>
        </div>
        </>
    )
}