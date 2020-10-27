import React, { useEffect, useState } from 'react';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import datall from './india-lan-lng.json';
import {showDataOnMap} from '../../util'
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
const casesTypeColors = {
  active: {
    hex: "#CC1034",
    multiplier: 1000,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 300,
  },
  deaths: {
    hex: "#171313",
    multiplier: 2000,
  },
  confirmed: {
    hex: "#fb4443",
    multiplier: 300,
  },
};
  
  function Map_India({states,casesType,center,zoom}) {
    
    //.log(datall);
   // console.log(states);

    
    return (
      <div className="map">
      <LeafletMap center={center} zoom={zoom} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         {
           states.map((st) =>{
            var temp=datall.find( s => s.State.toUpperCase() === st.state.toUpperCase());
            if(temp)
            {
              return(  
                <Circle 
                  center={
            
                    [temp.lat, temp.lng]
                    
                  
                  }
                  color={casesTypeColors[casesType].hex}
                  fillColor={casesTypeColors[casesType].hex}
                  fillOpacity={0.4}
                  radius={
                      Math.sqrt(
                        //20000,
                       
                       
                        st[casesType]
                      
                        
                      ) * casesTypeColors[casesType].multiplier
                  }
                  onMouseOver={(e) => {
                  e.target.openPopup();
                }}
                  
                >
                
                  <Popup   >
                    <div className="info-container">
                      <div className="info-name"><h3>{st.state}</h3></div>
                      <div className="info-confirmed">
                        Active: {numeral(st.active).format("0,0")}
                      </div>
                      <div className="info-recovered">
                        Recovered: {numeral(st.recovered).format("0,0")}
                      </div>
                      <div className="info-deaths">
                        Deaths: {numeral(st.deaths).format("0,0")}
                      </div>
                    </div>
                  </Popup>
                </Circle>
              )
            }
            else {
              //console.log(st);
            }
 
            
            }
        )
         
         } 
      </LeafletMap>
    </div>
    )
  }

  export default Map_India;