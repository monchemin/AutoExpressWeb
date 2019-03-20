import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import  Dashboard  from './Dashboard';


class DashboardHeader extends Component {
    
    render() {
        sessionStorage.clear();
          return( 
           <div>
               {this.Navigation()}
               <Dashboard/>
           </div>

          )
    }

    Navigation() {
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
    
}
 export default DashboardHeader