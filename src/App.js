import React,{useState,useEffect} from 'react';


import {MyTable,Cards,Charts,CountryPicker} from './components';
import {fetchData} from './api';
function App () {

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
          state: ""
        }
      ],
      tested:[]

    }
  );
  

  async function loader()
    {
      const fetchedData = await fetchData();
      setData(
        {
          case_time_series:fetchedData.case_time_series,
          statewise:fetchedData.statewise,
          tested:fetchedData.tested
    
        }
      );
      //console.log(data);
    }

  useEffect(()=>{
    loader();
  },[]);

 
    return (
      <div>
      <Cards data={data.statewise[0]}/>
      <MyTable data={data.statewise}/>
      <Charts/>
      <CountryPicker />
      </div>
    );
  
}

export default App;
