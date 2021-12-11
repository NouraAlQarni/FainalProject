import axios from "axios";
import { useState } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function SignUp (){

    
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();


    let navigate = useNavigate();

    const signup = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/singup`,{
            email,
            password,
    
             
        }).then((response) => {
            console.log(response);
            if(response.data.errors){

            }
            if(response.data.user){
                const token = response.data.token;
                const userSign = jwt(token);
                console.log(token);
                console.log(userSign);
                localStorage.setItem('token',token);
                navigate("/")
                alert("You Are Signed")
            }

           });
    }

    return (
    <div className="SignUp">
         <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="registerModalLabel">SignUp</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input onChange = {(e)=> {setEmail(e.target.value)}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input onChange = {(e)=> {setPassword(e.target.value)}} type="password" class="form-control" id="exampleInputPassword1"></input>  
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary" onClick = {(e)=>{signup(e)}}>SignIn</button>
                </div>
            </div>
            </div>

        </div>
    )
}