import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import Authenticate from './common/Authenticate';


  const  ApplicationRoutes = () => (  
        <Router>
            <div>      
                <Route exact path='/' component={Dashboard} />
                <AdminRoute  path='/admin' component={AdminHeader} />
                <AdminRoute  path='/admin/dashboard' component={AdminHeader} />
                <AdminRoute  path='/admin/carbrand' component={Carbrand} />
                <AdminRoute  path='/admin/carcolor' component={CarColor} />
                <AdminRoute  path='/admin/carmodel' component={CarModel} />
                <AdminRoute  path='/admin/city' component={City} />
                <AdminRoute  path='/admin/Zone' component={Zone} />
                <AdminRoute  path='/admin/Station' component={Station} />
                <AdminRoute  path='/admin/admins' component={Administator} />
                <Route   path='/login' component={AdminLogin} />
                
            </div>
        </Router> 
  );

  const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        Authenticate.Admin() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

  

 export default ApplicationRoutes
