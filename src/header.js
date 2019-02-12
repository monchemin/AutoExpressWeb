import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Carbrand from './components/carBrand';
import CarColor from './components/carColor';
import CarModel from './components/carModel';
import Administator from './components/administratror';
import City from './components/city';
import Zone from './components/zone';
import Station from './components/station';


  const  Header = () => (  
        <Router>
            <div>
                <Routing />

                <Route exact path='/' component={Carbrand} />
                <Route exact path='/carbrand' component={Carbrand} />
                <Route exact path='/carcolor' component={CarColor} />
                <Route exact path='/carmodel' component={CarModel} />
                <Route exact path='/city' component={City} />
                <Route exact path='/zone' component={Zone} />
                <Route exact path='/station' component={Station} />
                <Route exact path='/administrator' component={Administator} />
            </div>
        </Router>
  )

const Routing = () =>  (
    <ul className="topnav">
    <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
    <li><NavLink  activeClassName="active" to="/carbrand">Brands</NavLink></li>
    <li><NavLink  activeClassName="active" to="/carcolor">Colors</NavLink></li>
    <li><NavLink  activeClassName="active" to="/carmodel">Models</NavLink></li>
    <li><NavLink  activeClassName="active" to="/city">Cities</NavLink></li>
    <li><NavLink  activeClassName="active" to="/zone">Zones</NavLink></li>
    <li><NavLink  activeClassName="active" to="/station">Station</NavLink></li>
    <li><NavLink  activeClassName="active rigth" to="/administrator">Admins</NavLink></li>
    
</ul>
 );

 export default Header
