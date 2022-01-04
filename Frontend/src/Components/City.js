import { useParams } from "react-router"
import { useEffect, useState } from "react";
import axios  from 'axios';
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import {Modal , Button, Form} from 'react-bootstrap';
import { IoMdAddCircle } from 'react-icons/io';


export default function City (){

    const {more} = useParams()
    const [city,setCity] = useState([])
    const [loading,setLoading] = useState(true)
    const [name,setName] = useState();
    const [image,setImage] = useState();
    const [enableEdit,setEnabeEdit] = useState(false)
    const [idEdit,setIdEdit] = useState()

     // modale
  
     const [lgShow, setLgShow] = useState(false);

    
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
          if ( decodedData.typeOfUser == "admin"){
             return (
                <div>
                    <MdDeleteForever onClick={(e) =>{deleteCity(e,element._id)}}/>
                    <AiFillEdit  onClick={(e) => {updateCity(element)}}/>
                </div>
             )}
          }
        } 

        const decode1 = (id) => {
          if (decodedData != undefined){
                if (decodedData.typeOfUser == "admin"){
                   return (  
                   <div><br/>
                    <IoMdAddCircle onClick={() => setLgShow(true)}/> 
                    <Modal
                    size="sm"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                      Add City
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                      <Form.Control onChange={(e) => setName(e.target.value)} placeholder="city" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control onChange={(e) => setImage(e.target.value)} placeholder="image" />   
                    </Form.Group>
                    <Form.Group>
                    <button className='btn' type="submit" onClick= {(e)=>addCity(e)}>Save</button><br/><br/>
                    </Form.Group>
                  </Form>
                  </Modal.Body>
                  </Modal>
					        </div>         

                    /* <form>
                    <input  placeholder="City :"></input><br/>
                    <input  placeholder="Image :"></input><br/>
                    <br/>
                    <button className="btn" type="submit" onClick= {(e)=>addCity(e)}>add</button><br/><br/>
                    </form>
                  </div>  */
        )}}} 

    return (

        <div>
        
          <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
          <div class="carousel-item">
            <img src= "https://media.tacdn.com/media/attractions-content--1x-1/0a/fa/05/17.jpg" class="d-block w-100" alt="..."></img>
              <div class="carousel-caption d-none d-md-block">
              </div>
            </div>
            <div class="carousel-item active">
              <img src="https://media.tacdn.com/media/attractions-content--1x-1/0c/96/35/b2.jpg" class="d-block w-100"  alt="..."></img>
              <div class="carousel-caption d-none d-md-block">
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://media.tacdn.com/media/attractions-content--1x-1/0a/aa/86/b4.jpg"  class="d-block w-100" alt="..."></img>
              <div class="carousel-caption d-none d-md-block">
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

       <br/><br/><h3>Top City</h3>{decode1()}
       <div className="City">
            {city?.map((element)=>{
                 return (   
                    <div class="container"><br/><br/><br/>
                    <div class="card">
                      <div class="box">
                        <div class="content">
                        <h4>{element.name}</h4>
                        {decode(element)}
                        <Link on to={{ pathname: `/Place/${more}/${element._id}`,data: {element}}}>
                          <img className="card" src={element.image} height={300} width={380}></img>
                        </Link><br/>
                    </div>
                    </div>
                    </div>
                    </div> 
                 )
             })}

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
        </div>
    )
}