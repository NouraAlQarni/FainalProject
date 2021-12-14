import * as Bootstrap from 'react-bootstrap';
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import './components.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import About from './About';
import ContactUs from './ContactUs';
import logo1 from './logo1.png'
import City from './City';
import Place from './Place';


export default function Navbar (){


  let navigate = useNavigate();

  const logout = (e) =>{
      e.preventDefault();
      localStorage.removeItem("token");
      navigate ('/')
      alert("LogedOut")
  }

    return (
        <div className="Navbar">

<Bootstrap.Nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img  src={logo1} alt="" width="85" height="85" class="d-inline-block align-text-top"></img>
      <h5>Dream</h5> 
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Country</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="About">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="Contact">ContactUs</a>
        </li>
        <li class="nav-item">
 
        </li>
      </ul>
      <form class="d-flex">
        <Link to="/Login"><button className = 'btn'>Login</button></Link>
        <Link to="/Logout"><button className = 'btn' onClick= {(e)=> logout(e)}>Logout</button></Link> 
      </form>
    </div>
  </div>
</Bootstrap.Nav>

          <Routes>
                <Route exact path="/" element = { <Home />}></Route>
                <Route path="/City/:more" element = {<City />}></Route>
                <Route path="/Place/:countryId/:cityId" element = {<Place />}></Route>
                <Route path="/About" element = {<About />}></Route>
                <Route path="/Contact" element = {<ContactUs />}></Route>
                <Route path="/Login" element = {<Login />}></Route>
                <Route path="/SignUp" element = {<SignUp />}></Route>  
           </Routes>
        </div>
    )
}