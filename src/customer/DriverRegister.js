import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import * as EmailValidator from 'email-validator';

import {InputIcone, InputIconeBlur, AlertError} from '../common/formComponent';
import {onFetchData, toSubmit, onLoginCheck} from './model';
import { Customer } from '../common/entities';
import {ChangePropertyValue} from '../common/functionRepositoy';





class DriverRegistration extends Component{

    constructor(props){
        super(props);
        this.instance = Customer()
        this.state = {
            selected: this.instance,
            data: [],
            
            buttonValue: "Ajouter",
            error: {"code":false, "message": ""}
        }
        
    }
    

    fetchData(){
        onFetchData().then(data => { 
         this.setState({
            data: data.response,
            isLoading: false
        });
    })  
    }
    

    onPropertyValueChange(property, value){
        
        ChangePropertyValue(this.instance, property, value)
        this.setState({
            "selected": this.instance
        })
        
    }

    onPassWordChande(){
        this.setState({"confirmation" : this.instance.customerPassword === this.instance.confirmation});
    }

    onToSubmit(){
       
        if(    this.state.selected.customerFistName ==="" 
            || this.state.selected.customerLogin ===""
            || this.state.selected.customerPassword ==="" 
            || this.state.emailValid === false) {

            this.setState({ error: {"code":true, "message": "Invalid information"}});
            return;
        }
        var method = "post"
        if(this.state.selected.PK) method = "put";
        this.doChangeData(method, this.state.selected);
    }
    doChangeData(method, element){
        toSubmit(method, element).then(data => {
            if(data.status === 200) {
                this.setState({isRegistered: true});
            }
        })
    }
    loginExist(){
        onLoginCheck({"checkLogin": this.instance.customerLogin}).then(data => {
            this.setState({ loginError: data.loginExists });
        })
    }
    EmailValidation(){
        
        this.setState({emailValid: EmailValidator.validate(this.instance.customerEMailAddress)});

    }
    render(){
        const {selected, buttonValue, error, loginError, confirmation, emailValid, isRegistered} = this.state;

        if(isRegistered===true) {
            return (
                <Redirect to="/login"/>
            )
        }
        
         return(
            <div className="container">  
            <div className="d-flex justify-content-center h-100">
            <div className="card">
               <div className="card-header">
                   <h3>Registration</h3>
                   <div className="d-flex justify-content-end social_icon">
                       <span><i className="fab fa-facebook-square"></i></span>
                       <span><i className="fab fa-google-plus-square"></i></span>
                       <span><i className="fab fa-twitter-square"></i></span>
                   </div>
               </div>
               <div className="card-body">
               <div className="register-form"> 
            {error.code ? <AlertError message={error.message}/> : null }
             <InputIcone value={selected.customerFistName} id="customerFistName" labelName="" placeholder="Prenom" onChange={(property, value) => this.onPropertyValueChange(property, value) } />
             <InputIcone value={selected.customerLastName} id="customerLastName" labelName="" placeholder="Nom" onChange={(property, value) => this.onPropertyValueChange(property, value) } />             
             <InputIcone value={selected.customerPhoneNumber} id="customerPhoneNumber" labelName="" placeholder="Phone" onChange={(property, value) => this.onPropertyValueChange(property, value) } />                          
             <InputIconeBlur value={selected.customerEMailAddress} id="customerEMailAddress" labelName="" placeholder="Email" onChange={(property, value) => this.onPropertyValueChange(property, value) } onBlur={()=>this.EmailValidation()} />             
             {emailValid===false ? <AlertError message="Email Invalide"/> : null }
             <InputIconeBlur value={selected.customerLogin} id="customerLogin" labelName="" placeholder="Login" onChange={(property, value) => this.onPropertyValueChange(property, value) } onBlur={()=>this.loginExist()}/>
             {loginError===true ? <AlertError message="Login already Exist / Please change it"/> : null }
             <InputIconeBlur value={selected.customerPassword} type="password" id="customerPassword" labelName="" placeholder="Mot de passe" onChange={(property, value) => this.onPropertyValueChange(property, value) } onBlur={()=>this.onPassWordChande()} />
             {confirmation === false ? <AlertError message="confirmation error"/> : null }
             <InputIconeBlur value={selected.confirmation} type="password" id="confirmation" labelName="" placeholder="Confirmation" onChange={(property, value) => this.onPropertyValueChange(property, value) } onBlur={()=>this.onPassWordChande()} />
             
             <button onClick={() => this.onToSubmit()} >{buttonValue} </button>
            
            </div>
                   
               </div>
                  
           </div>
            </div>
       </div>

            
         )
     }
}

export default DriverRegistration