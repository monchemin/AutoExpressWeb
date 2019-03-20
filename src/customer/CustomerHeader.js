import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

import * as SessionService from '../common/SessionService';

class CustomerHeader extends Component {
    
    render() {
          return( 
            <div>
                <ul className="topnav">
                    <li><NavLink exact activeClassName="active" to="/profil">Home</NavLink></li>
                    <li><NavLink  activeClassName="active" to="/profil/search">Rechercher</NavLink></li>
                    <li> {SessionService.isDriver() === true ? 
                        <NavLink  activeClassName="active" to="/profil/notice">Annoncer</NavLink> 
                        : <NavLink  activeClassName="active" to="/profil/driver">Devenir conducteur</NavLink> 
                    }
                        </li>
                    <li className="right"><NavLink activeClassName="" to='/profil' >{SessionService.getCustomerName()}</NavLink> </li>
                    <li  className="right"><NavLink activeClassName="" to="/">Deconnnexion</NavLink></li>
                </ul>
            </div>

          )
    }
}
 export default CustomerHeader