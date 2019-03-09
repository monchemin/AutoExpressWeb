import React, {Component} from 'react';
import { NavLink } from "react-router-dom";


class DashboardHeader extends Component {
    
    render() {
        sessionStorage.clear();
          return( 
<div>
<ul className="topnav">
    <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
    <li><NavLink  activeClassName="active" to="/profil/search">Rechercher</NavLink></li>
    <li><NavLink  activeClassName="active" to="/profil/notice">Annoncer</NavLink></li>
    
    <li><NavLink  activeClassName="rigth" to="/login">Connnexion</NavLink></li>
</ul>
</div>

          )
    }
}
 export default DashboardHeader