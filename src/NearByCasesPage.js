import React,{useState,useEffect}from "react";
import { TextField,AppBar,Toolbar,Button, getContrastRatio } from "@material-ui/core";
import { Map as LeafletMap, TileLayer,Circle, Popup } from "react-leaflet";
import './NearByCasesPage.css'

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { listTodos } from './graphql/queries';
import "leaflet/dist/leaflet.css";
import Marker from 'react-leaflet-enhanced-marker';
import useForceUpdate from 'use-force-update';
import makeStyles from "@material-ui/styles/makeStyles";


Amplify.configure(awsconfig)

const useStyles = makeStyles({
  root: {
    width: 350
  }
});

function NearByCases() {
  
    const [Address, setAddress] = useState("India");
    const [Center, setCenter] = useState({ lat:23.128201 ,lng: 72.5433945 });
    const [Zoom, setZoom] = useState(4);
    const [PAddress,setPAddress]=useState([]);

    
    
    const fetchAddress= async ()=>{
      try{
        const addressData= await API.graphql(graphqlOperation(listTodos));
        const addressList=addressData.data.listTodos.items;
        console.log('Address list',addressList);
        setPAddress(addressList)
      }
      catch(error){
        console.log('Error',error);
      }

  

  
    }
   
    useEffect(()=>{
       fetchAddress();
       console.log(Zoom);
       console.log(Center);
    },[]);

    const forceUpdate = useForceUpdate();

    const locatAddress= async ()=>{
      await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+Address+".json?access_token=pk.eyJ1IjoibmFtYW4xMTk5IiwiYSI6ImNrZ3YweG5uczBnMjcycHJ5bGs4cXNtNWoifQ.1wUBYPPd_XTaTQHnzUNI4w")
       .then(response=>response.json())
       .then(data=>{
         
        console.log(data.features[0].center)
        setCenter(prev=>(
        {...prev,lat:data.features[0].center[1],lng:data.features[0].center[0]}
        )
        )
          
          
        setZoom(15)
        forceUpdate();
        console.log(Zoom);
        console.log(Center);
       }
        )
    }
    const classes = useStyles();
  return (
    <div >
      {/* <p> {Center.lat } {Center.lng } </p> */}
     <TextField
          id="address"
          label="Enter your current address"
          multiline
          rows={4}
          className={classes.root}
          onChange={(event)=>{setAddress(event.target.value)}}
          //defaultValue="Enter Current Address"
     />
     <Button 
     onClick={async()=>await locatAddress()} 
     variant="contained" color="primary">
     Locate this address
     </Button>

     <div style={{ paddingLeft: "25%"  }}>
     <LeafletMap className="map" center={Center} zoom={Zoom}
     on
    //  ondragend={(e)=>{
    //    setCenter({lat:e.target._animateToCenter.lat,
    //     lng:e.target._animateToCenter.lng
    //   })}}
    
     
     >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker icon={
        <div style={ { textAlign:"center" }} >
          <img src={require('./curloc.png')} style={{ width:'1'}} />
        </div>
        } 
         position={Center} />
        
        {
          PAddress.map((addr)=> 
          {
            //console.log( parseFloat (addr.latitude));
            var cen={lat:parseFloat (addr.latitude),lng:parseFloat (addr.longitude)};
           // console.log(cen);
            return <Marker key={addr.key}  position={cen} />
          })
        }
        {/*
           <Popup  >
            address
            </Popup>
        </Marker>  */}
        
      </LeafletMap>
      </div>
      
    </div>
  );
}

export default withAuthenticator(NearByCases) ;
