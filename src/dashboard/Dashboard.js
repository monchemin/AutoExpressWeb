import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import Sidebar from "react-sidebar";

import {DefaultRoutes} from '../customer/model';
import RouteSearch from '../common/search';
import CustomerLogin from '../customer/CustomerLogin';
import CustomerRegister from '../customer/CustomerRegister'
import GetMessage from '../messages';
import * as SessionService from '../common/SessionService';
import RouteNotice from '../customer/RouteNotice';
import DriverRegistration from '../customer/DriverRegister';



class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {routes: [],
            sidebarOpen: false }
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open, rightSide) {
        this.setState({ sidebarOpen: open ,
       rightComponent:  rightSide});
      }

    componentWillMount(){
        
        DefaultRoutes().then(data => {
            this.setState({routes: data.maindata.response}); }
        )
    }
    
    logOut()
    {
        sessionStorage.clear();
        this.setState({isLogged: false});
    }

    headBar() {
        
        let fisrtLink, secondLink;

        if( SessionService.isLog() )
        {
            secondLink =   <NavLink to="#" className="active"  onClick={()=> this.logOut()} >{SessionService.getCustomerName()}</NavLink>
            if(SessionService.isDriver() === true){
                fisrtLink = <NavLink to="#" className="active"  onClick={() => this.onSetSidebarOpen(true, <RouteNotice  />)} >{GetMessage("CREATE_ROUTE")} </NavLink>
            } else {
                fisrtLink = <NavLink to="#" className="active"  onClick={() => this.onSetSidebarOpen(true, <DriverRegistration />)} >{GetMessage("BEEDRIVER")} </NavLink>
            } 

        } else {
            fisrtLink =  <NavLink to="#" className="active"  onClick={() => this.onSetSidebarOpen(true, <CustomerRegister />)} >{GetMessage("REGISTER")} </NavLink>            
            secondLink =  <NavLink to="#" className="active"  onClick={() => this.onSetSidebarOpen(true, <CustomerLogin setSideBarOpen={this.onSetSidebarOpen} />)} >{GetMessage("SIGN_IN")} </NavLink>
            
        }
        
            return(
        
                <div className="header-band">
                    <div className="right">
                    <span className="inscription-label header-label"> {fisrtLink} </span>
                    <span className="connexion-label header-label"> {secondLink} </span>
                    </div>
                </div>
        )
    }
    render(){
        
        return(
            <Sidebar
                sidebar={<div>
                            <button type="button" className="close btn" aria-label="Close" onClick={() => this.onSetSidebarOpen(false)}><span>&times;</span></button>
                            <div>{this.state.rightComponent}</div>
                        </div>}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white", zIndex: 5 } }}
                pullRight={true}
                docked={this.state.sidebarOpen}>
            <div>
                {this.headBar()}
                <RouteSearch setSideBarOpen={this.onSetSidebarOpen} />  
            </div>
            </Sidebar> 
        )
    }
}

export default Dashboard