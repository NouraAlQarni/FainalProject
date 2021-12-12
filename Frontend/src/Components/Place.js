import { useParams } from "react-router"
import { useState } from "react";
import axios  from 'axios';
import {Link} from "react-router-dom";


export default function Place (){
    
    const {Id} = useParams()
    const [place,setPlace] = useState([])
    const [name,setName] = useState();
    const [image,setImage] = useState();
    const [location,setLocation] = useState();
    const [enableEdit,setEnabeEdit] = useState(false)
    const [idEdit,setIdEdit] = useState()


        // Add Place

        const addPlace = (e) => {
            e.preventDefault()
              axios.post(`http://localhost:3001/city/createPlace/${Id}`, {
                   data: {
                       name: e.target.form[0].value,
                       image: e.target.form[1].value,
                       location: e.target.form[1].value,
                    }} 
              ).then(
                (response) => {
                  console.log("Add", response.data);
                  setPlace(response.data);
                })
        }

         // Delete Place

       const deletePlace = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/city/deletePlace/${Id}/${_id}`
        ).then((response) => {
        console.log(" deleted", response)
        setPlace(response.data);
    })
   }


  // Update Place
    
  function updatePlace(element){
    setIdEdit(element._id)
    setName(element.name)
    setImage(element.image)
    setLocation(element.location)
    setEnabeEdit(true)
  }

  function saveEditPlace(e){
        e.preventDefault()
      axios.put(`http://localhost:3001/city/updatePlace/${Id}/${idEdit}`,
         { data :
            {
            name,
            image,
            location,
            }
         })
            .then((response) => {
            console.log("Updated",response.data);
            setPlace(response.data);
        });
        setEnabeEdit(false)
  }

    return (
        <div className="Place">
                   {place?.map((element)=>{
                 return (
                    <div class="a-box">
                    <div class="img-container">
                    <div class="img-inner">
                        <div class="inner-skew">
                        <Link on to={{ pathname: `/Place/${element._id}`,data: {element}}}>
                          <img className="card" src={element.image} ></img>
                        </Link><br/>
                    </div>
                    </div>
                    </div>
                    <div class="text-container">
                        <br/><p class="card-text">{element.name}</p>
                        <br/><p class="card-text">{element.location}</p>
                        <br/>
                        <button className="btn" onClick={(e) =>{deletePlace(e,element._id)}}>Delete</button>
                        <button className="btn" onClick={(e) =>{updatePlace(element)}}>update</button>
                    </div>
                    </div> 
                 )
             })}

             <form>
                <input  placeholder="Place :"></input><br/>
                <input  placeholder="Image :"></input><br/>
                <input  placeholder="location :"></input><br/>
                <br/><br/>
                <button className="btn" type="submit" onClick= {(e)=>addPlace(e)}>Add</button><br/><br/>
            </form>

            {(function(){
            if (enableEdit == true){
                return ( 
            <form>
                 <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Place :"></input><br/>
                 <input value={image} onChange={(e)=>setImage(e.target.value)} placeholder="image :"></input><br/>
                 <input value={image} onChange={(e)=>setLocation(e.target.value)} placeholder="location :"></input><br/>
                 <br/><br/><button className='btn' onClick={(e)=>{saveEditPlace(e)}} >save</button><br/><br/>
            </form>
            ) }})()} 
        </div>

    )}