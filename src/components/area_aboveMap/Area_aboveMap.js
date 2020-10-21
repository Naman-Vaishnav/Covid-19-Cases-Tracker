import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from 'react-countup';
import './Area_aboveMap';
import numeral from "numeral";

function Area_aboveMap({ title, cases, total, active, isRed, ...props }) {
  //console.log(title, active);
  return (
    <div className="aboveMap">
        
        <Typography variant="h1" color="textSecondary" gutterBottom>
           India
        </Typography> 
        
    </div>
  );
}

export default Area_aboveMap;