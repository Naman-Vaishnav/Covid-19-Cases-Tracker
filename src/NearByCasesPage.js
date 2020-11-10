import React,{useState,useEffect}from "react";
import { TextField,AppBar,Toolbar,Button, getContrastRatio } from "@material-ui/core";
import { Map as LeafletMap, TileLayer,Circle, Popup } from "react-leaflet";

import './NearByCasesPage.css'


function NearByCases() {
  
    const [Address, setAddress] = useState("India");
    const [Center, setCenter] = useState({ lat:22.265639 ,lng: 70.780139 });
    const [Zoom, setZoom] = useState(4);
   
    // useEffect(()=>{
    //     locatAddress()
    // },[])
    const locatAddress= async ()=>{
      await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+Address+".json?access_token=pk.eyJ1IjoibmFtYW4xMTk5IiwiYSI6ImNrZ3YweG5uczBnMjcycHJ5bGs4cXNtNWoifQ.1wUBYPPd_XTaTQHnzUNI4w")
       .then(response=>response.json())
       .then(data=>{
        console.log(data.features[0].center)
        setCenter({lat:data.features[0].center[1] ,lng:data.features[0].center[0] })
        setZoom(15)
        console.log(Zoom);
       }
        )
    }

  return (
    <div >
     <TextField
          id="address"
          label="Enter your current address"
          multiline
          rows={4}
          fullWidth
          onChange={(event)=>{setAddress(event.target.value)}}
          //defaultValue="Enter Current Address"
     />
     <Button 
     onClick={locatAddress} 
     variant="contained" color="primary">
     Locate this address
     </Button>
     <LeafletMap className="map" center={Center} zoom={Zoom} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        
      </LeafletMap>
      
    </div>
  );
}

export default NearByCases ;