import React ,{useEffect, useState} from 'react'
import { Line } from "react-chartjs-2";
import { fetchData } from '../../api';
import numeral from "numeral";
//const options = 

  const buildChartData = (data, casesType="confirmed") => {
    let chartData = [];
    //let lastDataPoint;
    data.forEach (date=>{
       // console.log(date);
        let newDataPoint = {
          x: date["dateymd"],
          y: parseInt(date[`total${casesType}`]),
        };
        chartData.push(newDataPoint);
      
    })
    return chartData;
  };

  
function LineGraph({indiaTimeSeries,casesType="confirmed"}){

    const [data,setData] = useState({}); 
   
    useEffect(()=>{
        const fetch_data =async ()=>{
        //await fetch("https://api.covid19india.org/v4/timeseries.json")
        await fetch("https://api.covid19india.org/data.json")
        .then((response)=> response.json())
        .then((data)=>{

            let chartData = buildChartData(data.cases_time_series, casesType);
            
            setData(chartData.slice(
                Math.max(chartData.length-150,0)
            ));
        
            console.log(data);
            //console.log(data.cases_time_series);
        })
    };
      

    fetch_data();
    },[]);
    
    var text=(title)=>{
        if(casesType == "confirmed")return "Confirmed"
        if(casesType == "recovered")return "Recovered"
        return "Deaths"
    }

    var backColor=(type)=>{
        if(casesType == "confirmed")return "fb4443"
        if(casesType == "recovered")return  "7dd71d"
        return "171313"
    }

    return(
        <div>
            {data?.length&&
             <Line
             width = {10}
             data={{
                     datasets: [
                     {
                         backgroundColor:`#${backColor(casesType)}8C`,
                         borderColor: `#${backColor(casesType)}`,
                         data:data
                     },
                     ],
                 }}
                 options={
                    {
                        title:{
                            display: true,
                            text :

                            text(casesType)

                            ,
                            fontSize : 20
                          
                        },
                        legend: {
                          display: false,
                          
                          
                        },
                        elements: {
                          point: {
                            radius: 1,
                          },
                        },
                        maintainAspectRatio: false,
                        tooltips: {
                          mode: "index",
                          intersect: false,
                          callbacks: {
                            label: function (tooltipItem, data) {
                              return numeral(tooltipItem.value).format("0,0");
                            },
                          },
                        },
                        scales: {
                          xAxes: [
                            {
                              type: "time",
                              time: {
                                format: "YYYY-MM-DD",
                                tooltipFormat: "ll",
                              },
                              gridLines: {
                                display: false,
                              },
                            },
                            
                          ],
                          yAxes: [
                            {
                              gridLines: {
                                display: false,
                              },
                              ticks: {
                                // Include a dollar sign in the ticks
                                callback: function (value, index, values) {
                                  return numeral(value).format("0a");
                                },
                              },
                            },
                          ],
                        },
                      }
                 }
             
             />
            
            }
           
        </div>
    )
}

export default LineGraph;