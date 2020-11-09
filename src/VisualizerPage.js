
import React,{useState,useEffect} from 'react';

import {MyTable,InfoBox,Area_aboveMap,LineGraph,
  Map_India,Navbar} from './components';


import {fetchData} from './api';
import "./App.css";
import "leaflet/dist/leaflet.css";
import {Typography,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button
} from '@material-ui/core';
import numeral from "numeral";
import { prettyPrintStat } from "./util";
import image from './image.png'
import datall from './components/map/india-lan-lng.json';

const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (parseInt(a.active) > parseInt(b.active)) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

function VisualizerPage () {

  const[data,setData]=useState(
    {
      case_time_series:[],
      statewise:[
        {
          active: "",
          confirmed: "",
          deaths: "",
          deltaconfirmed: "",
          deltadeaths: "",
          deltarecovered: "",
          lastupdatedtime: "",
          migratedother: "",
          recovered: "",
          statecode: "",
          state: ""
        }
      ],
      tested:[]

    }
  );
  const [mapCenter, setMapCenter] = useState({ lat:20.5937 ,lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(4);
  const [casesType, setcasesType] = useState("active");
  const [stateCode, setstateCode] = useState("TT");
  const [stateName, setstateName] = useState("Total");
  const [stateInfo, setstateInfo] = useState({});

  
  

  async function loader()
    {
      const fetchedData = await fetchData();
      let sortedData=sortData(fetchedData.statewise);
     // console.log(fetchedData.cases_time_series);
      //console.log(fetchedData);
      setData(
        {
          case_time_series:fetchedData.cases_time_series,
          statewise:sortedData,
          tested:fetchedData.tested
    
        }
        
      );
      setstateInfo(fetchedData.statewise.find(s=>s.statecode==="TT"));
      
      //console.log(fetchedData.statewise.find(s=>s.statecode==="TT"));
    }

  useEffect(()=>{
    loader();
    
  },[]);

  const onCountryChange = async (e,ind) => {
    const countryCode = e.target.value;
    const state_lan_lng=datall.find( s => s.State.toUpperCase() === ind.props.children.toUpperCase());
       console.log(ind.props.children);
       setstateName(ind.props.children);
       setstateCode(countryCode);
       setstateInfo(data.statewise.find(s=>s.statecode===countryCode));
       //console.log(state);
      
        if(state_lan_lng){
          setMapCenter([state_lan_lng.lat,state_lan_lng.lng]);
          setMapZoom(7);
        }
        else {
          setMapCenter({ lat:20.5937 ,lng: 78.9629 });
          setMapZoom(4);
        }
     
  };
 
    return (
      <div>
        
        

        <div className="app-center">
        <img className="image" src={image} />
        <Typography variant="h5" align="center" color="textSecondary">Last Updated:{data.statewise[0].lastupdatedtime}</Typography>
        <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={stateCode}
              onChange={onCountryChange}
            >
              
              {data.statewise.map((state) => (
                <MenuItem  value={state.statecode}>{state.state}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        
        
          {/* <Cards data={data.statewise[0]}/> */}

          <div className="app__stats">
          <InfoBox
            onClick={(e) => setcasesType("active")}
            title="Active"
            isRed
            active={casesType === "active"}
            //cases={prettyPrintStat(parseInt( data.statewise[0].active))}
            data={
             
              stateInfo.active
              //console.log( stateInfo.active)
              //stateInfo.active
              //console.log(data.statewise.find(s=>s.statecode==="GJ"))
            }
            
            
           // total={0}
          />
          
          <InfoBox
            onClick={(e) => setcasesType("confirmed")}
            title="Confirmed"
            isOrange
            active={casesType === "confirmed"}
            //cases={prettyPrintStat(parseInt( data.statewise[0].active))}
            data={stateInfo.confirmed}
           
          />
          <InfoBox
            onClick={(e) => setcasesType("recovered")}
            title="Recovered"
            isGreen
            active={casesType === "recovered"}
            //cases={prettyPrintStat(parseInt( data.statewise[0].active))}
            data={stateInfo.recovered}
           // total={0}
          />
          <InfoBox
            onClick={(e) => setcasesType("deaths")}
            title="Deaths"
            isBlack
            active={casesType === "deaths"}
            //cases={prettyPrintStat(parseInt( data.statewise[0].active))}
            data={stateInfo.deaths}
           // total={0}
          />
          </div>
     <div className="app">
        <div className="app-left">
          <MyTable 
          stateName={stateName}
          data={data.statewise}/
          >
        </div>
        <div className="app-right">
        {/* <Area_aboveMap/> */}
        <Map_India states={data.statewise} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
        <LineGraph casesType={"confirmed"} indiaTimeSeries={data.case_time_series}/>
        <LineGraph casesType={"recovered"} indiaTimeSeries={data.case_time_series}/>
        <LineGraph casesType={"deceased"} indiaTimeSeries={data.case_time_series}/>
        </div>
      
      {/* <Charts/>
      <CountryPicker /> */}
      </div>
      </div>
      
    );
  
}

export default VisualizerPage;
