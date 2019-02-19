import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from '../admin/AdminHeader';



  const  CustomerHeader = () => (  
        <Router>
                <Route exact path='/' component={Admin} />
               
        
        </Router> 
  );


 export default CustomerHeader
