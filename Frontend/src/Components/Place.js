import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios  from 'axios';



export default function Place (){
    
    const {countryId,cityId} = useParams()
    const [place,setPlace] = useState([])
    const [name,setName] = useState();
    const [image,setImage] = useState();
    const [location,setLocation] = useState();
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
                    }
                )
        }

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
    return (
        
        <div className="Place">

                   {place.map((element)=>{
                 return (
                    <div class="a-box">
                    <div class="img-container">
                    <div class="img-inner">
                        <div class="inner-skew">
                          <img className="card" src={element.image} ></img><br/>
                    </div>
                    </div>
                    </div>
                    <div class="text-container">
                        <br/><p class="card-text">{element.name}</p>
                        <br/><p class="card-text">{element.location}</p>
                        <br/>
                        <button className="btn" onClick={(e) =>{deletePlace(e,element._id)}}>Delete</button>
                    </div>
                    </div> 
                 )
             })}

             <form>
                <br/><br/><br/>
                <input  placeholder="Place :"></input><br/>
                <input  placeholder="Image :"></input><br/>
                <input  placeholder="location :"></input><br/>
                <br/><br/>
                <button className="btn" type="submit" onClick= {(e)=>addPlace(e)}>Add</button><br/><br/>
            </form>

            <br/><br/>
        </div>

    )}