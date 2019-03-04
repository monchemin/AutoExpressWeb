import React, {Component} from 'react';
import { NavLink } from "react-router-dom";


class CustomerHeader extends Component {
    
    render() {
       console.log(sessionStorage.getItem('customer'));
          return( 
<div>
<ul className="topnav">
    <li><NavLink exact activeClassName="active" to="/profil">Home</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/carbrand">Rechercher</NavLink></li>
    <li> {sessionStorage.getItem('isDriver') ? 
          <NavLink  activeClassName="active" to="/admin/carcolor">Annoncer</NavLink> 
          : <NavLink  activeClassName="active" to="/profil/driver">Devenir conducteur</NavLink> 
    }
          </li>
    <li>{sessionStorage.getItem('customer').customerFistName}</li>
    <li><NavLink  activeClassName="rigth" to="/">Deconnnexion</NavLink></li>
</ul>
</div>

          )
    }
}
 export default CustomerHeader