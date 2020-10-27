import React, { useEffect } from "react";
import { Card, CardContent, Typography,CircularProgress } from "@material-ui/core";
import "./Infobox.css";
import CountUp from 'react-countup';
import numeral from "numeral";

function InfoBox({state, title,data, total, active, isRed, ...props }) {
 
  //console.log(data);
  if(!data) return <CircularProgress />
  return (
    
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"}
       ${
        isRed && "infoBox--red"
      }
      ${
        props.isOrange && "infoBox--orange"
      }
      ${
        props.isGreen && "infoBox--green"
      }
      ${
        props.isBlack && "infoBox--black"
      }
      
      `
    }
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
         <h4>{title}</h4> 
        </Typography>
        <Typography variant="h5"> 
          
          <CountUp  className={`infoBox__cases 
          ${
            isRed && "infoBox__cases--red"
          }
          ${
            props.isOrange && "infoBox__cases--orange"
          }
          ${
            props.isGreen && "infoBox__cases--green"
          }
          ${
            props.isBlack && "infoBox__cases--black"
          }
          
          `}
                  start={0}
                  end= {
                   data
                  }
                  duration ={1.5}
                  separator=","
           />
        
        </Typography>

        {/* <Typography className="infoBox__total" color="textSecondary">
          {total} 
        </Typography> */}
      </CardContent>
    </Card>
  );
}

export default InfoBox;