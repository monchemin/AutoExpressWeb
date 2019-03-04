import React, {Component} from 'react';
import { NavLink } from "react-router-dom";


class DashboardHeader extends Component {
    
    render() {
        sessionStorage.clear();
          return( 
<div>
<ul className="topnav">
    <li><NavLink exact activeClassName="active" to="/dashbord">Home</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/carbrand">Rechercher</NavLink></li>
    <li><NavLink  activeClassName="active" to="/profil">Annoncer</NavLink></li>
    
    <li><NavLink  activeClassName="rigth" to="/login">Connnexion</NavLink></li>
</ul>
</div>

          )
    }
}
 export default DashboardHeader