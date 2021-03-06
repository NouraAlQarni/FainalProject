import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import img33 from "./image.svg"


export default function Login (){

    
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loginError, setLoginErrors] = useState({
        email: "",
        password: ""
    })

    let navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login',{
            email: email,
            password: password,
        }).then((response) => {
            console.log(response);
            
            if(response.data.errors){
                setLoginErrors(response.data.errors)
            }
            if(response.data.user){
                const token = response.data.user;
                const userSign = jwt(token);
                console.log(token);
                console.log(userSign);
                localStorage.setItem('token',token);
                navigate("/")
            }
           });
    }

    return (
    <div className="Login">
        <div class="col-md-10"><br/> 
        <div class="row justify-content-center">
        <div class="col-md-6">
            <p><img src={img33} alt="Image" class="img-fluid"></img></p>
            </div>
                <div class="col-md-5">                  
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Login</label><br/>
                            <label for="exampleInputEmail1" class="form-label"></label>
                            <input placeholder="Email" onChange = {(e)=> {setEmail(e.target.value)}}  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                            {loginError.email == "" ? "" : <p className="alert alert-danger">{loginError.email}</p>}
                            <label for="exampleInputPassword1" class="form-label"></label>
                            <input placeholder="Password" onChange = {(e)=> {setPassword(e.target.value)}}  type="password" class="form-control" id="exampleInputPassword1"></input>
                            {loginError.password == "" ? "" :<p className="alert alert-danger">{loginError.password}</p>}
                            <small>Don't have an account? 
                            <Link on to={{ pathname: `/SignUp` }}>
                                <h5 className="d-inline text-primary">SignUp</h5></Link></small>
                        </div>
                    </div>
                        <button type="submit" class="btn btn-primary" onClick = {(e)=>{login(e)}}>Login</button>
                    </div>
                    </div>
            </div>
        </div>
    )
}