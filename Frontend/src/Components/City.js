import { useParams} from "react-router"
import { useEffect, useState } from "react";
import axios  from 'axios';


export default function City (){

    const {more} = useParams()
    const [city,setCity] = useState()
    const [loading,setLoading] = useState(true)

    
    useEffect (()=> {

        console.log(more)
        axios.get(`http://localhost:3001/country/getCountry/${more}`)
        .then((response) => {
        console.log(response.data);
        setCity(response.data);
        setLoading(false)

    })
    }, []);

    if (loading){
        return (
            <p>loading...</p>
        )
    }


    return (
        <div className="City">

            {city.cities?.map((element)=>{
                 return (
                    <div class="a-box">
                    <div class="img-container">
                    <div class="img-inner">
                        <div class="inner-skew">
                      <img  src= {element.image}></img><br/>
                    </div>
                    </div>
                    </div>
                    <div class="text-container">
                        <br/><p class="card-text"> {element.name}</p>
                        <br/>  
                    </div>
                    </div>
                   
                 )
             })}

        </div>
    )
}