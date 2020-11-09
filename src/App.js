import React,{useState,useEffect} from 'react';

import RegisterCasePage   from './RegisterCasePage'
import VisualizerPage  from './VisualizerPage'
import NearByCases  from './NearByCasesPage'

import { BrowserRouter as Router ,Switch ,Route } from 'react-router-dom'
import { Navbar} from "./components"
function App () {

    return (
      <div>
        
        
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={VisualizerPage}/>
            <Route path="/reg" component={RegisterCasePage}/>
            <Route path="/nearbycases" component={NearByCases}/>
          </Switch>
        </Router>
          


      </div>
      
    );
  
}

export default App;
