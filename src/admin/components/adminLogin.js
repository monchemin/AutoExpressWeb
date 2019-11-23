import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import '../../css/adminlogin.css';
import {InputIcone, AlertError } from '../../common/formComponent';
import axios from 'axios';
import Config from '../../config';


class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            passsword: "",
            isAdminLogged: false,
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
        axios.post(Config.API_HOST + "admin-login.php", data, Config.HEADER)
                    .then(response => {
                       if(response.data.isLog === true){
                        sessionStorage.setItem('isAdminLogged', true);
                        this.setState({"isAdminLogged": response.data.isLog});
                       }
                       else  this.setState({ error: {"code":true, "message": "username / password invalid"}});  
                     } )
              
    }

    onPropertyValueChange(property, value){
        this.setState({[property]: value});
       
    }
    
    render() {
        const { isAdminLogged, username, password, error } = this.state;
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        
    if(isAdminLogged) {
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
                                <input type="button" value="Login" className="btn float-right login-btn" onClick={()=>{this.HandleClick()}} />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        
                        <div className="d-flex justify-content-center">
                            Forgot your password?
                        </div>
                    </div>
                    
                </div>
                 </div>
            </div>
                        
                 
                    
        )
    }
}

export default AdminLogin