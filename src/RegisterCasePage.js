import React,{useState} from "react";
import { TextField,AppBar,Toolbar,Button } from "@material-ui/core";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsconfig from './aws-exports'
import {AmplifySignOut,withAuthenticator} from '@aws-amplify/ui-react'
import { createTodo } from './graphql/mutations';
import { v4 as uuid} from 'uuid';
Amplify.configure(awsconfig)


function RegisterCasePage() {

  const [address,setAddress]=useState();

  
  const addAddress =async () =>{
    console.log(address);
   
    await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibmFtYW4xMTk5IiwiYSI6ImNrZ3YweG5uczBnMjcycHJ5bGs4cXNtNWoifQ.1wUBYPPd_XTaTQHnzUNI4w")
    .then(response=>response.json())
    .then(data=>{
     console.log({lat:data.features[0].center[1] ,lng:data.features[0].center[0] })
     const lat=data.features[0].center[1];
     const lng=data.features[0].center[0];
     return {lat,lng}

    }
     )
     .then( async ({lat,lng})=>{
      const createAddressInput={
        id:uuid(),
        address :address ,
        latitude:lat,
        longitude:lng
   
      }
  
      await API.graphql(graphqlOperation(createTodo,{input :createAddressInput }))
      .then(()=>{
        alert("Address Submitted Successfully.")
        console.log("Address Submitted Successfully.");
      })
      .catch((er)=>{
        console.log(er);
      })
     })
    
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
     onClick={addAddress} 
     variant="contained" color="primary">
     Add this address
     </Button>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(RegisterCasePage);
