import axios from "axios";
import { useState } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import img33 from "./image.svg"


export default function SignUp (){

    
    const [email,setEmail] = useState();
    const [name,setName] = useState();
    const [password,setPassword] = useState();
    const [typeOfUser,setTypeOfUser] = useState();


    let navigate = useNavigate();

    const signup = (e) => {

            axios.post(`http://localhost:3001/singup`,{
             name,
             email,
             password,
             typeOfUser
            }     
            ).then((response) => {
                if (response.data.errors) {
                    alert("error")
                } if (response.data.user) {
                    const token = response.data.user;
                    const userSign = jwt(token);
                    localStorage.setItem('token', token);
                    console.log(token);
                    console.log(response.data.user);
                }
                // setUser(response.data)
                navigate("/")
            }
            )
  
    }

    return (

    <div className="SignUp">
     {console.log(typeOfUser)}
        <div class="col-md-10"><br/> 
        <div class="row justify-content-center">
        <div class="col-md-6">
            <p><img src={img33} alt="Image" class="img-fluid"></img></p>
            </div>
            <div class="col-md-5">                  
                 <div class="modal-body">
                     <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">SignUp</label><br/><br/>
                    <input placeholder="Name" onChange = {(e)=> {setName(e.target.value)}} type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input><br/>
                    <input placeholder="Email" onChange = {(e)=> {setEmail(e.target.value)}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input><br/>
                    <input placeholder="Password" onChange = {(e)=> {setPassword(e.target.value)}} type="password" class="form-control" id="exampleInputPassword1"></input> <br/>
                    <input onChange = {(e)=> {setTypeOfUser("admin")}} type="radio" id="admin" name="signup" value="admin"></input>
                    <label for="admin">admin</label><br/>
                    <input onChange = {(e)=> {setTypeOfUser("user")}} type="radio" id="user" name="signup" value="user"></input>
                    <label for="user">user</label>
                </div>
                </div>
                <button type="button" class="btn btn-primary" onClick = {(e)=>{signup(e)}}>SignUp</button>
 
            </div>
            </div>
            </div>
            </div>

    )
}