import { useParams } from "react-router"
import { useEffect, useState } from "react";
import axios  from 'axios';
import {Link} from "react-router-dom";


export default function City (){

    const {more} = useParams()
    const [city,setCity] = useState([])
    const [loading,setLoading] = useState(true)
    const [name,setName] = useState();
    const [image,setImage] = useState();
    const [enableEdit,setEnabeEdit] = useState(false)
    const [idEdit,setIdEdit] = useState()

    
    useEffect (()=> {

        console.log(more)
        axios.get(`http://localhost:3001/country/getCountry/${more}`)
        .then((response) => {
        console.log(response.data);
        setCity(response.data.cities);
        setLoading(false)

    })
    }, []);

    if (loading){
        return (
            <p>loading...</p>
        )
    }

        // Add City

        const addCity = (e) => {
            e.preventDefault()
              axios.post(`http://localhost:3001/country/createCity/${more}`, {
                   data: {
                       name: e.target.form[0].value,
                       image: e.target.form[1].value,
                    }} 
              ).then(
                (response) => {
                  console.log("Add", response.data.cities);
                  setCity(response.data.cities);
                })
        }

         // Delete City

       const deleteCity = (e,_id) => {
        e.preventDefault()
        console.log(_id)
        axios.delete(`http://localhost:3001/country/deleteCity/${more}/${_id}`
        ).then((response) => {
        console.log(" deleted", response)
        setCity(response.data.cities);
    })
   }

        // Update City
    
  function updateCity(element){
    setIdEdit(element._id)
    setName(element.name)
    setImage(element.image)
    setEnabeEdit(true)
  }

  function saveEditCity(e){
        e.preventDefault()
      axios.put(`http://localhost:3001/country/updateCity/${more}/${idEdit}`,
         { data :
            {
            name,
            image,
            }
         })
            .then((response) => {
            console.log("Updated",response.data);
            setCity(response.data);
        });
        setEnabeEdit(false)
  }

    return (
        <div className="City">
            {city?.map((element)=>{
                 return (   
                    <div class="container">
                    <div class="card">
                      <div class="box">
                        <div class="content">
                        <h4>{element.name}</h4>
                        <button className="btn" onClick={(e) =>{deleteCity(e,element._id)}}>Delete</button>
                        <button className="btn" onClick={(e) =>{updateCity(element)}}>update</button>
                        <Link on to={{ pathname: `/Place/${more}/${element._id}`,data: {element}}}>
                          <img className="card" src={element.image} height={230} width={370}></img>
                        </Link><br/>
                    </div>
                    </div>
                    </div>
                    </div> 
                 )
             })}

             <form>
                <input  placeholder="City :"></input><br/>
                <input  placeholder="Image :"></input><br/>
                <br/><br/>
                <button className="btn" type="submit" onClick= {(e)=>addCity(e)}>Add</button><br/><br/>
            </form>

            {(function(){
            if (enableEdit == true){
                return ( 
            <form>
                 <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="City :"></input><br/>
                 <input value={image} onChange={(e)=>setImage(e.target.value)} placeholder="image :"></input><br/>
                 <br/><br/><button className='btn' onClick={(e)=>{saveEditCity(e)}} >save</button><br/><br/>
            </form>
            ) }})()}

        </div>
    )
}