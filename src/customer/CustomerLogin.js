import React, {Component} from 'react';
import { Redirect, NavLink, Link } from 'react-router-dom';

import axios from 'axios';

import '../admin/adminlogin.css';
import {InputIcone, AlertError } from '../common/formComponent';
import * as SessionService from '../common/SessionService';




class CustomerLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            passsword: "",
            isLogged: false,
            error: {"code":false, "message": ""}
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
        axios.post("http://autoexpress.gabways.com/api/login.php", data)
                    .then(result => {
                       if(result.data.isLog === true){
                        SessionService.setLogin();
                        SessionService.setCustomer(JSON.stringify(result.data.customerInfo[0]));
                       
                        axios.get("http://autoexpress.gabways.com/api/driver.php/"+result.data.customerInfo[0].PK)
                        .then(result => {
                            if(result.data.response.length !== 0) SessionService.setDriver();
                        });
                        this.setState({"isLogged": result.data.isLog});
                       } 
                     } )
              
    }

    onPropertyValueChange(property, value){
        this.setState({[property]: value});
       
    }
    
    render() {
        const { isLogged, username, password, error } = this.state;
        const { from } = this.props.location.state || { from: { pathname: "/profil" } };
        
    if(isLogged) {
        return <Redirect to={from} />
    }
        return(
            
            <div className="container">  
                 <div className="d-flex justify-content-center h-100">
                 <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
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
                                <input type="button" value="Login" className="btn float-right login_btn" onClick={()=>{this.HandleClick()}} />
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
}

export default CustomerLogin