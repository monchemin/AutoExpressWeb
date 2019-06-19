import React, {Component} from 'react';
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import Config from '../config';


import {InputIcone, AlertError, AlertSuccess} from '../common/formComponent';
import {onFetchData, AddRoute} from './model';
import { Routes } from '../common/entities';
import {ChangePropertyValue, isObjectComplete} from '../common/functionRepositoy';
import * as SessionService from '../common/SessionService';
import CustomerLogin from './CustomerLogin';



class RouteNotice extends Component{
    constructor(props){
        super(props);
        this.instance = Routes()
        this.state = {
            selected: this.instance,
            stations: [],
            buttonValue: "Valider",
            error: {"code":false, "message": ""},
            startDate: new Date(),
            FK_DepartureStage: "",
            FK_ArrivalStage: ""
        }
        
        this.stations = [];
        
        this.hours = [];
    }
    
    componentWillMount(){
       
        axios.get(Config.API_HOST + "pickuphour.php")
              .then(result => {this.hours =  result.data.response;}); 
                                   
        axios.get(Config.API_HOST + "routestation.php")
                                .then(result => {this.setState({stations: result.data.response }) ;  
                                            
                                        });
       
        
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

    onToSubmit(){
       this.onPropertyValueChange("FK_Driver", SessionService.getCustomerID());
        if( isObjectComplete(this.state.selected) === false) {
            this.setState({ error: {"code":true, "message": "Invalid information"}});
            return;
        }
       
        this.doChangeData("POST", this.state.selected);
    }
    doChangeData(method, element){
        AddRoute(element).then(data => {
            if(data.status === 200) {
                this.instance = Routes();
                this.setState({isRegistered: true,
                              selected: this.instance});
            }
        })
    }
    
    NumberValidation(property, value){  
        
        if( !isNaN(value) ) {
            this.onPropertyValueChange(property, value);
            this.setState({ yearError: false });
        }
        else {
            this.setState({ yearError: true });
        }
    }

    handleStationChange(property, value){
        let station = this.state.stations.find(station => { return station.stationName === value});
        if(station !== undefined) this.onPropertyValueChange(property, station.PK);
      //  this.setState({property, value });
      //  console.log(this.state);
        
    }

    stationList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="station-list">
                    <i className="prefix"></i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="station-list" placeholder="Depart" onChange={(event) => this.handleStationChange(event.target.value)}>
               
                    {this.state.stations.map((station) => {
                            return <option key={station.PK} value={station.stationName}>{station.stationName}</option>
                        })}
            </select>
        </div>
        )
    }
    stationData(id, placeholder) {
        return(
            <div>
       <datalist id="list-station">
            {this.state.stations.map((station) => {
                            return <option key={station.PK} value={station.stationName}></option>
                        })}
       </datalist>
       <InputIcone  id={id} list="list-station" labelName="" type="search" placeholder={placeholder} onChange={(property, value) => this.handleStationChange(property, value) } />
        </div>)
    }
    
    hourList(){
        return(
        <div className = "input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="hour-list">
                    <i className="prefix"></i>
                </span>
            </div>  
            <select className="browser-default custom-select" id="hour-list" onChange={(event) => this.onPropertyValueChange("FK_Hour", event.target.value)} placeholder="Heure de depart">
                <option>Heure</option>
                    {this.hours.map((h) => {
                            return <option key={h.PK} value={h.PK}>{h.hour}</option>
                        })}
            </select>
        </div>
        )
    }

    render(){
        const { buttonValue, error, yearError, isRegistered} = this.state;
           if(SessionService.isLog())
           {
         return(
            <div className="container"> 
            <div className="d-flex justify-content-center h-100">
            <div className="card">
            {error.code ? <AlertError message={error.message}/> : null }
            {isRegistered === true ? <AlertSuccess message="Enregistree"/> : null }
               <div className="card-header"> <h3>Depart</h3></div>
               <div className="card-body register-form">
                    <div className="register-form"> 
                        {this.stationData('FK_DepartureStage', 'depart')}
                        {this.stationData('FK_ArrivalStage', 'arrivee')}
                        <InputIcone  id="routeDate" type="date" labelName="" placeholder="date depart" onChange={(property, value) => this.onPropertyValueChange(property, value) } />                          
                        {this.hourList()}
                        <InputIcone  id="routePrice" labelName="" placeholder="Montant" onChange={(property, value) => this.NumberValidation(property, value, 0, 1) } />
                        <InputIcone  id="routePlace" labelName="" placeholder="Nombre de places" onChange={(property, value) => this.NumberValidation(property, value, 3, 0) } />                          
                        {yearError===true ? <AlertError message="Montant Invalide"/> : null }
                        <button className="btn float-right login-btn" onClick={() => this.onToSubmit()} >{buttonValue} </button>
                    </div> 
               </div>    
           </div>
           
           
        </div>
       </div>
            
         )
           }else {
               return (<CustomerLogin location={<RouteNotice />}/>)
           }
     }
}

export default RouteNotice