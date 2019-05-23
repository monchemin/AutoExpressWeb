import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import Sidebar from "react-sidebar";

import {DefaultRoutes} from '../customer/model';
import RouteSearch from '../common/search';
import CustomerLogin from '../customer/CustomerLogin';
import CustomerRegister from '../customer/CustomerRegister'
import GetMessage from '../messages';
import * as SessionService from '../common/SessionService';



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
        
        let button1, button2;

        if( SessionService.isLog() )
        {
            button2 = <button className="connexion-label header-label" onClick={()=> this.logOut()} >{SessionService.getCustomerName()}</button>
            if(SessionService.isDriver() === true){
                button1 = <button className="connexion-label header-label"  onClick={() => this.onSetSidebarOpen(true, <CustomerRegister  />)} >{GetMessage("CREATE_ROUTE")} </button>
            } else {
                button1 = <button className="connexion-label header-label"  onClick={() => this.onSetSidebarOpen(true, <CustomerRegister />)} >{GetMessage("BEEDRIVER")} </button>
            } 

        } else {
            button1 =  <button className="connexion-label header-label"  onClick={() => this.onSetSidebarOpen(true, <CustomerRegister />)} >{GetMessage("REGISTER")} </button>            
            button2 = <button className="connexion-label header-label"  onClick={() => this.onSetSidebarOpen(true, <CustomerLogin setSideBarOpen={this.onSetSidebarOpen} />)} >{GetMessage("SIGN_IN")} </button>
            
        }
        
            return(
        
                <div className="header-band">
                    <div className="right">
                        {button1}
                        {button2}
                    </div>
                </div>
        )
    }
    render(){
        
        return(
            <Sidebar
                sidebar={<div>
                            <button type="button" class="close" aria-label="Close" onClick={() => this.onSetSidebarOpen(false)}><span aria-hidden="true">&times;</span></button>{this.state.rightComponent}
                        </div>}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white", zIndex: 5 } }}
                pullRight={true}
                docked={this.state.sidebarOpen}>
            <div>
                {this.headBar()}
                <RouteSearch />  
            </div>
            </Sidebar> 
        )
    }
}

export default Dashboard