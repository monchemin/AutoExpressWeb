import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import '../adminlogin.css';



class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            passsword: "",
            isLogged: false
        }
    }

    HandleClick() {
        this.setState({isLogged: true});  
       
    }
    
    render() {
        const { isLogged } = this.state;
        
     if (isLogged) {
       return <Redirect to='/admin'/>;
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
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="username" />   
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" />
                            </div>
                            
                            <div className="form-group">
                                <input type="button" value="Login" className="btn float-right login_btn" onClick={()=>{this.HandleClick()}} />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<a href="#">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                    
                </div>
                 </div>
            </div>
                        
                 
                    
        )
    }
}

export default AdminLogin