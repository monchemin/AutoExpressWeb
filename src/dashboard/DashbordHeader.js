import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from './Dashboard';



  const  DashbordHeader = () => (  
        <Router>
                <div>
                <Route exact path='/' component={Dashboard} />
                
               </div>
        
        </Router> 
  );


 export default DashbordHeader
