import React, {Component} from 'react';
import axios from 'axios';


import {InputIcone, AlertError, AlertSuccess} from '../common/formComponent';
import {onFetchData, AddDriver} from './model';
import { Driver } from '../common/entities';
import {ChangePropertyValue, yearValidation, isObjectComplete} from '../common/functionRepositoy';
import * as SessionService from '../common/SessionService';
import Config from '../config';






class DriverRegistration extends Component{

    constructor(props){
        super(props);
        this.instance = Driver()
        this.state = {
            selected: this.instance,
            data: [],
            brands: [],
            models: [],
            buttonValue: "Ajouter",
            error: {"code":false, "message": ""}
        }
        
        this.carModels = [];
        this.carBrands = [];
        this.carColors = [];
    }
    
    componentWillMount(){
       
        axios.get(Config.API_HOST +  "carModel.php")
                                .then(result => {this.carModels = result.data.response});
        
        axios.get(Config.API_HOST + "carBrand.php")
                                .then(result => {
                                    this.carBrands =  result.data.response;
                                    this.brandChoice(0);
                                 });
                                   
        axios.get(Config.API_HOST + "carColor.php")
                                .then(result => {this.carColors =  result.data.response}); 
        
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
       
        if( isObjectComplete(this.state.selected) === false) {
            this.setState({ error: {"code":true, "message": "Invalid information"}});
            return;
        }
        this.doChangeData("POST", this.state.selected);
    }
    doChangeData(method, element){
        AddDriver(element).then(data => {
            if(data.status === 200) {
                this.setState({isRegistered: true});
                SessionService.setDriver();
            }
        })
    }
    
    carYearValidation(property, value){  
        
        if( yearValidation(value) ) {
            this.onPropertyValueChange(property, value);
            this.setState({ yearError: false });
        }
        else {
            this.setState({ yearError: true });
        }
    }

    brandChoice(id) {
        this.setState({models: this.carModels.filter(model => model.FK_brand === id ) })
    }


    brandList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="brand-list">
                    <i className="prefix"></i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="brand-list" onChange={(event) => this.brandChoice(event.target.value)}>
                <option>Marque</option>
                    {this.carBrands.map((brand) => {
                            return <option key={brand.PK} value={brand.PK}>{brand.brandName}</option>
                        })}
            </select>
        </div>
        )
    }

    modelList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="model-list">
                    <i className="prefix"></i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="model-list" onChange={(event) => this.onPropertyValueChange("FK_carmodel", event.target.value)}>
                <option>Modele</option>
                    {this.state.models.map((brand) => {
                            return <option key={brand.PK} value={brand.PK}>{brand.modelName}</option>
                        })}
            </select>
        </div>
        )
    }

    colorList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="color-list">
                    <i className="prefix"></i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="color-list" onChange={(event) => this.onPropertyValueChange("FK_carcolor", event.target.value)}>
                <option>Couleur</option>
                    {this.carColors.map((brand) => {
                            return <option key={brand.PK} value={brand.PK}>{brand.colorName}</option>
                        })}
            </select>
        </div>
        )
    }
    render(){
        const {selected, buttonValue, error, yearError, confirmation, emailValid, isRegistered} = this.state;

        if(isRegistered===true) {
            return (
                <AlertSuccess message="Enregistrement effectuee"/>
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
             <InputIcone value={selected.customerFistName} id="drivingPermitNumber" labelName="" placeholder="Numero de Permis" onChange={(property, value) => this.onPropertyValueChange(property, value) } />
             <InputIcone value={selected.customerLastName} id="carRegistrationNumber" labelName="" placeholder="Immatriculation" onChange={(property, value) => this.onPropertyValueChange(property, value) } />             
             {this.brandList()}
             {this.modelList()}
             {this.colorList()}
             <InputIcone value={selected.customerPhoneNumber} id="carYear" labelName="" placeholder="Annee" onChange={(property, value) => this.carYearValidation(property, value) } />                          
             {yearError===true ? <AlertError message="Annee Invalide"/> : null }
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