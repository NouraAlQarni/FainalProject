import * as Bootstrap from 'react-bootstrap';
import axios  from 'axios';
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import img1 from "./images/slider-1.jpg"
import img2 from "./images/slider-2.jpg"
import img3 from "./images/slider-3.jpg"



export default function Home (){

  
  const [Country,setCountry] = useState([]);

    
  useEffect (()=> {
      axios.get('http://localhost:3001/country/getCountry')
      .then((response) => {
       console.log(response.data);
       setCountry(response.data);
      });
  }, []);

    return (
      <div>
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://static.tacdn.com/img2/brand/home/home1021_dt@2x.webp" height="350px" width="1350px" alt="..."></img>
      <div class="carousel-caption d-none d-md-block">
      <input class="form-control me-1" type="search" placeholder="Where to ?" aria-label="Search"></input><button class="btn btn-outline-success" type="submit">Search</button>
        </div>
    </div>
  </div>
</div>
  
      <br/><br/> <h3>Top Destinations</h3> <br/><br/>
              <div className= "country">
              {Country.map ( (element) => {
                            return (
      <div class="a-box">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew">
            <Link on to={{ pathname: `/City/${element._id}`,data: {element}}}>
                  <img   className="card" src={element.image} ></img>
            </Link>
            </div>
          </div>
        </div>
        <div class="text-container">
        <p class="card-text">{element.name}</p>
      </div>
      </div>
                            )})}
                            </div><br/><br/><br/>

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
)}
