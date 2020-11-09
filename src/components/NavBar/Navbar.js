import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";


function Navbar() {
  
  return (
    <div >
       <nav>
           <ul className="ul-navbar">
               <Link className="nav-links" to="/">
               <li>Covid-19 visualizer</li>
               </Link>
               <Link className="nav-links" to="/nearbycases">
               <li>View NearBy Cases </li>
               </Link>
               <Link className="nav-links" to="/reg">
               <li>Register Cases</li>
               </Link>
              
               
           </ul>
       </nav>

    </div>
  );
}

export default Navbar;