import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

import * as SessionService from '../common/SessionService';



class CustomerHeader extends Component {
    
    render() {
      console.log(SessionService.isDriver());
          return( 
<div>
<ul className="topnav">
    <li><NavLink exact activeClassName="active" to="/profil">Home</NavLink></li>
    <li><NavLink  activeClassName="active" to="/admin/carbrand">Rechercher</NavLink></li>
    <li> {SessionService.isDriver() === true ? 
          <NavLink  activeClassName="active" to="/admin/carcolor">Annoncer</NavLink> 
          : <NavLink  activeClassName="active" to="/profil/driver">Devenir conducteur</NavLink> 
    }
          </li>
    <li className="right"><NavLink activeClassName="active" to='/profil' >{SessionService.getCustomerName()}</NavLink> </li>
    <li  className="right"><NavLink activeClassName="active" to="/">Deconnnexion</NavLink></li>
</ul>
</div>

          )
    }
}
 export default CustomerHeader