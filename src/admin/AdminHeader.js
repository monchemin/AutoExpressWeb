import React, {Component} from 'react';
import { NavLink } from "react-router-dom";


class AdminHeader extends Component {
    
    render() {
       
          return( 
<div>
<ul className="topnav">
    <li><NavLink exact activeClassName="active" to="/admin">Home</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/carbrand">Brands</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/carcolor">Colors</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/carmodel">Models</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/city">Cities</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/zone">Zones</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/station">Station</NavLink></li>
    <li><NavLink  activeClassName="active rigth" to="/admin/admins">Admins</NavLink></li>
    <li><NavLink  activeClassName="rigth" to="/">LogOut</NavLink></li>
</ul>
</div>

          )
    }
}
 export default AdminHeader