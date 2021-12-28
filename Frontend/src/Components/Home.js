import * as Bootstrap from 'react-bootstrap';
import axios  from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import {Link} from "react-router-dom";
import img1 from "./images/sea1.jpg"
import img2 from "./images/sea2.jpg"
import img3 from "./images/sea3.jpg"
import img4 from "./images/sea4.jpg"
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';






export default function Home (){
  
  const [Country,setCountry] = useState([]);
  const [name,setName] = useState();
  const [search,setSearch] = useState();
  const [image,setImage] = useState();
  const [enableEdit,setEnabeEdit] = useState(false)
  const [idEdit,setIdEdit] = useState()
  

  let navigate = useNavigate();

    
  useEffect (()=> {
      axios.get('http://localhost:3001/country/getCountry')
      .then((response) => {
       console.log(response.data);
       setCountry(response.data);
      });
  }, []);

  /// Add Country

  const addCountry = (e) => {
    e.preventDefault()
      axios.post("http://localhost:3001/country/createCountry", {
           data: {
               name: e.target.form[0].value,
               image: e.target.form[1].value, 
              }}
      ).then(
        (response) => {
          console.log("Add", response.data);
          setCountry(response.data);
        })
}

  // Delete Country

  const deleteCountry = (e,_id) => {
    e.preventDefault()
    console.log(_id)
    axios.delete(`http://localhost:3001/country/deleteCountry/${_id}`
    ).then((response) => {
    console.log(" deleted: ", response.data)
    setCountry(response.data);

})
}

  // search by city 

  const searchCity = (e) => {
    e.preventDefault()
    let result = {};
	 Country.forEach(country => country.cities.filter(city => {
		if(city.name == search){
			result = country
		}
	}))
    console.log(result._id);
    console.log(result._id);
    axios.get(`http://localhost:3001/city/getCity/${result._id}/${search}`)
    .then((response) => {
      console.log(response.data);
      navigate(`/Place/${result._id}/${response.data}`)
     })
    }
 

  // Update Country
    
      function editCountry(element){
        console.log(element)
        setEnabeEdit(true)
        setIdEdit(element._id)
        setName(element.name)
        setImage(element.image) 
      }
    
      function saveEditCountry(e){
            e.preventDefault()
          axios.patch(`http://localhost:3001/country/updateCountry/${idEdit}`,
             { data :
                {
                name,
                image,
                }
             })
                .then((response) => {
                console.log("Updated",response.data);
                setCountry(response.data);
            });
            setEnabeEdit(false)
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

      const decode = (element) => {
        if (decodedData != undefined){
          console.log(decodedData);
              if ( decodedData.typeOfUser == "admin" ){
                 return (
                    <div>
                      <MdDeleteForever onClick={(e) =>{deleteCountry(e,element._id)}}/>
                      <AiFillEdit  onClick={(e) => {editCountry(element)}}/>
                    </div>
                 )}
              }
            }

            
      const decode1 = (id) => {
        if (decodedData != undefined){
              if (decodedData.typeOfUser == "admin"){
                 return ( 
					         <div>        
                    <form className='Add'>
                    <input  placeholder="Country"></input><br/>
                    <input  placeholder="image"></input><br/>
                    <br/><button className='btn' type="submit" onClick= {(e)=>addCountry(e)}>add</button><br/>
                   </form>
					        </div>        
		      	)}}} 


    return (
      <div>
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
    <div class="carousel-item active">
      <img className='serchImg' src="https://static.tacdn.com/img2/brand/home/home1021_dt@2x.webp" height="350px" width="1350px" alt="..."></img>
      <div class="carousel-caption d-none d-md-block">
      <div class="container mt-4">
    <div class="row d-flex justify-content-center">
        <div class="col-md-9">
            <div class="card1 p-4 mt-3">
                <div class="d-flex justify-content-center px-5">
                    <div class="search"> 
                    <input onChange={(e)=>{setSearch(e.target.value)}} type="text" class="search-input" placeholder="Where to ?" name=""></input>
                    <a href="/" class="search-icon" onClick= {(e)=>searchCity(e)}><BiSearchAlt2/></a></div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
    </div>
  </div>
</div>
  
      <br/><br/> <h3>Top Destinations</h3> <br/><br/>
              <div className= "country">
              {Country.map ( (element) => {
                return (
                  <div class="container">
                    <div class="card">
                      <div class="box">
                        <div class="content">
                          <h4>{element.name}</h4>
                          {decode(element)}
                          <Link on to={{ pathname: `/City/${element._id}`,data: {element}}}>
                                    <img className="card" src={element.image} height={230} width={370}></img>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  )})}

    <br/><br/> 
          {decode1()}

          {(function(){
            if (enableEdit == true){
                return (
                    <div>
                      <form>
                            <input value= {name} onChange= {(e)=>setName(e.target.value)} placeholder="Country"></input><br/>
                            <input value= {image} onChange= {(e)=>setImage(e.target.value)} placeholder="image"></input><br/>
                            <br/><button className='btn' onClick={(e)=>{saveEditCountry(e)}}>save</button><br/><br/>
                      </form>
                </div>
                ) }})()}
   <br/><br/><br/>
    </div>

    
    <br/><br/><h3 className="beach">Top destinations for beach lovers</h3><br/>
      <div className='immg1'>
        
        <div className='immg'>
        <img  className='imgBottom' src={img1} height="310px" width="280px"></img>
        </div>
        <div class="bottom-left">Tulum,Mexico</div>

        <div className='immg'>
        <img className='imgBottom' src={img2} height="310px" width="280px"></img> 
        </div>
        <div class="bottom-left3">Myrtle Beach,SC</div> 


        <div className='immg'>
        <img  className='imgBottom' src={img3} height="310px" width="280px"></img> 
        </div>
        <div class="bottom-left2">Hawaii</div> 

        <div className='immg'>
        <img  className='imgBottom' src={img4} height="310px" width="280px"></img>
        </div> 
        <div class="bottom-left1">Bora Bora, French Polynesia</div> 
      
      </div>
      
      
   <br/><br/><br/>
    </div>
)
}
