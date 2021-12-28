import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios  from 'axios';
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';



export default function Place (){
    
    const {countryId,cityId} = useParams()
    const [place,setPlace] = useState([])
    const [loading,setLoading] = useState(true)

    
    
    useEffect (()=> {
        axios.get(`http://localhost:3001/city/getCity/${countryId}/${cityId}`)
        .then((response) => {
        console.log(response.data);
        setPlace(response.data);
        setLoading(false)
    })
    }, []);


        // Add Place

        const addPlace = (e) => {
            e.preventDefault()
              axios.post(`http://localhost:3001/city/createPlace/${countryId}/${cityId}`, {
                   data: {
                       name: e.target.form[0].value,
                       image: e.target.form[1].value,
                       location: e.target.form[1].value,
                    }} 
              ).then(
                (response) => {
                    console.log("Add", response.data);
                        setPlace(response.data);
                    })}

         // Delete Place

       const deletePlace = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/city/deletePlace/${countryId}/${cityId}/${_id}`
        ).then((response) => {
        console.log(" deleted", response)
        setPlace(response.data);
    })
   }

  if (loading){
    return (
        <p>loading...</p>
    )
    }


    
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

  const decode = (id) => {
    if (decodedData != undefined){
      console.log(decodedData);
          if ( decodedData.typeOfUser == "admin"){
             return (
                <div>
                   <MdDeleteForever onClick={(e) =>{deletePlace(e,id)}}/>
                </div>
             )}
          }
        } 

        const decode1 = (id) => {
            if (decodedData != undefined){
                  if (decodedData.typeOfUser == "admin"){
                     return (           
                        <form>
                        <br/><br/><br/>
                        <input  placeholder="Place :"></input><br/>
                        <input  placeholder="Image :"></input><br/>
                        <input  placeholder="location :"></input><br/>
                        <br/><br/>
                        <button className="btn" type="submit" onClick= {(e)=>addPlace(e)}>Add</button><br/><br/>
                     </form>
                   )}}} 


    return (      
      <div>
      <br/><br/><h3>Top Place</h3>
        <div className="Place">
            {place.map((element)=>{
                 return (
                 <div class="container"><br/><br/><br/>
                    <div class="card">
                      <div class="box">
                        <div class="content">
                           <h4>{element.name}</h4>
                           {decode(element._id)}
                          <Link on to={{ pathname: `/PlaceDetails/${countryId}/${cityId}/${element._id}`,data: {element}}}>
                          <img className="card" src={element.image} height={230} width={370}/>
                          </Link><br/>     
                        </div>
                     </div>
                    </div>
                        <br/>
                        <br/>    
                    </div>
                 )
             })}
             {decode1()}
            <br/><br/>
        </div>
        </div>

    )}