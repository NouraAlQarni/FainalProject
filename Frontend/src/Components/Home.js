import * as Bootstrap from 'react-bootstrap';
import axios  from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import {Link} from "react-router-dom";
import img1 from "./images/slider-1.jpg"
import img2 from "./images/slider-2.jpg"
import img3 from "./images/slider-3.jpg"
import jwt_decode from "jwt-decode";



export default function Home (){
  
  const [Country,setCountry] = useState([]);
  const [name,setName] = useState();
  const [search,setSearch] = useState();
  const [image,setImage] = useState();
  const [enableEdit,setEnabeEdit] = useState(false)
  const [idEdit,setIdEdit] = useState()
  const {countryId,cityName} = useParams()

    
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
    axios.get(`http://localhost:3001/city/getCity/${countryId}/${cityName}`)
    .then((response) => {
      console.log(response.data);
      setSearch(response.data);
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

      const decode = (id) => {
        if (decodedData != undefined){
          console.log(decodedData);
              if ( decodedData.typeOfUser == "admin"){
                 return (
                    <div>
                        <button className='btn' onClick={(e) =>{deleteCountry(e,id)}}>Delete</button>
                        <button className='btn' onClick={(e) => {editCountry(id)}}>Edit</button>
                    </div>
                 )}
              }
            } 
            
      const decode1 = (id) => {
        if (decodedData != undefined){
              if (decodedData.typeOfUser == "admin"){
                 return (           
                    <form>
                    <input  placeholder="Country:"></input><br/>
                    <input  placeholder="image :"></input><br/>
                    <br/><button className='btn' type="submit" onClick= {(e)=>addCountry(e)}>Add</button><br/><br/>
                   </form>
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
                {/* <h3 class="heading mt-5 text-center">Find amazing things to do.<br/>Anytime, anywhere.</h3> */}
                <div class="d-flex justify-content-center px-5">
                    <div class="search"> 
                    <input type="text" class="search-input" placeholder="Where to ?" name=""></input><a href="/" class="search-icon"><button onClick= {(e)=>searchCity(e)} className='search-btn'>search</button></a></div>
                </div>
            </div>
        </div>
    </div>
</div>
      {/* <input class="form-control me-1" type="search" placeholder="Where to ?" aria-label="Search"></input><button class="btn btn-outline-success" type="submit">Search</button> */}
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
                          {decode()}
                        {/* <button className='btn' onClick={(e) =>{deleteCountry(e,element._id)}}>Delete</button>
                        <button className='btn' onClick={(e) => {editCountry(element)}}>Edit</button> */}
                          <Link on to={{ pathname: `/City/${element._id}`,data: {element}}}>
                                    <img className="card" src={element.image} height={230} width={370}></img>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  )})}

    <br/><br/> 
  
          {/* <form>
                <input  placeholder="Country:"></input><br/>
                <input  placeholder="image :"></input><br/>
                <br/><button className='btn' type="submit" 
                onClick= {(e)=>addCountry(e)}>Add</button><br/><br/>
          </form> */}
          {decode1()}

          {(function(){
            if (enableEdit == true){
                return (
                    <div>
                      <form>
                            <input value= {name} onChange= {(e)=>setName(e.target.value)} placeholder="Country :"></input><br/>
                            <input value= {image} onChange= {(e)=>setImage(e.target.value)} placeholder="image :"></input><br/>
                            <br/><br/><button className='btn' onClick={(e)=>{saveEditCountry(e)}} >save</button><br/><br/>
                      </form>
                </div>
                ) }})()}
   <br/><br/><br/>
    </div>

  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src = {img1} height = {480} width = {1600} ></img>
      <div class="carousel-caption d-none d-md-block">
        <h2>Travel Exploration</h2>
      </div>
    </div>
    <div class="carousel-item">
      <img src = {img2} height = {480} width = {1600} ></img>
      <div class="carousel-caption d-none d-md-block">
        <h2>Dream Destination</h2>
      </div>
    </div>
    <div class="carousel-item">
      <img src = {img3} height = {480} width = {1600} ></img>
      <div class="carousel-caption d-none d-md-block">
        <h2>Discover New Places</h2>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  
</div>
<br/><br/><br/>

      </div>
)

}
