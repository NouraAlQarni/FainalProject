import { useParams } from "react-router"
import { useState, useEffect } from "react";
import axios  from 'axios';
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import {Modal , Button, Form} from 'react-bootstrap';
import { IoMdAddCircle } from 'react-icons/io';



export default function Place (){
    
    const {countryId,cityId} = useParams()
    const [place,setPlace] = useState([])
    const [loading,setLoading] = useState(true)
    const [name,setName] = useState();
    const [image,setImage] = useState();
    const [location,setLocation] = useState();
   


    // modale
  
    const [lgShow, setLgShow] = useState(false);


    
    
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
                       <>
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
                      Add Place
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                      <Form.Control onChange={(e) => setName(e.target.value)} placeholder="place" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control onChange={(e) => setImage(e.target.value)} placeholder="image" />   
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control onChange={(e) => setLocation(e.target.value)} placeholder="location" />   
                    </Form.Group>
                    <Form.Group>
                    <button className='btn' type="submit" onClick= {(e)=>addPlace(e)}>Save</button><br/><br/>
                    </Form.Group>
                  </Form>
                  </Modal.Body>
                  </Modal>
                       </>
                   )}}} 


    return (      
      <div>
      <br/><br/><h3>Top Place</h3>{decode1()}
        <div className="Place">
            {place.map((element)=>{
                 return (
                 <div class="container"><br/><br/><br/>
                    <div class="card">
                      <div class="box">
                        <div class="content">
                        <br/><h4>{element.name}</h4>
                           {decode(element._id)}
                          <Link on to={{ pathname: `/PlaceDetails/${countryId}/${cityId}/${element._id}`,data: {element}}}>
                          <img className="card" src={element.image} height={300} width={380}/>
                          </Link><br/> 
                        </div>
                     </div>
                    </div><br></br><br/>    
                    </div>
                 )
             })}

            <br/><br/>
        </div>
        </div>

    )}