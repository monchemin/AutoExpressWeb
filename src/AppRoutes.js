import React from 'react';
import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";
import DashboardHeader from './dashboard/DashboardHeader';
import AdminLogin from './admin/components/adminLogin';
import AdminHeader from './admin/AdminHeader'
import Carbrand from './admin/components/carBrand';
import CarColor from './admin/components/carColor';
import CarModel from './admin/components/carModel'
import Administator from './admin/components/administratror';
import City from './admin/components/city';
import Zone from './admin/components/zone';
import Station from './admin/components/station';
import PickupHour from './admin/components/PickupHour';
import Authenticate from './common/Authenticate';
import CustomerLogin from './customer/CustomerLogin';
import CustomerRegister from './customer/CustomerRegister'
import CustomerHeader from './customer/CustomerHeader';
import DriverRegistration from './customer/DriverRegister';
import RouteNotice from './customer/RouteNotice';
import RouteSearch from './common/search';
import Reservation from './customer/Reservation';
//import Dashboard from './dashboard/Dashboard';



  const  ApplicationRoutes = () => (  
        <Router>
            <div>      
                <Route exact path='/' component={AdminHeader} />
                <Route   path='/dashboard' component={DashboardHeader} />
                <DefaultRoute    path='/search' component={RouteSearch} />
                <AdminRoute  path='/admin' component={AdminHeader} />
                <AdminRoute  path='/admin/dashboard' component={AdminHeader} />
                <AdminRoute  path='/admin/carbrand' component={Carbrand} />
                <AdminRoute  path='/admin/carcolor' component={CarColor} />
                <AdminRoute  path='/admin/carmodel' component={CarModel} />
                <AdminRoute  path='/admin/city' component={City} />
                <AdminRoute  path='/admin/Zone' component={Zone} />
                <AdminRoute  path='/admin/Station' component={Station} />
                <AdminRoute  path='/admin/hour' component={PickupHour} />
                <AdminRoute  path='/admin/admins' component={Administator} />
                <Route   path='/adminlogin' component={AdminLogin} />
                <DefaultRoute   path='/login' component={CustomerLogin} />
                <DefaultRoute   path='/register' component={CustomerRegister} />
               
                <CustomerRoute path='/profil' component={CustomerHeader} />
                <CustomerRoute path='/profil/driver' component={DriverRegistration} />
                <CustomerRoute path='/profil/notice' component={RouteNotice} />
                <CustomerRoute path='/profil/search' component={RouteSearch} />
                <CustomerRoute path='/profil/reservation/:id/:hd/:pd' component={Reservation}  />
                <CustomerRoute path='/notice' component={RouteNotice} />
                
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
              pathname: "/adminlogin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

  const CustomerRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        Authenticate.Customer() ? (
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
  const DefaultRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
         (
          <div>
            <Navigation />
            <Component {...props} />
          </div>
          
        ) 
      }
    />
  );

  const Navigation = () => {
    return( 
        <div>
            <ul className="topnav">
                <li><NavLink  activeClassName="active" to="/">Home</NavLink></li>
                <li><NavLink  activeClassName="active" to="/search">Rechercher</NavLink></li>
                <li><NavLink  activeClassName="active" to="/profil/notice">Annoncer</NavLink></li>
                
                <li className = "right"><NavLink  activeClassName="active" to="/login">Connnexion</NavLink></li>
            </ul>
        </div>

      )
}

 export default ApplicationRoutes
