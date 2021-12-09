import { Routes, Route,Link } from "react-router-dom";

export default function Login (){
    return (
<div className="Login">
    <div class="modal-dialog">
                    <div class="modal-content">
                         <div class="modal-header">
                             <h5 class="modal-title" id="registerModalLabel">Login</h5>
                                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"></input>
                        <small>Don't have an account? 
                        <Link on to={{ pathname: `/SignUp` }}>
                                    <p className="d-inline text-primary">Sign Up</p></Link></small>
                    </div>
                    </div>
                    <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Login</button>

                    </div>
                </div>
                </div>

        </div>
    )
}