import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import AdminLogin from './admin/components/adminLogin';
import AdminHeader from './admin/AdminHeader'
import Carbrand from './admin/components/carBrand';
import CarColor from './admin/components/carColor';
import CarModel from './admin/components/carModel'
import Administator from './admin/components/administratror';
import City from './admin/components/city';
import Zone from './admin/components/zone';
import Station from './admin/components/station';


  const  Header = () => (  
        <Router>
            <div>      
                <Route exact path='/' component={Dashboard} />
                <Route  path='/admin' component={AdminHeader} />
                <Route  path='/adminheader' component={AdminHeader} />
                <Route  path='/admin/carbrand' component={Carbrand} />
                <Route  path='/admin/carcolor' component={CarColor} />
                <Route  path='/admin/carmodel' component={CarModel} />
                <Route  path='/admin/city' component={City} />
                <Route  path='/admin/Zone' component={Zone} />
                <Route  path='/admin/Station' component={Station} />
                <Route  path='/admin/admins' component={Administator} />
                <Route  exact path='/admin/login' component={AdminLogin} />
            </div>
        </Router> 
  );


 export default Header
