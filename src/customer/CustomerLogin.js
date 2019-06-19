import React, {Component} from 'react';
import { Redirect, NavLink, Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';


import axios from 'axios';

import '../css/adminlogin.css';
import {InputIcone, AlertError } from '../common/formComponent';
import * as SessionService from '../common/SessionService';
import Config from '../config';
import GetMessage from '../messages';




class CustomerLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            passsword: "",
            isLogged: false,
            error: {"code":false, "message": ""},
            loading: false
        }
        
    }

    HandleClick() {
        if(this.state.username === "" || this.state.password === ""){
            this.setState({ error: {"code":true, "message": "username / password invalid"}});
            return;
        }
        let data = {
                    "login": this.state.username,
                    "password": this.state.password
                    }
        this.setState({loading: true});
        axios.post(Config.API_HOST + "login.php", data, Config.HEADER, Config.MAXREDIRECT)
                    .then(result => {
                       if(result.data.isLog === true){
                        SessionService.setLogin();
                        SessionService.setCustomer(JSON.stringify(result.data.customerInfo[0]));
                       
                        axios.get(Config.API_HOST + "drivers.php/"+result.data.customerInfo[0].PK, Config.MAXREDIRECT)
                        .then(result => {
                            if(result.data.response.length !== 0) SessionService.setDriver();
                        });
                        this.setState({isLogged: result.data.isLog});
                       } 
                       this.setState({loading: false});
                     } )
              
    }

    onPropertyValueChange(property, value){
        this.setState({[property]: value});
       
    }

    MyRender(){
        const {username, password, error } = this.state;
        return(
            
            <div className="container">  
                 <div className="d-flex justify-content-center h-100">
                 <div className="card">
                    <div className="card-header">
                        <h3>{GetMessage('SIGN_IN')}</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                    {error.code ? <AlertError message={error.message}/> : null }
                        <form>
                           
     
                            <InputIcone value={username} type="text" id="username" labelName="" placeholder="username" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                            <span className="space"></span>
                            <InputIcone value={password} type="password" id="password" labelName="" placeholder="password" onChange={(property, value) => this.onPropertyValueChange(property, value) }/>
                            
                            <div className="form-group">
                                <input type="button" value="Login" className="btn float-right login-btn" onClick={()=>{this.HandleClick()}} />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Pas encore de compte ?<Link to="/register">Enregistre toi !</Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <NavLink to="">Forgot your password?</NavLink>
                        </div>
                    </div>
                    
                </div>
                 </div>
            </div>
                        
                 
                    
        )
    }
    
    render() {
        const { isLogged} = this.state;
        //const { from } = this.props.location !== undefined ? this.props.location.state : { from: { pathname: "/" } };
        //const { from } = this.props.location !== undefined ? this.props.location.state : { from: { pathname: "/" } };
        
    if(isLogged) {
        //return <Redirect to={from} />
        if(this.props.location !== undefined ) {
            //this.props.setSideBarOpen(true, this.props.location.state)
            return(this.props.location)
        } else {
            this.props.setSideBarOpen(false)
        }
       
      
    }

    return(
        <LoadingOverlay
            active={this.state.loading}
            spinner
            text={GetMessage("LOGIN_LOADING")} >
                {this.MyRender()}
        </LoadingOverlay>
        )
        
    }
}

export default CustomerLogin