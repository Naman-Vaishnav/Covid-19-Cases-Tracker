import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";


function Navbar() {
  
  return (
    <div >


       <div class="topnav">
        <a   href="/">Covid-19 visualizer</a>
        <a href="/nearbycases">View NearBy Cases</a>
        <a href="/reg">Register Cases</a>
      </div>
      

    </div>
  );
}

export default Navbar;