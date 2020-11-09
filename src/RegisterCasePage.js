import React from "react";
import { AppBar,Toolbar,Button } from "@material-ui/core";
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import {AmplifySignOut,withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(awsconfig)

function RegisterCasePage() {
  
  return (
    <div >
      reg
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(RegisterCasePage);